import React, { useState, useEffect } from 'react';

function EventsModal({ pathway, nhs, onClose }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/events?vers=1&user=ian.thomas&org=tiani-spirit&role=clinical&vers=1&pathway=${pathway}&nhs=${nhs}`);
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
    }, [pathway, nhs]);

    return (
        <div className="modal-overlay">
            <div className="modal">
                {loading ? (
                    <p>Loading events...</p>
                ) : (
                <>
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                    <h3>NHS ID {nhs} {pathway} Workflow Events</h3>
                </div>
                <div className="modal-content">
                    <table className='modal-table'>
                            <thead>
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
                </div>
                </>
                )}
            </div>
        </div>
    );
}

export default EventsModal;
