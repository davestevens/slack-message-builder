var $ = require("jquery");
var SlackMessageBuilder = require("./slack-message-builder");

var builder = new SlackMessageBuilder({
  $input: $(".input"),
  $output: $(".output")
});
builder.bind_events();
