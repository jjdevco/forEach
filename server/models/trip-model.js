const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const tripSchema = new mongoose.Schema(
  {
    _id: Number,
    date: { type: String, required: true },
    time: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    distance: { type: Number, required: true },
    by: { type: String, required: true },
    travelers: { type: Number, required: true },
    roundTrip: { type: Boolean, required: true },
    costPerPerson: { type: Number, required: true },
  },
  { timestamps: true }
);

tripSchema.plugin(AutoIncrement);

module.exports = mongoose.model("trips", tripSchema);
