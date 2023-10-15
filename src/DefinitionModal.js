import React, { useState, useEffect } from 'react';

function DefinitionModal({ pathway, onClose }) {
    const [definition, setDefinition] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://flocalhost|:8080/api/state/definition?user=ian.thomas&org=tiani-spirit&role=clinical&pathway=${pathway}`);
                const response = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/definition?user=ian.thomas&org=tiani-spirit&role=clinical&pathway=${pathway}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)

                const result = await response.json();
                setDefinition(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [pathway]);

    return (
        <div className="modal-overlay">
            <div className="modal">
                {loading ? (
                    <p>Loading Definition...</p>
                ) : (
                <>
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                    <h3>{definition.name} Workflow Definition</h3>
                </div>
                <div className="modal-content">
                    <table>
                        <tr>
                            <th>Confidentiality</th>
                            <th>Start By</th>
                            <th>Complete By</th>
                            <th>Escalate </th>
                            <th>Completion Condition</th>
                            <th>Or</th>
                        </tr>
                        <tbody>
                            <tr>
                                <td>{definition.confidentialitycode}</td>
                                <td>{definition.startbytime}</td>
                                <td>{definition.completebytime}</td>
                                <td>{definition.expirationtime}</td>
                                {definition.completionBehavior.map((behaviour) => (
                                    <td> {behaviour.completion.condition} </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <h3>Task Definitions</h3>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Start By</th>
                            <th>Complete By</th>
                            <th>Escalate </th>
                            <th>Completion Condition</th>
                            <th>Or</th>
                        </tr>
                        <tbody>
                            {definition.tasks.map((task) => (   
                            <tr>
                                <td>{task.id}</td>
                                <td>{task.name}</td>
                                <td>{task.startbytime}</td>
                                <td>{task.completebytime}</td>
                                <td>{task.expirationtime}</td>
                                {task.completionBehavior.map((behaviour) => (
                                    <td> {behaviour.completion.condition} </td>
                                ))}
                            </tr>
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

export default DefinitionModal;
