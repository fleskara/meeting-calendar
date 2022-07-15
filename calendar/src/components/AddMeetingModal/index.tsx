import React, { ChangeEvent, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { DayMeeting, Member } from '../../models/Calendar';
import CalendarService from '../../services/CalendarService';
import "../../styles/addMeetingModal.scss"

type Props = {
    day: number;
    onClose: () => void;
    onSave: () => void;
}

const ModalDialog: React.FC<Props> = ({ day, onClose, onSave}) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [formErrors, setFormErrors] = useState<any>({});
    const [meeting, setMeeting] = useState<DayMeeting>({
        title: "",
        description: "",
        day: day,
        month: 7,
        year: 2022,
        time: "",
        membersIds: []
    });

    const domRoot = document.getElementById('modals');
    const modalRoot = document.createElement('div');

    const isValidForm = (): boolean => {
        let hasError = false;
        const errors: any = {};

        if (!meeting.title) {
            hasError = true;
            errors.title = "Title is mandatory field.";
        }

        if (!meeting.description) {
            hasError = true;
            errors.description = "Description is mandatory field.";
        }

        if (!meeting.time) {
            hasError = true;
            errors.time = "Time is mandatory field.";
        }

        if (meeting.membersIds?.length === 0) {
            hasError = true;
            errors.members = "At least one member must be selected.";
        }

        setFormErrors(errors);

        return !hasError;
    }

    const handleSave = () => {
        if (isValidForm()) {
            CalendarService.saveMeeting(meeting).then(onSave);
        }
    }

    const handleSelectMember = (event: ChangeEvent<HTMLSelectElement>) => {
        setMeeting((prev) => ({ ...prev, membersIds: Array.from(event.target.selectedOptions, (option) => option.value)}));
        console.log(meeting.membersIds);
        
    };

    useEffect(() => {
        domRoot && domRoot.appendChild(modalRoot);

        return () => {
            domRoot && domRoot.removeChild(modalRoot);
        };
    }, [domRoot, modalRoot]);

    useEffect(() => {
        //MembersService.get().then(setMembers);
        setMembers([
            { id: "john", firstName: "John", lastName: "Mayer"},
            { id: "ice", firstName: "Ice", lastName: "Cube"},
            { id: "bob", firstName: "Bob", lastName: "Marley"},
            { id: "dio", firstName: "Ronnie", lastName: "James"},
            { id: "ozzy", firstName: "Ozzy", lastName: "Osbourne"}
        ]);
    }, [])  
    
    const modal = () => {
        return <div className='add-meeting'>
            <div className='add-meeting-modal'>
                <header className='meeting-modal-header'><h1>Add new meeting</h1></header>
                <main className='meeting-modal-main'>
                    <div>
                        <span>Title:</span>
                        <div className='input-field'>
                            <input onChange={(event) => {
                                setMeeting((prev) => ({ ...prev, title: event.target.value}));
                            }}/>
                            <label className='error-label'>{formErrors.title}</label>
                        </div>
                    </div>
                    <div>
                        <span>Description:</span>
                        <div className='input-field'>
                            <input onChange={(event) => {
                                setMeeting((prev) => ({...prev, description: event.target.value}));
                            }}/>
                            <label className='error-label'>{formErrors.description}</label>
                        </div>
                    </div>
                    <div>
                        <span>Time:</span>
                        <div className='input-field'>
                            <input onChange={(event) => {
                                setMeeting((prev) => ({...prev, time: event.target.value}));
                            }}/>
                            <label className='error-label'>{formErrors.time}</label>
                        </div>
                    </div>
                    <div>
                        <span>Members:</span>
                        <div className='input-field'>
                            <select className='multiselect' multiple={true} onChange={handleSelectMember}>
                                {members.map((member, index) => {
                                    return <option key={index} value={member.id}>{member.firstName} {member.lastName}</option>
                                })}
                            </select>
                            <label className='error-label'>{formErrors.members}</label>
                        </div>
                    </div>
                </main>
                <footer className='meeting-modal-footer'>
                    <button className='closeButton' onClick={onClose}>Close</button>
                    <button className='saveButton' onClick={handleSave}>Save</button>
                </footer>
            </div>
        </div>
    };

    return ReactDom.createPortal(modal(), domRoot!);
};

export default ModalDialog;
