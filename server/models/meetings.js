const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    day: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    month: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    year: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    time: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    members: {
        type: [mongoose.Schema.Types.String],
        required: true
    }
});

const meetingModel = mongoose.model('meetings', meetingSchema);

module.exports = meetingModel;
