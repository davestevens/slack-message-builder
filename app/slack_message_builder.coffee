define ["jquery", "handlebars_helpers"],
($, Handlebars) ->
  class SlackMessageBuilder
    constructor: (options) ->
      @$input = options.$input
      @$output = options.$output

    bind_events: ->
      @$input.find(".js-build").on("click", @_parse_message)

    payload_defaults:
      username: "incoming-webhook"
      icon_url: "https://slack.global.ssl.fastly.net/12078/img/services/incoming-webhook_48.png"
      mrkdwn: true
      attachments: []

    attachment_defaults:
      color: "#E3E4E6"
      mrkdwn_in: []

    # private

    _parse_message: (event) =>
      event.preventDefault()

      payload = @_parse_input()
      return unless payload
      @$input.find(".js-payload").val(JSON.stringify(payload, null, 2))

      payload = $.extend({}, @payload_defaults, payload)
      payload.attachments = @_extend_attachments(payload.attachments)

      html = @_message_template(payload)

      @$output.append(html)
      @$output.animate({ scrollTop: @$output[0].scrollHeight }, 800)

    _message_template: (payload) ->
      template = Handlebars.compile(Handlebars.partials.message)
      template(payload)

    _parse_input: ->
      try
        JSON.parse(@$input.find(".js-payload").val())
      catch error
        # TODO: display error inline
        alert "Error parsing JSON: #{error.message}"

    _extend_attachments: (attachments) ->
      for attachment in attachments
        $.extend({}, @attachment_defaults, attachment)