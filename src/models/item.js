const { default: mongoose } = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  list: { type: Schema.Types.ObjectId, ref: 'List' },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
