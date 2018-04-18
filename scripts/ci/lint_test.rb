#!/usr/bin/env ruby
# frozen_string_literal: true

test_args = "-p intake_accelerator#{ENV['BUILD_NAME']}_test -f docker/test/docker-compose.yml"
exec("docker-compose #{test_args} run run_tests bin/lint")
