define [
  "handlebars",
  "text!templates/message.hbs"
  "text!templates/attachment.hbs"
  "text!templates/attachment_author.hbs"
  "text!templates/attachment_title.hbs"
  "text!templates/attachment_fields.hbs"
  "text!templates/attachment_field.hbs"
], (
  Handlebars,
  message,
  attachment,
  attachment_author,
  attachment_title,
  attachment_fields,
  attachment_field
) ->
  Handlebars.registerHelper("attachment_format", (name, attachment) ->
    string = attachment[name]
    markdown = $.inArray(name, attachment.mrkdwn_in) > -1
    Handlebars.helpers.format(string, markdown)
  )

  Handlebars.registerHelper("member_image", (item) ->
    # TODO: emoji_url || icon_url
    item.icon_url
  )

  Handlebars.registerHelper("timestamp", ->
    date = new Date()
    hours = date.getHours()
    minutes = date.getMinutes()
    meridiem = if (hours > 11) then "PM" else "AM"
    "#{hours % 12}:#{minutes} #{meridiem}"
  )

  Handlebars.registerHelper("format", (string, markdown) ->
    return "" unless string
    # links
    string = string.replace(/<(.*?)>/g, "<a>$1</a>")

    # replace newlines
    string = string.replace("\n", "<br/>")
    # replace spaces
    string = string.replace(/\s/g, "&nbsp;")

    if (markdown)
      # markdown
      ## bold *
      string = string.replace(/\*(.*?)\*/g, "<b>$1</b>")
      ## italic _
      string = string.replace(/_(.*?)_/g, "<i>$1</i>")
      ## pre ```
      string = string.replace(/```(.*?)```/g, "<pre>$1</pre>")
      ## code `
      string = string.replace(/`(.*?)`/g, "<code>$1</code>")

    new Handlebars.SafeString(string)
  )

  Handlebars.registerHelper("wrap_link", (item, href) ->
    return item unless href
    new Handlebars.SafeString("<a href='#{href}'>#{item}</a>")
  )

  Handlebars.registerPartial("message", message)
  Handlebars.registerPartial("attachment", attachment)
  Handlebars.registerPartial("attachment_author", attachment_author)
  Handlebars.registerPartial("attachment_title", attachment_title)
  Handlebars.registerPartial("attachment_fields", attachment_fields)
  Handlebars.registerPartial("attachment_field", attachment_field)

  Handlebars
