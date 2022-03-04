import mongoose from "mongoose";
const { Schema } = mongoose;

const marksSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: "test",
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  marks: {
    type: Number,
    default: -1,
  },
});

export default mongoose.model("marks", marksSchema);
