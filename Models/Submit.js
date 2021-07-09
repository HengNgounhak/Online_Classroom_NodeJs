const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submitSchema = new Schema({
    assignmentId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    submitAt: {
        type: String,
        required: true
    },
    file: {
        type: Array,
        required: false
    },
    score: {
        type: Number,
        required: false
    }
}, { collection: 'Submit' });

module.exports = mongoose.model('Submit', submitSchema);