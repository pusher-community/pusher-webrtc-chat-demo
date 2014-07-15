require "sinatra"
require "pusher"
require "json"

require_relative "config"

include Rack::Utils

set :public_folder, "../.."

get "/" do
  redirect '/index.html'
end

post "/message" do
  # TODO: Check for valid POST data

  result = Pusher.trigger(params[:channel], "message", params[:message], {socket_id: params[:socketId]})

  status 200
end