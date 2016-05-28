app = lambda do |env|

  url = '/' + env['REQUEST_URI'].split('/')[3..-1].join('/')

  if url == '/post'
    ['200', {'Content-Type' => 'text/html'}, [content]]
  end

end

run app