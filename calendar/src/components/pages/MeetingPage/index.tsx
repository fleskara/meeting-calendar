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
        CalendarService.deleteMeeting(id || '').then(() => navigate(-1));
    }

    useEffect(() => {
        CalendarService.getMeetingById(id || '').then((responese: any) => {
            setMeeting({...responese, membersIds: responese.members})
        });
    }, []);
    
    return  <div className="meeting-page">
        <div className="meeting-info">
        <header className="meeting-modal-header">
            <h2>{meeting?.title}</h2>
        </header>
        <main>
            <p>Desctiption: {meeting?.description}</p>
            <p>Time: {meeting?.time}</p>
            <p>Participants: </p>
            <ul>
                {meeting?.membersIds?.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
        </main>
        <footer className="meeting-modal-footer">
            <button className="deleteButton" onClick={deleteCurrentMeeting}>Delete meeting</button>
        </footer>
        </div>
    </div>
};

export default MeetingPage;
