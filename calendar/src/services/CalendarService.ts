import CalendarModel, { DayMeeting } from '../models/Calendar';
import BaseService from './BaseService';

const CalendarService = () => {
    const baseUrl = 'http://localhost:5000/meetings/';
    
    const getAllMeetings = (): Promise<CalendarModel> => {
        return BaseService.get<CalendarModel>(baseUrl);
    };

    const getMeetingById = (id: String): Promise<DayMeeting> => {
        return BaseService.get<DayMeeting>(baseUrl + id);
    };

    const saveMeeting = (meeting: DayMeeting) => {
        return BaseService.post<DayMeeting>(baseUrl, meeting);
    };

    const deleteMeeting = (id: string) => {
        return BaseService.delete(baseUrl + id);
    };

    return { getAllMeetings, getMeetingById, saveMeeting, deleteMeeting};
};

export default CalendarService();
