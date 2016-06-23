require 'json'
require 'open-uri'
require 'net/http'
require 'rack'
require 'rubygems'
require 'erb'

use Rack::Static,
    :urls => %w(/js /Flat-UI-master /templates ../favicon.ico),
    :root => 'public'

app = lambda do |env|

  url = '/' + env['REQUEST_URI'].split('/')[3..-1].join('/')

  if url[-1] == '?'
    url = url[0..url.length - 2]
  end

  if url == '/'
    return ['200',
            {'Content-Type' => 'text/html'},
            File.open('public/index.html', 'r')]
  elsif url == '/favicon.ico'
    content = ''
    open 'favicon.ico' do |file|
      content = file.read
    end
    return ['200',
     {'Content-Type' => 'text/plain'},
     [content]]
  else
    url_first = url.split('/')[1]
    if url_first == 'home'
      token = url.split('/')[2]
      content = ''
      open 'public/templates/home.erb' do |file|
        content = file.read
      end
      return ['200',
              {'Content-Type' => 'text/html'},
              [ERB.new(content).result(binding)]]
    elsif url_first == 'bind'
      token = url.split('/')[2]
      content = ''
      open 'public/templates/bind.erb' do |file|
        content = file.read
      end
      return ['200',
              {'Content-Type' => 'text/html'},
              [ERB.new(content).result(binding)]]
    end
  end

end

run app