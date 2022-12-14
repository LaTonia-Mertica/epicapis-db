# **EPIC APIS DATABASE**

##### [epic apis summary](epic-apis-summary.pdf)

##### [epic apis data flow](epicapis-dfd.pdf)

##### [frontend github repo](https://github.com/LaTonia-Mertica/epicapis)

##### [backend github repo](https://github.com/LaTonia-Mertica/epicapis-db)

<br>

### **BASIC SETUP**

- install body parser, cors, express, nodemon, sendgrid

- in app/index/server file, _add requires_

  - const express = require("express");
  - const cors = require("cors");
  - const bodyParser = require("body-parser");
  - const apiKey = require("./sendgridkey");
  - const sgMail = require("@sendgrid/mail");

- in app/index/server file, _assign server_

  - const server = express();

- in app/index/server file, _arrange to use_

  - server.use(cors());
  - server.use(bodyParser.json());

- in app/index/server file, _pass api key_ per sendgrid api documentation

  - sgMail.setApiKey(apiKey);

### **SENDGRID**

an email application programming interface. also known as Twilio SendGrid.

per wikipedia, "_SendGrid provides a cloud-based service that assists businesses with email delivery. The service manages various types of email including shipping notifications, friend requests, sign-up confirmations, and email newsletters. It also handles Internet service provider (ISP) monitoring, domain keys, sender policy framework (SPF), and feedback loops. Additionally, the company provides link tracking, open rate reporting. It also allows companies to track email opens, unsubscribes, bounces, and spam reports. Beginning in 2012, the company integrated SMS, voice, and push notification abilities to its service through a partnership with Twilio._"

### **BASIC SENDGRID STRUCTURE**

```
server.post("/sendEmail", (req, res) => {
  const msg = {
    to: "epicapis+1@latoniamertica.dev",
    from: "epicapis@latoniamertica.dev",
    subject: "Your EPIC API Selections",
    html: `Thank you for visiting Epic Apis. Selections you submitted are outlined below:`,
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
```

### **PORT: PASS DIRECTLY VERSUS INDIRECTLY**

`let PORT = 3001;` is a bit more code while a cleaner way to pass the port to the node.js server.listen() method. this indirect way of passing the port is helpful for when the port needs to or will change.

**example:** `server.listen(PORT, () => { console.log("Running On Port " + PORT); });`

to pass the port directly simply do not assign the port to a variable. instead, add the port number as the first parameter in the server.listen() method and in every instance where the port is used. for example, in console.log() if the console log method includes the specific port in the output message.

**example:** `server.listen(3000, () => { console.log("Running On Port " + 3000); });`

### **WIRING BACKEND TO FRONTEND**

### **BASIC STRUCTURE: ACCESS DATA TO INCLUDE IN EMAIL API SUBMISSION**
