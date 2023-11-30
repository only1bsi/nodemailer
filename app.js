// const express = require("express");
// const bodyParser = require("body-parser");
// const exphbs  = require('express-handlebars');

// const nodemailer = require("nodemailer");

// const app = express();

// // View engine setup
// app.engine('handlebars', exphbs());
// app.set("view engine", "handlebars"); 

// // Static folder
// app.use("/public", express.static(path.json(__dirname, "public")))

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.get("/", (req, res) => {
//   res.send("hello");
// })

// app.listen(3001, () => console.log("Server started..."));







const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// Configure Handlebars
app.engine('handlebars', exphbs({
  layoutsDir: path.join(__dirname, 'views'), // Set the layouts directory explicitly
  defaultLayout: 'contact', // Specify your existing layout file (contact.handlebars)
  extname: 'handlebars' // Set the file extension of the views
}));
app.set('view engine', 'handlebars');


// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.render("contact");
});

app.post("/send-email", (req, res) => {
  const output = `
    <p>you have a new contact request<p/>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <li>Phone: ${req.body.message}</li>
  `
  const transporter = nodemailer.createTransport({
  host: "main.samuelthecreator.com",
  port: 465,
  secure: true,
  auth: {
    
    user: "Info@bigconnect.com.ng",
    pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
  },
});


async function main() {

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔", 
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);

}
 
  console.log(req.body);
});

app.listen(3001, () => console.log("Server started..."));
