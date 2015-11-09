var $ = require("jquery");
var Handlebars = require("./handlebars-helpers");

class SlackMessageBuilder {
  constructor(options) {
    this.$input = options.$input;
    this.$output = options.$output;

    this.defaults = {
      payload: {
        username: "incoming-webhook",
        icon_url: "https://avatars1.githubusercontent.com/u/287677?v=3&s=40",
        mrkdwn: true,
        attachments: []
      },
      attachment: {
        color: "#E3E4E6",
        mrkdwn_in: []
      }
    };
  }

  bind_events() {
    this.$input
      .find(".js-build")
      .on("click", this._parse_message.bind(this));
  }

  // Private

  _parse_message(event) {
    event.preventDefault();

    var $payload = this.$input.find(".js-payload"),
        payload = this._parse($payload.val());
    if (!payload) { return; }
    $payload.val(JSON.stringify(payload, null, 2));

    payload = $.extend({}, this.defaults.payload, payload);
    payload.attachments = this._extend_attachments(payload.attachments);

    var html = Handlebars.partials.message(payload);

    this.$output.append(html);
    this.$output.animate({ scrollTop: this.$output.get(0).scrollHeight }, 800);
  }

  _parse(input) {
    try {
      return JSON.parse(input);
    }
    catch(error) {
      // TODO: display error inline
      alert(`Error parsing JSON: ${error.message}`);
    }
  }

  _extend_attachments(attachments) {
    var defaults = this.defaults.attachment;
    return attachments.map(function(attachment) {
      return $.extend({}, defaults, attachment);
    });
  }
};

module.exports = SlackMessageBuilder;
