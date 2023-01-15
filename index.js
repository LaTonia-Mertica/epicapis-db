const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

const bodyParser = require("body-parser");
server.use(bodyParser.json());

const apiKey = require("./sendgridkey");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(apiKey);

const logoBase64 = require("./logoBase64");

// ADD ATTACHMENT(S) TO EMAIL
const fs = require("fs");
summaryPath = `epic-apis-summary.pdf`;
summaryPdf = fs.readFileSync(summaryPath).toString("base64");
dfdPath = `epicapis-dfd.pdf`;
dfdPdf = fs.readFileSync(dfdPath).toString("base64");
tryPath = `TRY.pdf`;
tryPdf = fs.readFileSync(tryPath).toString("base64");
// ADD LOGO AT BOTTOM OF EMAIL
// logoPath = `epicapis-logo.png`;
// logoImg = fs.readFileSync(logoPath).toString("base64");

let PORT = 3001;

server.get("/", (req, res) => {
  res.send("Epic Apis Server Online!");
});

server.post("/sendEmail", (req, res) => {
  let html = `<i>Thank you for visiting</i>&nbsp;<strong>EPIC APIS</strong>.&nbsp;<i>Selections submitted are below</i>:<br>`;

  if (req.body.selections.beautifulEntry) {
    html += `<br><br><strong>Beautiful Code: </strong> ${req.body.selections.beautifulEntry.beautifulEntry}<br>`;
  } else {
    html += `<br><strong>Beautiful Code: </strong>Access the 'Beautiful Code' modal at Epic Apis online and add your own definition (<strong>note:</strong> you may adopt or adapt the default definition).<br>`;
  }

  if (req.body.selections.dangerousEntry) {
    html += `<br><strong>Dangerous Code: </strong> ${req.body.selections.dangerousEntry.dangerousEntry}<br><br>`;
  } else {
    html += `<br><strong>Dangerous Code: </strong>Access the 'Dangerous Code' modal at Epic Apis online and add your own definition (<strong>note:</strong> you may adopt or adapt the default definition).<br>`;
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

  if (html) {
    html += `<br><br><i>Noteworthy features of</i>&nbsp;<strong>EPIC APIS</strong>&nbsp;<i>are accessible, for your convenience, per <strong>1)</strong> attachment to this email and <strong>2)</strong> Github via link below</i>:<br><br>
    &emsp; - <a href="https://github.com/LaTonia-Mertica/epicapis-db/blob/8cc3c4a86c1e82b8820450c75c8812725f7b675a/epic-apis-summary.pdf" style="text-decoration: none">Summary</a>, detailing the vision and journey behind the ambitious creation of EA<br>
    &emsp; - <a href="https://github.com/LaTonia-Mertica/epicapis-db/blob/518bd74acb66e07acd52b4f1db377177b8f74cb9/epicapis-dfd.pdf" style="text-decoration: none">Data Flow</a>, outlining access, relationships between, and user interactions<br>
    &emsp; - <a href="https://github.com/LaTonia-Mertica/epicapis-db/blob/a611e94bc635b1cdfddb259b75ff7c137b024e4e/TRY.pdf" style="text-decoration: none">TRY</a> (an invite), debating possibilities and reasons to embrace code as a culture<br>
    
    <img src="data:image/png;base64,${logoBase64}" alt="Epic Apis Logo" width="50%" style="text-align: center"/> <br><br>`;
  }

  const msg = {
    to: req.body.email,
    from: "epicapis@latoniamertica.dev",
    subject: "Toss 🎊 Confetti 🎊 Time: EPIC APIS Selections Await 🎉",
    html,
    attachments: [
      {
        content: summaryPdf,
        filename: "epic-apis-summary.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
      {
        content: dfdPdf,
        filename: "epicapis-dfd.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
      {
        content: tryPdf,
        filename: "try.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
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
