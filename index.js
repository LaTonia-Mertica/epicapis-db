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
  const msg = {
    to: "epicapis+1@latoniamertica.dev", //TODO switch to req.body from input on frontend
    from: "epicapis@latoniamertica.dev",
    subject: "Your EPIC API Selections",
    html: "Thank you for visiting Epic Apis. Selections you submitted are outlined below:",
  };
  (async () => {
    try {
      await sgMail.send(msg);
      console.log("Email sent");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
});

server.listen(PORT, () => {
  console.log("Running!");
});
