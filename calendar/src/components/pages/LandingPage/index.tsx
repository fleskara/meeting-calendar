import { useEffect, useState } from "react";
import CalendarModel, { DayMeeting } from "../../../models/Calendar";
import CalendarService from "../../../services/CalendarService";
import DayCell from "../../DayCell";
import "../../../styles/landingPage.scss";

const LandingPage = () => {
    const [meetings, setMeetings] = useState<CalendarModel>([]);
    const service = CalendarService;

    const numberOfDaysInSixWeeks = 6*7;
    const daysInWeek = 7;

    const firstInTheMonth = 5;
    const emptyDaysBegin = Array.from(
        Array(firstInTheMonth - 1).keys())
        .map(x => 0);

    const numberOfDaysInMonth = 31;
    const daysInMonths = Array.from(
        Array(numberOfDaysInMonth).keys())
        .map(x => x + 1);

    const emptyDaysEnd = Array.from(
        Array(numberOfDaysInSixWeeks - (numberOfDaysInMonth + firstInTheMonth - 1)).keys())
        .map(x => 0);
    
    const sliceArray = (arr: number[], chunkSize: number) => {
        const res = [];
        for (let i = 0; i < arr.length; i+= chunkSize) {
            const chunk = arr.slice(i, i+ chunkSize);
            res.push(chunk);
        }
        return res;
    };

    const daysInMonthArray = emptyDaysBegin.concat(daysInMonths.concat(emptyDaysEnd));
    const daysInMonthMatrix = sliceArray(daysInMonthArray, daysInWeek);
    
    const loadMeetings = () => {
        service.getAllMeetings().then(setMeetings);
    };

    const renderCalendar = () => {
        const getMeetingsByDay = (day: number): DayMeeting[] => {
            return meetings.filter((meeting) => meeting?.day === day);
        }

        return <div className="landing-page">
            <h2>July 2022</h2>
            <table>
                <thead>
                    <tr>
                        <td>MON</td>
                        <td>TUE</td>
                        <td>WED</td>
                        <td>THU</td>
                        <td>FRI</td>
                        <td>SAT</td>
                        <td>SUN</td>
                    </tr>
                </thead>
                <tbody>
                    {daysInMonthMatrix.map((week, index) => (
                        <tr key={index}>
                        {week.map((day, index) => (
                            <td key={index}>
                                <DayCell key={index} day={day} meetings={getMeetingsByDay(day)} reloadNeeded={loadMeetings}/>
                            </td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    }  

    useEffect(() => {
        loadMeetings();
    }, []);

    return <div>{renderCalendar()}</div>
};

export default LandingPage;
