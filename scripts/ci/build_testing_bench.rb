#!/usr/bin/env ruby
# frozen_string_literal: true

test_args = "-p intake_accelerator#{ENV['BUILD_NAME']}_test -f docker/test/docker-compose.yml"
`docker-compose #{test_args} pull`
exec("docker-compose #{test_args} build run_tests")
