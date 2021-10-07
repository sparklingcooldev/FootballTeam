const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const schema = new Schema(
  {
    id: {
      type: String,
      require: true
    },
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    permission: {
      type: Boolean,
      require: true
    },
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    level: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    money: {
      type: Number,
      require: true
    },
    country: {
      type: String,
      require: true
    },
  },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("users", schema);