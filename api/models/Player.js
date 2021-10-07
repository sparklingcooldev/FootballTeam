const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const schema = new Schema(
  {
    firstname: {
      type: String,
      require: true
    },
    lastname: {
      type: String,
      require: true
    },
    team_id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    price: {
      type: Number,
      require: true
    }
  },
  { versionKey: false, timestamps: true },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("players", schema);