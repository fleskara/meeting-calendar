import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DayMeeting } from "../../models/Calendar";
import "../../styles/meeting.scss"

type Props = {
    meeting: DayMeeting;
}

const DailyMeeting: React.FC<Props> = ({ meeting }) => {
    
    return <Link to={`/sastanak/${meeting._id}`}>
        <div className="meeting">{meeting.title}</div>
    </Link>
};

export default DailyMeeting;
