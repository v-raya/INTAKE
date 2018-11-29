#!/usr/bin/env ruby
# frozen_string_literal: true

`git clone --depth=1 git@github.com:ca-cwds/integrated-test-environment.git`
`rm -rf integrated-test-environment/.git`
Dir.chdir('integrated-test-environment') do
  puts "Using this intake image ==> #{ENV['INTAKE_IMAGE_VERSION'] || 'No image provided ¯\_(ツ)_/¯'}"
  `docker-compose -f docker-compose.bubble.yml up -d nginx intake`
  `docker-compose -f docker-compose.bubble.yml build acceptance_testing`
  exec('docker-compose -f docker-compose.bubble.yml up'\
       ' --exit-code-from acceptance_testing acceptance_testing')
end
