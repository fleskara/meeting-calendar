const mongoose = require('mongoose');
const Meeting = require('../models/meetings.js');

const getAllMeetings = async (req, res, next) => {
    try {
        const allMeetings = await Meeting.find({}).exec();
        if (allMeetings === null) {
            res.status(404).json({});
        }
        else {
            res.status(200).json(allMeetings);
        }
    } catch(error) {
        next(error);
    } 
};

const getMeetingById = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (!id) {
            const error = new Error("Meeting id is missing!");
            error.status = 400;
            throw error;
        }

        const meeting = await Meeting.findOne({_id: id}).exec();
        if (meeting === null) {
            res.status(404).json({});
        }
        else {
            res.status(200).json(meeting);
        }
    } catch(error) {
        next(error);
    }
};

const addNewMeating = async (req, res, next) => {
    const {title, description, day, 
        month, year, time, membersIds} = req.body;

    try {
        if (!title || !description || !day || 
            !month || !year || !time || !membersIds) {
                const error = new Error("Missing information for new meeting!");
                error.status = 400;
                throw error;
        }

        const newMeeting = new Meeting({
            _id: mongoose.Types.ObjectId(),
            title: title,
            description: description,
            day: day,
            month: month,
            year: year,
            time: time,
            members: membersIds
        });

        await newMeeting.save();
        res.status(200).json(newMeeting);
    } catch(error) {
        next(error);
    }
};

const deleteMeeting = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (!id) {
            const error = new Error("Meeting id is missing!");
            error.status = 400;
            throw error;
        }

        const meeting = await Meeting.deleteOne({_id: id}).exec();

        if (meeting.deletedCount == 1) {
            res.status(200).json({success: true});
        } else {
            res.status(404).json();
        }
    } catch(error) {
        next(error);
    }
};

module.exports = {
    getAllMeetings,
    getMeetingById,
    addNewMeating,
    deleteMeeting
};
