import { useEffect, useState } from "react";
import { DayMeeting } from "../../models/Calendar";
import "../../styles/dayCell.scss"
import AddMeetingModal from "../AddMeetingModal";
import DailyMeeting from "../DailyMeeting";

type Props = {
    day: number;
    meetings?: DayMeeting[];
    reloadNeeded: () => void;
}

const DayCell: React.FC<Props> = ({ day, meetings = [], reloadNeeded}) => {
    const [showAddMeeting, setShowAddMeeting] = useState<boolean>(false);

    const closeModal = () => {
        setShowAddMeeting(false);
    }
    
    const handleSave = () => {
        closeModal();
        reloadNeeded();
    };
    

    if (day === 0) 
        return <div className="day-cell-empty"></div>;

    return <div onDoubleClick={() => setShowAddMeeting(true)} className="day-cell">
            <div className="day-cell-header">{day}</div>
            <ul className="meetings-list">
                {meetings.map((meeting, index) => (
                    <li key={index}><DailyMeeting meeting={meeting}/></li>
                ))}
            </ul>
            {showAddMeeting && 
                <AddMeetingModal day={day} onClose={closeModal} onSave={handleSave} />
            }
    </div>
};

export default DayCell;
