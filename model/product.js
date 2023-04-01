import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Please enter the product category"], // can be -> Research, Internship, Hackathon, Olacement, Quiz, Scholoraship, Codding contest, CP, Technical Program, Speaker@Conference
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
  },
  mrp: {
    type:Number
  }
});

export default mongoose.model("Product", ProductSchema);


//image, name, price, mrp, category, desc, 