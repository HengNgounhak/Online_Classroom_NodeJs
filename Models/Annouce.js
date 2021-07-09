const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announceSchema = new Schema({
    cId: {
        type: String,
        required: true
    },
    uId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    datetime: {
        type: String,
        required: true
    },
    file: {
        type: Array,
        required: false
    }
}, { collection: 'Annouce' });

module.exports = mongoose.model('Annouce', announceSchema);