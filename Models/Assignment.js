const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    cId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    dateline: {
        type: String,
        required: true
    },
    file: {
        type: Array,
        required: false
    },
    score: {
        type: Number,
        required: true
    }
}, { collection: 'Assignment' });

module.exports = mongoose.model('Assignment', assignmentSchema);