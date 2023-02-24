const { default: mongoose } = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({
  name: { type: String, required: true },
  itens: [
    { type: Schema.Types.ObjectId, ref: 'Item' },
  ],
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);
