import java.text.SimpleDateFormat
@Library('jenkins-pipeline-utils') _

node('intake-slave') {
  def scmInfo = checkout scm
  def branch = scmInfo.GIT_BRANCH ?: env.GIT_BRANCH
  def curStage = 'Start'
  def pipelineStatus = 'SUCCESS'
  def successColor = '11AB1B'
  def failureColor = '#FF0000'
  SimpleDateFormat dateFormatGmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
  def buildDate = dateFormatGmt.format(new Date())
  def docker_credentials_id = '6ba8d05c-ca13-4818-8329-15d41a089ec0'

  try {


    stage('Building testing bench') {
      curStage = 'Building testing bench'
      sh './scripts/ci/build_testing_bench.rb'
    }

    stage('Lint test') {
      curStage = 'Lint test'
      sh './scripts/ci/lint_test.rb'
    }

    stage('Verify SemVer Label') {
      checkForLabel("intake")
    }

    stage("Increment Tag") {
      VERSION = newSemVer()
      echo VERSION
    }

    stage('Karma tests') {
      curStage = 'Karma tests'
      sh './scripts/ci/karma_test.rb'
    }

    stage('Rspec tests') {
      curStage = 'Rspec tests'
      sh './scripts/ci/rspec_test.rb'
    }

    if (branch == 'origin/master') {
      VERSION = sh(returnStdout: true, script: './scripts/ci/compute_version.rb').trim()
      VCS_REF = sh(
        script: 'git rev-parse --short HEAD',
        returnStdout: true
      )

      stage('Build') {
        curStage = 'Build'
        sh 'make build'
      }

      stage('Release') {
        curStage = 'Release'
        withEnv(["BUILD_DATE=${buildDate}","VERSION=${VERSION}","VCS_REF=${VCS_REF}"]) {
          sh 'make release'
        }
      }

      stage('Acceptance test Bubble'){
        withDockerRegistry([credentialsId: docker_credentials_id]){
          withEnv(["INTAKE_IMAGE_VERSION=intakeaccelerator${BUILD_NUMBER}_app"]) {
            sh './scripts/ci/acceptance_test.rb'
          }
        }
      }

      stage('Publish') {
        withDockerRegistry([credentialsId: '6ba8d05c-ca13-4818-8329-15d41a089ec0']) {
          curStage = 'Publish'
          withEnv(["VERSION=${VERSION}"]){
            sh './scripts/ci/publish.rb'
          }
        }
      }

      stage('Deploy Preint') {

        withCredentials([usernameColonPassword(credentialsId: 'fa186416-faac-44c0-a2fa-089aed50ca17', variable: 'jenkinsauth')]) {
          sh "curl -v -u $jenkinsauth 'http://jenkins.mgmt.cwds.io:8080/job/preint/job/intake-app-pipeline/buildWithParameters" +
            "?token=${JENKINS_TRIGGER_TOKEN}" +
            "&cause=Caused%20by%20Build%20${env.BUILD_ID}" +
            "&INTAKE_APP_VERSION=${VERSION}'"
        }
        pipelineStatus = 'SUCCEEDED'
        currentBuild.result = 'SUCCESS'
      }

      stage('Trigger Security scan') {
        build job: 'tenable-scan', parameters: [
          [$class: 'StringParameterValue', name: 'CONTAINER_NAME', value: 'intake'],
          [$class: 'StringParameterValue', name: 'CONTAINER_VERSION', value: VERSION]
        ]
      }

    }

    stage ('Reports') {
      step([$class: 'JUnitResultArchiver', testResults: '**/reports/*.xml'])

      publishHTML (target: [
        allowMissing: false,
        alwaysLinkToLastBuild: false,
        keepAll: true,
        reportDir: 'reports/coverage/js',
        reportFiles: 'index.html',
        reportName: 'JS Code Coverage'
      ])

      publishHTML (target: [
        allowMissing: false,
        alwaysLinkToLastBuild: false,
        keepAll: true,
        reportDir: 'reports/coverage/ruby',
        reportFiles: 'index.html',
        reportName: 'Ruby Code Coverage'
      ])
    }

  } catch (e) {
    pipelineStatus = 'FAILED'
    currentBuild.result = 'FAILURE'
    throw e
  }

  finally {
    try {
      stage('Clean') {
        withEnv(["GIT_BRANCH=${branch}"]){
          archiveArtifacts artifacts: 'tmp/*', excludes: '*/.keep', allowEmptyArchive: true
          sh './scripts/ci/clean.rb'
          echo 'Cleaning workspace'
          cleanWs()
        }
      }
    } catch(e) {
      pipelineStatus = 'FAILED'
      currentBuild.result = 'FAILURE'
    }

    if (branch == 'origin/master') {
      slackAlertColor = successColor
      slackMessage = "${pipelineStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' completed for branch '${branch}' (${env.BUILD_URL})"

      if(pipelineStatus == 'FAILED') {
        slackAlertColor = failureColor
        slackMessage = "${pipelineStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' in stage '${curStage}' for branch '${branch}' (${env.BUILD_URL})"
      }

      slackSend channel: "#tech-intake", baseUrl: 'https://hooks.slack.com/services/', tokenCredentialId: 'slackmessagetpt2', color: slackAlertColor, message: slackMessage
    }
  }
}
