#!/usr/bin/env ruby
# frozen_string_literal: true

test_args = "-p intake_accelerator#{ENV['BUILD_NAME']}_test -f docker/test/docker-compose.yml"
rspec_cmd = 'bundle exec parallel_rspec --runtime-log parallel_runtime_rspec.log spec'
exec("docker-compose #{test_args} run run_tests #{rspec_cmd}")
