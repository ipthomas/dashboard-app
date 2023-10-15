import React, { useState, useEffect } from 'react';

function TasksModal({ pathway, nhs, version, onClose }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://localhost:8080/api/state/tasks/status?user=ian.thomas&org=tiani-spirit&role=clinical&pathway=${pathway}&nhs=${nhs}&vers=${version}`);
                const response = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/tasks/status?user=ian.thomas&org=tiani-spirit&role=clinical&pathway=${pathway}&nhs=${nhs}&vers=${version}`);
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
    }, [pathway, nhs, version]);
    const formatToLocalUKTime = (dateString) => {
        // Check if the dateString is "Invalid Date" or "0001-01-01 00:00:00 +0000 UTC"
        if (dateString === "" || dateString === "0001-01-01 00:00:00 +0000 UTC") {
            return ""; // Return an empty string
        }

        try {
            // Define a regular expression to match the parts of the date string
            const regex = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+\-\d]{5}) (.+)/;
            const match = dateString.match(regex);

            if (match) {
                const yearMonthDay = match[1];
                const time = match[2];
                const offset = match[3];

                // Construct a new date string with the parts rearranged in a format that can be parsed by Date
                const newDateString = `${yearMonthDay}T${time}${offset}`;

                // Parse the new date string into a JavaScript Date object
                const date = new Date(newDateString);

                // Format the date to the desired format
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                };

                const formattedDate = date.toLocaleString('en-GB', options);
                return formattedDate;
            }
        } catch (error) {
            console.error('Error formatting date:', error);
        }

        return ""; // Return an empty string in case of errors
    };  
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
                                    <th colSpan={12}>NHS ID {nhs} {pathway} Workflow Tasks State</th>
                                </tr>
                                <tr>
                                    <th>ID</th>
                                    <th>Task</th>
                                    <th>On Target</th>
                                    <th>Escalated</th>
                                    <th>Status</th>
                                    <th>Owner</th>
                                    <th>Start Task By</th>
                                    <th>Complete Task By</th>
                                    <th>Escalate Task On</th>
                                    <th>Started On</th>
                                    <th>Completed On</th>
                                    <th>Duration</th>
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
                                        <td className={task.targetmet ? 'escalated-false' : 'overdue-true'}>
                                            {task.targetmet.toString()}
                                        </td>
                                        <td className={task.escalated ? 'escalated-true' : 'escalated-false'}>
                                            {task.escalated.toString()}
                                        </td>
                                        <td>{task.status}</td>
                                        <td>{task.owner}</td>
                                        <td>{formatToLocalUKTime(task.startby)}</td>
                                        <td>{formatToLocalUKTime(task.completeby)}</td>
                                        <td>{formatToLocalUKTime(task.escalateon)}</td>
                                        <td>{formatToLocalUKTime(task.startedon)}</td>
                                        <td>{formatToLocalUKTime(task.completedon)}</td>
                                        <td>{task.duration}</td>
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
