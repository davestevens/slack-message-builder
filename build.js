{
  "baseUrl": "app",
  "paths": {
    "text": "../node_modules/requirejs-text/text",
    "handlebars": "../node_modules/handlebars/dist/handlebars",
    "jquery": "../node_modules/jquery/dist/jquery"
  },
  "name": "../node_modules/almond/almond",
  "include": "slack_message_builder",
  "out": "dist/slack_message_builder.min.js",
  "wrap": {
    "startFile": "module_wrappers/wrap-start.frag.js",
    "endFile": "module_wrappers/wrap-end.frag.js"
  }
}
