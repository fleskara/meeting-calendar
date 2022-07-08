const mongoose = require('mongoose');
const Meeting = require('../models/meetings.js');

const getMeetingById = async (req, res, next) => {
    const _id= req.params.id;

    try {
        if (!_id) {
            const error = new Error("Meeting id is missing!");
            error.status = 400;
            throw error;
        }

        const meeting = await Meeting.findOne({_id: _id}).exec();
        res.status(200).json(meeting);

    } catch(error) {
        next(error);
    }
};

const addNewMeating = async () => {
    const {_title, _description, _day, 
        _month, _year, _time, _members} = req.body;

    try {
        if (!_title || !description || !_day, 
            !_month || !_year || !_time || !_members) {
                const error = new Error("Missing information for new meeting!");
                error.status = 400;
                throw error;
        }
        const newMeeting = new Meeting({
            _id: mongoose.Types.ObjectId(),
            title: _title,
            description: _description,
            day: _day,
            month: _month,
            year: _year,
            time: _time,
            members: _members
        });

        await newBook.save();
        res.status(200).json(newMeeting);
    } catch(error) {
        next(error);
    }
};

const deleteMeeting = async () => {
    const _id= req.params.id;

    try {
        if (!_id) {
            const error = new Error("Meeting id is missing!");
            error.status = 400;
            throw error;
        }

        const meeting = await Book.deleteOne({_id: _id}).exec();

        if(meeting.deletedCount == 1) {
            res.status(200).json({success: true});
        } else {
            res.status(404).json();
        }
    
        await meetingService.deleteMeeting(id);
        res.status(200).json();

    } catch(error) {
        next(error);
    }
};

module.exports = {
    getMeetingById,
    addNewMeating,
    deleteMeeting
};
