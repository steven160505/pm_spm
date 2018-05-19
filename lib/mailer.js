var Emailer, _, emailer, exports, fs;

    emailer = require("nodemailer");
    fs = require("fs");
    smtpTransport = require('nodemailer-smtp-transport'),
    _ = require("underscore");

Emailer = (function() {
  Emailer.prototype.options = {};

  Emailer.prototype.data = {};

  Emailer.prototype.attachments = [
    {
      fileName: "logo.png",
      filePath: "../public/images/email/logo.png",
      cid: "logo@myapp"
    }
  ];

  function Emailer(options, data1) {
    this.options = options;
    this.data = data1;
  }

  Emailer.prototype.send = function(callback) {
    var attachments, html, messageData, transport;
    html = this.getHtml(this.options.template, this.data);
    console.log('html content to send:',html);
    // attachments = this.getAttachments(html);
    messageData = {
      to: "'" + this.options.to.name + " " + this.options.to.surname + "' <" + this.options.to.email + ">",
      from: "3076576739@qq.com",
      subject: this.options.subject,
      html: html,
      generateTextFromHTML: true,
      attachments: attachments
    };
    transport = this.getTransport();
    return transport.sendMail(messageData, callback);
  };


  Emailer.prototype.getTransport = function() {
    return emailer.createTransport(smtpTransport({
        host: "smtp.qq.com", // 主机
        secure: true, // 使用 SSL
        port: 465, // SMTP 端口
        auth: {
          user: "3076576739@qq.com", // 账号
          pass: "oxwgiaegalnwdccd" // 密码
        }
      }));
  };

  Emailer.prototype.getHtml = function(templateName, data) {
    var encoding, templateContent, templatePath;

    templatePath = __dirname + "/../app/views/emails/" + templateName + ".html";
    templateContent = fs.readFileSync(templatePath, encoding = "utf8");
    console.log('template html render result:', _.template(templateContent, data, {
      interpolate: /\{\{(.+?)\}\}/g
    }));
    return _.template(templateContent, data, {
      interpolate: /\{\{(.+?)\}\}/g
    });
  };

  return Emailer;

})();

exports = module.exports = Emailer;