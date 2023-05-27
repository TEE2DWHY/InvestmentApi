const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: [true, "Please enter an amount"],
    },
    investmentChoice: {
      type: String,
      enum: {
        values: ["bronze", "silver", "gold", "platinum"],
      },
      default: "bronze",
    },
    profit: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Investments", investmentSchema);
