import mongoose from "mongoose";

const produceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Vegetable", "Fruit", "Grain"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    discountPercentage: 
    { type: Number, 
    default: 0 },

    unit: {
      type: String,
      enum: ["kg", "piece", "ton"],
      default: "kg",
    },

    quantity: {
      type: Number,
      required: true,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required:true,
    },

    image: {
      type: String,
    },

    isOnOffer: 
    { type: Boolean, 
    default: false },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export const Produce = mongoose.model("Produce", produceSchema);
