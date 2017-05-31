# Pusher WebRTC Chat Demo

This is a demo WebRTC application for peer-to-peer chat, meaning you don't necessarily need an Internet connection to send messages. It uses the Pusher realtime API for signalling, allowing devices to discover each other and make a connection using WebRTC.

There's a [demo showing this in action](https://webrtc-chat-demo.herokuapp.com/), as well as a [full tutorial on how to create something like this](http://pusher.com/tutorials/webrtc_chat) yourself.

## Servers

You can use any server to pass-through the Pusher messages. This demo provides a few of the most common platforms.

### /src/_servers/nodejs

The server code required to run the demo using [Node.js](http://nodejs.org/).

The `src/js/datachannel-demo.js` file by default is set up to send AJAX requests to the Node.js server.

You'll need to change the config values in `src/_servers/nodejs/config.example.js` and rename it to `config.js`, as well as changing the `PUSHER_APP_KEY` and `PUSHER_APP_CLUSTER` values in `src/js/datachannel-demo.js`.

You can then get up and running by running the following commands in the terminal:

```
$ cd /path/to/your/app/src/_servers/nodejs
$ npm install
$ node app.js
```
    
And navigating to http://localhost:5001 to see the side-by-side example or http://localhost:5001/chat.html to see the standalone example.

### /src/_servers/php

The server code required to run the demo using [PHP](http://php.net/).

The `src/js/datachannel-demo.js` file __is not__ set up to send AJAX requests to the PHP server by default. To enable this you'll need to change the AJAX URL in `datachannel.openSignalingChannel` to point to `_servers/php/message.php`.

You'll also need to change the config values in `src/_servers/php/config.example.php` and rename it to `config.php`, as well as changing the `PUSHER_APP_KEY` and `PUSHER_APP_CLUSTER` values in `src/js/datachannel-demo.js`.

You can then install your dependencies using [composer](https://getcomposer.org/)

```
$ cd /path/to/your/app/src/_servers/php
$ composer install
```

Navigate to http://yourdomain.dev/index.html to see the side-by-side example or http://yourdomain.dev/chat.html to see the standalone example. Obviously you'll need to change the domain to wherever you're hosting the PHP files.

### /src/_servers/ruby-sinatra

The server code required to run the demo using [Ruby Sinatra](http://www.sinatrarb.com/).

The `src/js/datachannel-demo.js` file by default is set up to send AJAX requests to the Ruby Sinatra server.

You'll need to change the config values in `src/_servers/ruby-sinatra/config.example.rb` and rename it to `config.rb`, as well as changing the `PUSHER_APP_KEY` and `PUSHER_APP_CLUSTER` value in `src/js/datachannel-demo.js`.

You can then get up and running by running the following commands in the terminal:

```
$ cd /path/to/your/app/src/_servers/ruby-sinatra
$ bundle install
$ bundle exec ruby -rubygems app.rb
```
    
And navigating to http://localhost:4567 to see the side-by-side example or http://localhost:4567/chat.html to see the standalone example.

## Security

It's worth noting that the default __PHP server setup__ in this demo will potentially leave the demo config files for other platforms open to being read. It's highly recommended to implement strict control over which files can be read from your server, or moving the server files into a directory outside of public reach.

_When using this demo in your own production environment, you should remove the servers you don't need and ensure that config files aren't readable to the public._
