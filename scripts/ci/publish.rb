#!/usr/bin/env ruby
# frozen_string_literal: true

registry_path = 'cwds/intake'
release_img = "intakeaccelerator#{ENV['BUILD_NUMBER']}_app"
puts "==> Tagging #{release_img}"
`docker tag #{release_img} #{registry_path}:latest`
`docker tag #{release_img} #{registry_path}:#{ENV['VERSION']}`
puts "==> Publishing #{ENV['VERSION']} and latest"
`docker push #{registry_path}:latest`
`docker push #{registry_path}:#{ENV['VERSION']}`
