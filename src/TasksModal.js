import React, { useState, useEffect } from 'react';

function TasksModal({ pathway, nhs, onClose }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/tasks/status?user=ian.thomas&org=tiani-spirit&role=clinical&pathway=${pathway}&nhs=${nhs}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setTasks(result);
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
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                    <h3>NHS ID {nhs} {pathway} Workflow Tasks State</h3>
                </div>
                <div className="modal-content">
                    {loading ? (
                        <p>Loading tasks...</p>
                    ) : (
                        <table className='modal-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Task</th>
                                    <th>Status</th>
                                    <th>Owner</th>
                                    <th>Complete Task By</th>
                                    <th>Started On</th>
                                    <th>Completed On</th>
                                    <th>Duration</th>
                                    <th>On Target</th>
                                    <th>Escalated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.taskstate.map((task) => (                                   
                                    <tr key={task.taskid}>
                                        <td className={task.targetmet ? 'escalated-false' : 'overdue-true'}>
                                            {task.taskid}
                                        </td>
                                        <td className={task.targetmet ? 'escalated-false' : 'overdue-true'}>
                                            {task.name}
                                        </td>
                                        <td>{task.status}</td>
                                        <td>{task.owner}</td>
                                        <td>{task.completeby}</td>
                                        <td>{task.startedon}</td>
                                        <td>{task.completedon}</td>
                                        <td>{task.duration}</td>
                                        <td className={task.targetmet ? 'escalated-false' : 'overdue-true'}>
                                            {task.targetmet.toString()}
                                        </td>
                                        <td className={task.escalated ? 'escalated-true' : 'escalated-false'}>
                                            {task.escalated.toString()}
                                        </td>
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

export default TasksModal;
