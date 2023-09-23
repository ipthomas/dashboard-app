import React, { useState, useEffect } from 'react';

function Modal({ pathway, nhs, onClose }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data based on the pathway value
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/state/tasks/status?user=ian.thomas&org=tiani-spirit&role=clinical&pathway=${pathway}&nhs=${nhs}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log(result)
                setTasks(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [pathway, nhs]); // Fetch data whenever pathway changes

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>NHS ID {nhs} {pathway} Workflow Tasks State</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">
                    <p>Tasks</p>
                    {loading ? (
                        <p>Loading tasks...</p>
                    ) : (
                        <table>
                            <thead>
                                {/* Define your table header */}
                                <tr>
                                    <th>Task</th>
                                    <th>Status</th>
                                    <th>Complete Task By</th>
                                    <th>Started On</th>
                                    <th>Completed On</th>
                                    <th>Duration</th>
                                    <th>Owner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.taskstate.map((task) => (
                                    <tr key={task.taskid}>
                                        <td>{task.taskid}</td>
                                        <td>{task.status}</td>
                                        <td>{task.completeby}</td>
                                        <td>{task.startedon}</td>
                                        <td>{task.completedon}</td>
                                        <td>{task.duration}</td>
                                        <td>{task.owner}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
