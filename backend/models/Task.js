const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    subject: String,
    date: Date,
    time: String
});

module.exports = mongoose.model('Task', taskSchema);