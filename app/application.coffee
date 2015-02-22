require.config
  baseUrl: "/app"
  paths:
    "text": "../node_modules/requirejs-text/text"
    "handlebars": "../node_modules/handlebars/dist/handlebars"
    "jquery": "../node_modules/jquery/dist/jquery"

require ["jquery", "slack_message_builder"], ($, SlackMessageBuilder) ->
  new SlackMessageBuilder(
    $input: $(".input")
    $output: $(".output")
  ).bind_events()
