import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DayMeeting } from "../../../models/Calendar";
import CalendarService from "../../../services/CalendarService";
import "../../../styles/meetingPage.scss";

const MeetingPage = () => {
    const [meeting, setMeeting] = useState<DayMeeting>();

    const { id } = useParams();
    const navigate = useNavigate();
    
    const deleteCurrentMeeting = () => {
        CalendarService.deleteMeeting(id!).then(() => navigate(-1));
    }

    useEffect(() => {
        CalendarService.getMeetingById(id!).then(setMeeting);
    }, []);

    return  <div className="meeting-page">
        <div className="meeting-info">
        <h2>{meeting?.title}</h2>
        <p>Desctiption: {meeting?.description}</p>
        <p>Time: {meeting?.time}</p>
        <h3>Participants: </h3>
        <ul>
            {meeting?.membersIds?.map((member, index) => (
                <li key={index}>A</li>
            ))}
        </ul>
        <button className="deleteButton" onClick={deleteCurrentMeeting}>Delete meeting</button>
        </div>
    </div>
};

export default MeetingPage;
