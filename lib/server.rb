require "./lib/init"

disable :logging
set :root, File.dirname(__FILE__) + "/../"

get "/" do
  File.readlines("public/index.html")
end

get "/toppings" do
  content_type "application/json"
  File.readlines("public/toppings.json")
end

get "/sauces" do
  content_type "application/json"
  File.readlines("public/sauces.json")
end

get "/favicon.ico" do
  ""
end

