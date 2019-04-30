const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const Group = require("./src/group")
const Concept = require("./src/concept")


const API_PORT = 3000; //change for local testing, for instance to 3000
const app = express();
app.use(cors());
app.use(bodyParser({limit: '50mb'}));
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://dronut-user:dronuts@cluster0-shard-00-00-hpghn.azure.mongodb.net:27017,cluster0-shard-00-01-hpghn.azure.mongodb.net:27017,cluster0-shard-00-02-hpghn.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));



// this is our get method
// this method fetches all available data in our database
router.get("/getGroup", (req, res) => {
    Group.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getGroup2", (req, res) => {
   keyword = req.query.keyword;
   Group.find({"keyword" : keyword}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateGroup", (req, res) => {
  const { id, update } = req.body;
  console.log(req.body);
  Group.findOneAndUpdate({ "_id" : id}, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteGroup", (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  Group.findOneAndDelete({ "_id" : id}, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putGroup", (req, res) => {
  let group = new Group(req.body);

  console.log(req.body);

  group.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// this is our get method
// this method fetches all available data in our database
router.get("/getConcepts", (req, res) => {
   Concept.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getConceptsByGroup", (req, res) => {
   groupID = req.query.groupID;
   Concept.find({"group_id" : groupID}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});



// this is our update method
// this method overwrites existing data in our database
router.post("/updateConcept", (req, res) => {
  const { id, update } = req.body;
  console.log(req.body);
  Concept.findOneAndUpdate({ "_id" : id}, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this method increments the number of yeses on a concept by one
// mongoDB creates write locks automatically, each transaction is atomic
router.post("/yes", (req, res) => {
  const {id} = req.body;
  Concept.findOneAndUpdate({ "_id": id}, { $inc: { "yes": 1 } }, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/yesand", (req, res) => {
  const {id, text} = req.body;
  Concept.findOneAndUpdate({ "_id": id}, 
    { 
      $inc: { "yes": 1 }, 
      $push: { "yesand": text} 
    }, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteConcept", (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  Concept.findOneAndDelete({ "_id" : id}, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putConcept", (req, res) => {
  let concept = new Concept(req.body);

  console.log(req.body);

  concept.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});



// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
