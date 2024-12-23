import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;
