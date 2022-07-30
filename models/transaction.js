//Please see CREDITS/CITATIONS here - I have included these in my readme as well.
//* Class activities for coding service workers file - class activity 05-Notetaker PWA
//* TA Charlie for explaining and helping code service workers, how to write a manifest, understand offline functionality for idb.js and for helping me deploy my application to heroku.
//* Module 18 lesson on NoSql and for coding idb.js file, lesson 4 - https://courses.bootcampspot.com/courses/1196/pages/18-dot-4-3-introducing-indexeddb?module_item_id=463159
//* Module 19 lesson 4 on PWA and service worker - https://courses.bootcampspot.com/courses/1196/pages/19-dot-4-3-introduction-to-service-workers?module_item_id=463581
//* Module 18 lesson 5 on linking MongoDB Atlas with Heroku - https://courses.bootcampspot.com/courses/1196/pages/18-dot-5-1-introduction?module_item_id=463209
//* Starter code provided in assignment to get started


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter a name for transaction"
    },
    value: {
      type: Number,
      required: "Enter an amount"
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
