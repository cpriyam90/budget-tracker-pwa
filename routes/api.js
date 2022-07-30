//Please see CREDITS/CITATIONS here - I have included these in my Readme as well.
//* Class activities for coding service workers file - class activity 05-Notetaker PWA
//* TA Charlie for explaining and helping code service workers, how to write a manifest, understand offline functionality for idb.js and for helping me deploy my application to heroku.
//* Module 18 lesson on NoSql and for coding idb.js file, lesson 4 - https://courses.bootcampspot.com/courses/1196/pages/18-dot-4-3-introducing-indexeddb?module_item_id=463159
//* Module 19 lesson 4 on PWA and service worker - https://courses.bootcampspot.com/courses/1196/pages/19-dot-4-3-introduction-to-service-workers?module_item_id=463581
//* Module 18 lesson 5 on linking MongoDB Atlas with Heroku - https://courses.bootcampspot.com/courses/1196/pages/18-dot-5-1-introduction?module_item_id=463209
//* Starter code provided in assignment to get started


const router = require("express").Router();
const Transaction = require("../models/transaction.js");

router.post("/api/transaction", ({body}, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;