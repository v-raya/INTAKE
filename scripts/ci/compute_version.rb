#!/usr/bin/env ruby
# frozen_string_literal: true

base_version = `git describe --tags $(git rev-list --tags --max-count=1)`.chomp
base_version << ".#{ENV['BUILD_NUMBER']}" if ENV['BUILD_NUMBER']
puts base_version
