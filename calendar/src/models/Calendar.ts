export type Member = {
    id: string;
    firstName: string;
    lastName: string;
}

export type DayMeeting = {
    _id?: string;
    title?: string;
    description?: string;
    day?: number;
    month?: number;
    year?: number;
    time?: string;
    membersIds?: string[];
};

type CalendarModel = DayMeeting[];

export default CalendarModel;
