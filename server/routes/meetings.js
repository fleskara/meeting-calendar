const express = require('express');
const meetingsController = require('../controllers/meetings');

const router = express.Router();

router.get('/', meetingsController.getAllMeetings);
router.get('/:id', meetingsController.getMeetingById);
router.post('/', meetingsController.addNewMeating);
router.delete('/:id', meetingsController.deleteMeeting);

module.exports = router;
