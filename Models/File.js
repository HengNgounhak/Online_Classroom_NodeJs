const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    cId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dateAdd: {
        type: String,
        required: true
    }
}, { collection: 'File' });

module.exports = mongoose.model('File', fileSchema);