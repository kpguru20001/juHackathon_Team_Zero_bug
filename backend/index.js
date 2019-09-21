const express = require("express");
const parser = require("body-parser");
const lodash = require("lodash");
//const invoke = require("./hyp-ledg/invoke");
const { SHA256 } = require("crypto-js");
var app = express();

app.use(parser.json());

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};
app.use(allowCrossDomain);

//GET - Send UserID
app.get("/getEvents/:userId", (req, res) => {
  console.log("Get Events");
  console.log(req.params.userId);
  //Code Goes Here
  res.send(req.params.userId);
});

//GET - Nothing To Send
app.get("/getAllEvents", (req, res) => {
  console.log("Get All Events");
  //Code Goes Here
  res.send("All Events");
});

//GET - Send UserID
app.get("/getUserProfile/:userId", (req, res) => {
  console.log("Get User Profile");
  console.log(req.params.userId);
  //Code Goes Here
  res.send(req.params.userId);
});

//GET - Nothing To Send
app.get("/getAllUserProfile", (req, res) => {
  console.log("Get All User Profiles");
  //Code Goes Here
  res.send("All Users");
});

//GET - Send UserID
app.get("/getCerifierProfile/:userId", (req, res) => {
  console.log("Get Certifier User");
  console.log(req.params.userId);
  //Code Goes Here
  res.send(req.params.userId);
});

//GET - Send UserID
app.get("/getCerificates/:userId", (req, res) => {
    console.log("Get Certificates");
    console.log(req.params.userId);
    //Code Goes Here
    res.send(req.params.userId);
});

//GET - Nothing To Send
app.get("/getAllCerifierProfile", (req, res) => {
  console.log("Get All Certifier Profiles");
  //Code Goes Here
  res.send("All Certifiers");
});

//Post - Send Name and Domain of Event
app.post("/addEvent", (req, res) => {
  console.log("Add Event");
  console.log(req.body.name);
  //Code Goes Here
  res.send(req.body.name);
});

//Post - Send userId and eventId
app.post("/verifyEvent", (req, res) => {
  console.log("Verifying Event");
  console.log(req.body.userId);
  console.log(req.body.eventId);
  //Code Goes Here
  res.send(req.body.userId);
});

//Post - Send userId
app.post("/addCertificate", (req, res) => {
  console.log(body);
  console.log("Adding Certificate");
  console.log(req.body.userId);
  //Code Goes Here
  res.send(req.body.userId);
});

//Post - Send userId and certificateId
app.post("/verifyCertificate", (req, res) => {
  console.log("Verifying Certificate");
  console.log(req.body.userId);
  //Code Goes Here
  res.send(req.body.userId);
});

//Post - Send name of certifier
app.post("/createCertifier", (req, res) => {
  console.log("Registering Certifier");
  console.log(req.body.name);
  const id = req.body.certifierId;
  //Code Goes Here
<<<<<<< HEAD
  invoke(id,req.body.name);
=======
  //invoke(id, name);
>>>>>>> 361ca5111ddd35d039b423d5e259e7e1422b8303
  res.send(req.body.name);
});

//Post - Send user name
app.post("/createUser", (req, res) => {
  console.log("Registering User");
  console.log(req.body.name);
  //Code Goes Here
  res.send(req.body.name);
});

app.post("/login", (req, res) => {
  //console.log(req);
  console.log("loggging in ");
  var body = lodash.pick(req.body, ["userId", "password"]);
  console.log(req.body.userId);
  if (body.userId == "123" && body.password == "123") {
      res.send({ verified: "yes", events: [{ Key: "1", Record: { certifierId: "1", eventName: "jss", expertise: "block", role: 3 } }, { Key: "123", Record: { certifierId: "12", eventName: "jain", expertise: "iot", role: 3 } }],
          employees:[{ Key: "1", Record: { certifierId: "1", name: "jss", expertise: "block", role: 3 } }, { Key: "123", Record: { certifierId: "12", name: "jain", expertise: "iot", role: 3 } }], 
          me: { Key: "1", Record: { certifierId: "56", name: "hola", expertise: "block", role: 0 } }
        });
  } else {
    res.send({ verified: "no" });
  }
});

app.listen(3001, () => {});
