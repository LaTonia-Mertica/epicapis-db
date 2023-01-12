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
  res.send("Epic Apis Server Online!");
});

server.post("/sendEmail", (req, res) => {
  let html = `<i>Thank you for visiting Epic Apis. Selections you submitted are below</i>:<br>`;

  if (req.body.selections.beautifulEntry) {
    html += `<br><br><strong>Beautiful Code: </strong> ${req.body.selections.beautifulEntry.beautifulEntry}<br>`;
  } else {
    html += `<br><strong>Beautiful Code: </strong>Access the 'Beautiful Code' modal at Epic Apis online and add your own definition (or adopt the default definition).<br>`;
  }

  if (req.body.selections.dangerousEntry) {
    html += `<br><strong>Dangerous Code: </strong> ${req.body.selections.dangerousEntry.dangerousEntry}<br><br>`;
  } else {
    html += `<br><strong>Dangerous Code: </strong>Access the 'Dangerous Code' modal at Epic Apis online and add your own definition (or adopt the default definition).<br>`;
  }

  if (req.body.selections.badassestSelection) {
    html += `<br><strong>Badassest On Tv: </strong> ${req.body.selections.badassestSelection}`;
  } else {
    html += `<br><strong>Badassest On Tv: </strong> no selection`;
  }

  if (req.body.selections.bestSelection) {
    html += `<br><strong>Best Age To Be: </strong> ${req.body.selections.bestSelection}`;
  } else {
    html += `<br><strong>Best Age To Be: </strong> no selection`;
  }

  if (req.body.selections.funnyestSelections) {
    html += `<br><strong>Funnyest Ever: </strong> ${req.body.selections.funnyestSelections}`;
  } else {
    html += `<br><strong>Funnyest Ever: </strong> no selection(s)`;
  }

  if (req.body.selections.greatestSelections) {
    html += `<br><strong>Greatest Fantasy: </strong> ${req.body.selections.greatestSelections}`;
  } else {
    html += `<br><strong>Greatest Fantasy: </strong> no selection(s)`;
  }

  if (!req.body.selections.grittiestEntry) {
    html += `<br><strong>Grittiest Army: </strong> no year selected - force of arms name not entered`;
  } else if (!req.body.selections.grittiestEntry.grittiestYear) {
    html += `<br><strong>Grittiest Army: </strong> no year selected - ${req.body.selections.grittiestEntry.grittiestArmy}`;
  } else if (!req.body.selections.grittiestEntry.grittiestArmy) {
    html += `<br><strong>Grittiest Army: </strong> ${req.body.selections.grittiestEntry.grittiestYear} - force of arms name not entered`;
  } else {
    html += `<br><strong>Grittiest Army: </strong> ${req.body.selections.grittiestEntry.grittiestYear} - ${req.body.selections.grittiestEntry.grittiestArmy}`;
  }

  if (req.body.selections.lastSelection) {
    html += `<br><strong>Last Thing Need: </strong> ${req.body.selections.lastSelection}`;
  } else {
    html += `<br><strong>Last Thing Need: </strong> no selection`;
  }

  if (req.body.selections.prettiestSelection) {
    html += `<br><strong>Prettiest Drink: </strong> ${req.body.selections.prettiestSelection}`;
  } else {
    html += `<br><strong>Prettiest Drink: </strong> no selection`;
  }

  if (!req.body.selections.rampantestEntry) {
    html += `<br><strong>Rampantest Lip Wig: </strong> no year selected - name of distinguished mustache'ier not entered`;
  } else if (!req.body.selections.rampantestEntry.rampantestYear) {
    html += `<br><strong>Rampantest Lip Wig: </strong> no year selected - ${req.body.selections.rampantestEntry.rampantestStache}`;
  } else if (!req.body.selections.rampantestEntry.rampantestStache) {
    html += `<br><strong>Rampantest Lip Wig: </strong> ${req.body.selections.rampantestEntry.rampantestYear} - name of distinguished mustache'ier not entered`;
  } else {
    html += `<br><strong>Rampantest Lip Wig: </strong> ${req.body.selections.rampantestEntry.rampantestYear} - ${req.body.selections.rampantestEntry.rampantestStache} `;
  }

  if (!req.body.selections.saySelection) {
    html += `<br><strong>Say This Neva: </strong> no selection`;
  } else {
    html += `<br><strong>Say This Neva: </strong> ${req.body.selections.saySelection.saySelection} - for example, ${req.body.selections.saySelection.phraseToShow}`;
  }

  if (!req.body.selections.sexiestSelections) {
    html += `<br><strong>Sexiest Alter Ego: </strong> no selection(s)`;
  } else if (
    !req.body.selections.sexiestSelections.sexiestMSelection &&
    !req.body.selections.sexiestSelections.sexiestNSelection
  ) {
    html += `<br><strong>Sexiest Alter Ego: </strong><br>&emsp; - <i><strong>Female</strong></i>: ${req.body.selections.sexiestSelections.sexiestFSelection}<br>`;
  } else if (
    !req.body.selections.sexiestSelections.sexiestFSelection &&
    !req.body.selections.sexiestSelections.sexiestNSelection
  ) {
    html += `<br><strong>Sexiest Alter Ego: </strong><br>&emsp; - <i><strong>Male</strong></i>: ${req.body.selections.sexiestSelections.sexiestMSelection}<br>`;
  } else if (
    !req.body.selections.sexiestSelections.sexiestFSelection &&
    !req.body.selections.sexiestSelections.sexiestMSelection
  ) {
    html += `<br><strong>Sexiest Alter Ego: </strong><br>&emsp; - <i><strong>Non Binary</strong></i>: ${req.body.selections.sexiestSelections.sexiestNSelection}`;
  } else if (!req.body.selections.sexiestSelections.sexiestNSelection) {
    html += `<br><strong>Sexiest Alter Ego: </strong><br>&emsp; - <i><strong>Female</strong></i>: ${req.body.selections.sexiestSelections.sexiestFSelection}<br>&emsp; - <i><strong>Male</strong></i>: ${req.body.selections.sexiestSelections.sexiestMSelection}<br>`;
  } else if (!req.body.selections.sexiestSelections.sexiestMSelection) {
    html += `<br><strong>Sexiest Alter Ego: </strong><br>&emsp; - <i><strong>Female</strong></i>: ${req.body.selections.sexiestSelections.sexiestFSelection}<br>&emsp; - <i><strong>Non Binary</strong></i>: ${req.body.selections.sexiestSelections.sexiestNSelection}`;
  } else if (!req.body.selections.sexiestSelections.sexiestFSelection) {
    html += `<br><strong>Sexiest Alter Ego: </strong><br>&emsp; - <i><strong>Male</strong></i>: ${req.body.selections.sexiestSelections.sexiestMSelection}<br>&emsp; - <i><strong>Non Binary</strong></i>: ${req.body.selections.sexiestSelections.sexiestNSelection}`;
  } else {
    html += `<br><strong>Sexiest Alter Ego: </strong><br>&emsp; - <i><strong>Female</strong></i>: ${req.body.selections.sexiestSelections.sexiestFSelection}<br>&emsp; - <i><strong>Male</strong></i>: ${req.body.selections.sexiestSelections.sexiestMSelection}<br>&emsp; - <i><strong>Non Binary</strong></i>: ${req.body.selections.sexiestSelections.sexiestNSelection}`;
  }

  const msg = {
    to: req.body.email,
    from: "epicapis@latoniamertica.dev",
    subject: "Toss 🎊 Confetti 🎊 Time: Your EPIC APIS Selections Arrived 🎉",
    html,
  };

  (async () => {
    try {
      await sgMail.send(msg);
      console.log("Email Sent!");
      res.send({ success: true });
    } catch (error) {
      res.send({ success: false });
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
