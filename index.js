const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
const bodyParser = require("body-parser");
server.use(bodyParser.json());
const apiKey = require("./sendgridkey");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(apiKey);

let PORT = 3001;

server.get("/", (req, res) => {
  res.send("Server Online!");
});

server.post("/sendEmail", (req, res) => {
  let html = `Thank you for visiting Epic Apis. Selections you submitted are outlined below:`;

  if (req.body.selections.badassestSelection) {
    html += `<br><strong>Badassest: </strong> ${req.body.selections.badassestSelection}`;
  }

  const msg = {
    to: req.body.email,
    from: "epicapis@latoniamertica.dev",
    subject: "Toss Confetti Time🎊: Your EPIC API Selections Arrived!",
    html,
  };

  console.log(req.body.email, req.body.selections);

  (async () => {
    try {
      await sgMail.send(msg);
      console.log("Email Sent!");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
});

server.listen(PORT, () => {
  console.log("Running On Port " + PORT);
});

module.exports = server;
