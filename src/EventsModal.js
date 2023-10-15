import React, { useState, useEffect } from 'react';

function EventsModal({ pathway, nhs, version, onClose }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://localhost:8080/api/state/events?user=ian.thomas&org=tiani-spirit&role=clinical&pathway=${pathway}&nhs=${nhs}&vers=${version}`);
                const response = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/events?user=ian.thomas&org=tiani-spirit&role=clinical&pathway=${pathway}&nhs=${nhs}&vers=${version}`);
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
    }, [pathway, nhs, version]);

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
                                    <th>ID</th>
                                    <th>Event Time</th>
                                    <th>Task</th>
                                    <th>Author</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                               {events.events.map((event) => (
                                   event.comments !== 'None' && event.id > 0? (
                                    <tr key={event.id}>
                                        <td>{event.id}</td>
                                        <td>{event.creationtime}</td>
                                        <td>{event.expression}</td>
                                        <td>{event.authors}</td>
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
