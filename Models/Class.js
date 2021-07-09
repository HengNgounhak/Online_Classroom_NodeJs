const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    teacher: {
        type: Array,
        required: true
    },
    student: {
        type: Array,
        required: false
    }
}, { collection: 'Class' });

module.exports = mongoose.model('Class', userSchema);