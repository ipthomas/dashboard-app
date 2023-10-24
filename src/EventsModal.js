import React, { useState, useEffect } from 'react';

function EventsModal({ pathway, nhs, version, onClose, serverUrl }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const formatToLocalUKTime = (dateString) => {
        if (dateString === "" || dateString === "0001-01-01T00:00:00Z" || dateString === "0001-01-01 00:00:00 +0000 UTC") {
            return ""; // Return an empty string
        }

        try {
            const date = new Date(dateString);
            const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getUTCDay()];
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            const formattedDate = date.toLocaleString('en-GB', options);
            return dayOfWeek + " " + formattedDate;
        } catch (error) {
            console.error('Error formatting date:', error);
            return "";
        }
    };
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(serverUrl + `api/state/events?user=ian.thomas&org=tiani-spirit&role=clinical&pathway=${pathway}&nhs=${nhs}&vers=${version}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setEvents(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [pathway, nhs, version, serverUrl]);

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">
                    {loading ? (
                        <p>Loading tasks...</p>
                    ) : (
                    <table className='modal-table'>
                            <thead>
                                <tr>
                                    <th colSpan={12}>NHS ID {nhs} {pathway} Workflow Events</th>
                                </tr>
                                <tr>
                                    <th>Event ID</th>
                                    <th>Event Time</th>
                                    <th>Event Type</th>
                                    <th>Task ID</th>
                                    <th>Content Published</th>
                                    <th>Author</th>
                                    <th>Organisation</th>
                                    <th>Role</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                               {events.events.map((event) => (
                                   event.comments !== 'None' && event.id > 0? (
                                    <tr key={event.id}>
                                        <td>{event.id}</td>
                                        <td>{formatToLocalUKTime(event.creationtime)}</td>
                                        <td>{event.eventtype}</td>
                                        <td>{event.taskid}</td>
                                        <td>{event.expression}</td>
                                        <td>{event.authors}</td>
                                        <td>{event.org}</td>
                                        <td>{event.role}</td>
                                        <td>{event.comments}</td>
                                    </tr>
                                   ) : null
                                ))}
                            </tbody>
                        </table>                   
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventsModal;
