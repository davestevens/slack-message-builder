var Handlebars = require("handlebars/runtime")["default"];
var $ = require("jquery");

module.exports = Handlebars;

Handlebars.registerPartial({
  message: require("./templates/message.hbs"),
  attachment: require("./templates/attachment.hbs"),
  attachment_author: require("./templates/attachment_author.hbs"),
  attachment_title: require("./templates/attachment_title.hbs"),
  attachment_fields: require("./templates/attachment_fields.hbs"),
  attachment_field: require("./templates/attachment_field.hbs")
});

Handlebars.registerHelper("attachment_format", function(name, attachment) {
  var string = attachment[name];
  var markdown = $.inArray(name, attachment.mrkdwn_in) > -1;
  return Handlebars.helpers.format(string, markdown);
});

Handlebars.registerHelper("member_image", function(item) {
  // TODO: emoji_url || icon_url
  return item.icon_url;
});

Handlebars.registerHelper("timestamp", function() {
  var date = new Date()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var meridiem = (hours > 11) ? "PM" : "AM"
  return `${hours % 12}:${minutes} ${meridiem}`
});

Handlebars.registerHelper("format", function(string, markdown) {
  if (!string) { return ""; }
  // links
  string = string.replace(/<(.*?)>/g, "<a>$1</a>");

  // replace newlines
  string = string.replace("\n", "<br/>");
  // replace spaces
  string = string.replace(/\s/g, "&nbsp;");

  if (markdown) {
    // markdown
    //// bold *
    string = string.replace(/\*(.*?)\*/g, "<b>$1</b>");
    //// italic _
    string = string.replace(/_(.*?)_/g, "<i>$1</i>");
    //// pre ```
    string = string.replace(/```(.*?)```/g, "<pre>$1</pre>");
    //// code `
    string = string.replace(/`(.*?)`/g, "<code>$1</code>");
  }

  return new Handlebars.SafeString(string);
});

Handlebars.registerHelper("wrap_link", function(item, href) {
  if (!href) { return item; }
  return new Handlebars.SafeString("<a href='#{href}'>#{item}</a>");
});
