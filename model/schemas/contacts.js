const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const contactsSchema = new Schema({
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: [true, "missing required name field"],
  },
  email: {
    type: String,
    required: [true, "missing required email field"],
  },
  phone: {
    type: Number,
    required: [true, "missing required phone field"],
  },
  favorite: {
    type: String,
    default: false,
  },
});

contactsSchema.path("name").validate((value) => {
  const re = /[A-Z a-z]\w+/;
  return re.test(String(value));
});

contactsSchema.virtual("strPhone").get(function () {
  return `${this.phone} phone`;
});

contactsSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactsSchema);

module.exports = Contact;
