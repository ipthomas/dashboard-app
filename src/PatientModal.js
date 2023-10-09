import React, { useState, useEffect } from 'react';

function PatientModal({ nhs, onClose }) {
    const [patient, setPatient] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/patient?user=ian.thomas&org=tiani-spirit&role=clinical&nhs=${nhs}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)

                const result = await response.json();
                setPatient(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    },[nhs]);

    return (
        <div className="modal-overlay">
            <div className="modal">
                {loading ? (
                    <p>  Loading Data from Patient Sources...</p>
                ) : (
                <>
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                    <h3>Patient Details</h3>
                </div>
                <div className="modal-content">
                    <table>
                        
                        <tbody>
                            
                                
                                {patient.CGL.data.client.basicDetails.nhsNumber === nhs ?
                                    (
                                        <>
                                        <tr>
                                            <th colSpan={14} className='escalated-false'>CGL Patient Record</th>
                                        </tr>
                                        <tr>
                                            <th>NHS ID</th>
                                            <th>Source PID</th>
                                            <th colSpan={2}>Name</th>
                                            <th>D.O.B</th>
                                            <th>Gender</th>
                                            <th colSpan={7}>Address</th>
                                        </tr>
                                        <tr>
                                            <td>{patient.CGL.data.client.basicDetails.nhsNumber}</td>
                                            <td>{patient.CGL.data.client.basicDetails.localIdentifier}</td>
                                            <td colSpan={2}>{patient.CGL.data.client.basicDetails.name.given} {patient.CGL.data.client.basicDetails.name.family}</td>
                                            <td>{patient.CGL.data.client.basicDetails.birthDate}</td>
                                            <td>{patient.CGL.data.client.basicDetails.sexAtBirth}</td>
                                            <td colSpan={7}>{patient.CGL.data.client.basicDetails.address.addressLine1} {patient.CGL.data.client.basicDetails.address.addressLine2} {patient.CGL.data.client.basicDetails.address.addressLine3} {patient.CGL.data.client.basicDetails.address.postCode}</td>
                                        </tr>
                                        <tr>
                                            <th colSpan={2}>Disability</th>
                                            <th colSpan={2}>Key Worker</th>
                                            <th>ID</th>
                                            <th>Tel</th>
                                            <th>Last Appointment</th>
                                            <th>Last Face to Face</th>
                                            <th>Next Appointment</th>
                                            <th>BVC Tested</th>
                                            <th>HIV Positive</th>
                                            <th>HepC Result</th>
                                            <th>Hepc Test Date</th>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>{patient.CGL.data.client.basicDetails.disability}</td>
                                            <td colSpan={2}>{patient.CGL.data.keyWorker.name.given} {patient.CGL.data.keyWorker.name.family}</td>
                                            <td>{patient.CGL.data.keyWorker.localIdentifier}</td>
                                            <td>{patient.CGL.data.keyWorker.telecom}</td>
                                            <td>{patient.CGL.data.client.basicDetails.lastEngagementByCGLDate}</td>
                                            <td>{patient.CGL.data.client.basicDetails.lastFaceToFaceEngagementDate}</td>
                                            <td>{patient.CGL.data.client.basicDetails.nextCGLAppointmentDate}</td>
                                            <td>{patient.CGL.data.client.bbvInformation.bbvTested}</td>
                                            <td>{patient.CGL.data.client.bbvInformation.hivPositive}</td>
                                            <td>{patient.CGL.data.client.bbvInformation.hepCResult}</td>
                                            <td>{patient.CGL.data.client.bbvInformation.hepCLastTestDate}</td>
                                        </tr>
                                        <tr>
                                            <th colSpan={2}>Risk to Adults</th>
                                            <th>Risk to Children</th>
                                            <th>Risk to Self</th>
                                            <th>Risk from Others</th>
                                            <th>Last Review</th>
                                            <th>Attempted Suicide</th>
                                            <th>Mental Health Diagnosis</th>
                                            <th>Mental Health Admissions</th>
                                            <th>Medications Non Compliance</th>
                                            <th>Homeless NFA</th>
                                            <th>Housing at Risk</th>
                                            <th>Socially Isolated</th>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>{patient.CGL.data.client.safeguardingInformation.riskToAdults}</td>
                                            <td>{patient.CGL.data.client.safeguardingInformation.riskToChildrenOrYP}</td>
                                            <td>{patient.CGL.data.client.safeguardingInformation.riskToSelf}</td>
                                            <td>{patient.CGL.data.client.safeguardingInformation.riskHarmFromOthers}</td>
                                            <td>{patient.CGL.data.client.safeguardingInformation.lastReviewDate}</td>
                                            <td>{patient.CGL.data.client.riskInformation.mentalHealthDomain.attemptedSuicide}</td>
                                            <td>{patient.CGL.data.client.riskInformation.mentalHealthDomain.diagnosedMentalHealthCondition}</td>
                                            <td>{patient.CGL.data.client.riskInformation.mentalHealthDomain.hospitalAdmissionsForMentalHealth}</td>
                                            <td>{patient.CGL.data.client.riskInformation.mentalHealthDomain.notTakingPrescribedMedicationAsInstructed}</td>
                                            <td>{patient.CGL.data.client.riskInformation.socialDomain.homelessRoughSleepingNFA}</td>
                                            <td>{patient.CGL.data.client.riskInformation.socialDomain.housingAtRisk}</td>
                                            <td>{patient.CGL.data.client.riskInformation.socialDomain.sociallyIsolatedNoSupport}</td>
                                        </tr>
                                        <tr>
                                            <th colSpan={2}>Injecting</th>
                                            <th colSpan={3}>Poly Drug Use</th>
                                            <th colSpan={2}>Previous Overdose</th>
                                            <th colSpan={2}>Crisis Intervention</th>
                                            <th colSpan={3}>Assessed As Not Having Mental Capacity</th>
                                            <th colSpan={2}>Learning Disability</th>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>{patient.CGL.data.client.riskInformation.substanceMisuseDomain.injecting}</td>
                                            <td colSpan={3}>{patient.CGL.data.client.riskInformation.substanceMisuseDomain.polyDrugUse}</td>
                                            <td colSpan={2}>{patient.CGL.data.client.riskInformation.substanceMisuseDomain.previousOverDose}</td>
                                            <td colSpan={2}>{patient.CGL.data.client.riskInformation.mentalHealthDomain.psychiatricOrPreviousCrisisTeamIntervention}</td>
                                            <td colSpan={3}>{patient.CGL.data.client.riskInformation.riskOfHarmToSelfDomain.assessedAsNotHavingMentalCapacity}</td>
                                            <td colSpan={2}>{patient.CGL.data.client.riskInformation.riskOfHarmToSelfDomain.learningDisability}</td>
                                        </tr>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                        <tr>
                                            <th colSpan={14} className='overdue-true'>No CGL Record found</th>
                                        </tr>
                                        </>
                                    )
                                }
                                
                            
                            <tr>
                                {patient.PIX.total > 0 ? 
                                    (
                                        <>
                                        <tr>
                                            <td>{patient.PIX.total}</td>
                                        </tr>
                                        </>
                                    ) 
                                : 
                                    (
                                       <th colSpan={14} className='overdue-true'>No ICB Record found</th>
                                       
                                    )
                                }
                            </tr>
                            <tr>
                                {patient.PDS_Retrieve.id === nhs ?
                                    (
                                        <>
                                        <tr>
                                            <th colSpan={14} className='escalated-false'>PDS Record 
                                                 Confidentiality {patient.PDS_Retrieve.meta.security.map((confcode) => (
                                                    confcode.display
                                                ))}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>NHS ID</th>
                                            <th>Source PID</th>
                                            <th colSpan={2}>Name</th>
                                            <th>Use</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Birth Date</th>
                                            <th>Gender</th>
                                            <th>Multi Birth Indicator</th>
                                            <th>GP Practice</th>
                                            <th colSpan={3}>Deceased</th>
                                        </tr>
                                        <tr>
                                            <td>{patient.PDS_Retrieve.id}</td>
                                            <td>{patient.PDS_Retrieve.id}</td>
                                            {patient.PDS_Retrieve.name.map((item) => (
                                                <td colSpan={2}>
                                                    <>
                                                        {item.prefix.reduce((accumulator, prf) => {
                                                            if (accumulator === '') {
                                                                return prf;
                                                            } else {
                                                                return `${accumulator} ${prf}`;
                                                            }
                                                        }, '')}
                                                        {' '}
                                                        {item.given.reduce((accumulator, fn) => {
                                                            if (accumulator === '') {
                                                                return fn;
                                                            } else {
                                                                return `${accumulator} ${fn}`;
                                                            }
                                                        }, '')}
                                                        {' '}
                                                        {item.family}
                                                        {' '}
                                                        {item.suffix.reduce((accumulator, suf) => {
                                                            if (accumulator === '') {
                                                                return suf;
                                                            } else {
                                                                return `${accumulator} ${suf}`;
                                                            }
                                                        }, '')}
                                                    </>
                                                </td>
                                            ))}
                                            {patient.PDS_Retrieve.name.map((item) => (
                                                <>
                                                <td>{item.use}</td>
                                                <td>{item.period.start}</td>
                                                <td>{item.period.end}</td>
                                                </>
                                            ))}
                                            <td>{patient.PDS_Retrieve.birthDate}</td>
                                            <td>{patient.PDS_Retrieve.gender}</td>
                                            <td>{patient.PDS_Retrieve.multipleBirthInteger}</td>
                                            {patient.PDS_Retrieve.generalPractitioner.map((gp) => (
                                                <td>{gp.identifier.value}</td>
                                            ))}
                                            {patient.PDS_Retrieve.extension.map((extns) => (
                                                extns.url === 'https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-DeathNotificationStatus' ? (
                                                    extns.extension.map((extn) => (
                                                        extn.url === 'deathNotificationStatus' ? (
                                                            extn.valueCodeableConcept.coding.map((code) => (
                                                                <td colSpan={3}>{code.display} {patient.PDS_Retrieve.deceasedDateTime}</td>
                                                            ))
                                                        )
                                                        :
                                                        null
                                                    )))
                                                    :
                                                    null
                                            ))}
                                        </tr>
                                        <tr>
                                            <th>Communication</th>
                                            <th>Interpreter Required</th>
                                            <th>Preferred Format</th>
                                            <th>Preferred Method</th>
                                            <th>Preferred Times</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th colSpan={4}>Other</th>
                                            <th>Pharmacy</th>
                                            <th>Dispenser</th>
                                            <th>Appliance Supplier</th>
                                        </tr>
                                        <tr>
                                            {patient.PDS_Retrieve.extension.map((extns) => (
                                                extns.url === 'https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-NHSCommunication' ? (
                                                    extns.extension.map((extn) => (
                                                        extn.url === 'language' ? (
                                                            extn.valueCodeableConcept.coding.map((code) => (
                                                                <td>{code.display}</td>
                                                            ))
                                                        )
                                                            :
                                                            extn.url === 'interpreterRequired' ? (
                                                                <td>{extn.valueBoolean.toString()}</td>
                                                            )
                                                                :
                                                                null
                                                    )))
                                                    :
                                                    null
                                            ))}
                                            {patient.PDS_Retrieve.extension.map((extns) => (
                                                extns.url === 'https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-ContactPreference' ? (
                                                    extns.extension.map((extn) => (
                                                        extn.url === 'PreferredWrittenCommunicationFormat' ? (
                                                            extn.valueCodeableConcept.coding.map((code) => (
                                                                <td>{code.display}</td>
                                                            ))
                                                        )
                                                            :
                                                            extn.url === 'PreferredContactMethod' ? (
                                                                extn.valueCodeableConcept.coding.map((code) => (
                                                                    <td>{code.display}</td>
                                                                ))
                                                            )
                                                                :
                                                                extn.url === 'PreferredContactTimes' ? (
                                                                    <td>{extn.valueString}</td>
                                                                )
                                                                    :
                                                                    null
                                                    )))
                                                    :
                                                    null
                                            ))}
                                            {patient.PDS_Retrieve.telecom.map((tcom) => (
                                                tcom.system === "other" ? (
                                                    tcom.extension.map((extn) => (
                                                        <>
                                                        <td colSpan={4}>
                                                        <tr>
                                                        {tcom.value} {' '} 
                                                        {extn.valueCoding.display}
                                                        </tr>
                                                        </td>
                                                        </>
                                                    ))
                                                    ) :
                                                    <>
                                                        <td>
                                                        <tr>
                                                        {tcom.value}
                                                        </tr>
                                                        </td>
                                                    </>
                                            ))}
                                            {patient.PDS_Retrieve.extension.map((extn) => (
                                                extn.url === "https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-NominatedPharmacy" ? 
                                                (
                                                    <td>{extn.valueReference.identifier.value}</td>
                                                ) :
                                                null
                                            ))}
                                            {patient.PDS_Retrieve.extension.map((extn) => (
                                                extn.url === "https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-PreferredDispenserOrganization" ?
                                                    (
                                                        <td>{extn.valueReference.identifier.value}</td>
                                                    ) :
                                                    null
                                            ))}
                                            {patient.PDS_Retrieve.extension.map((extn) => (
                                                extn.url === "https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-MedicalApplianceSupplier" ?
                                                    (
                                                        <td>{extn.valueReference.identifier.value}</td>
                                                    ) :
                                                    null
                                            ))}
                                        </tr>
                                        <tr>
                                            <th colSpan={5}>Address</th>
                                            <th>ZIP</th>
                                            <th>From</th>
                                            <th colSpan={2}>To</th>
                                            <th colSpan={3}>Use</th>
                                            <th>PAF</th>
                                            <th>UPRN</th>
                                        </tr>
                                        {patient.PDS_Retrieve.address.map((addrline) => (
                                            <tr>
                                                <td colSpan={5}>
                                                    {addrline.line.reduce((accumulator, ln) => {
                                                        if (accumulator === '') {
                                                            return ln;
                                                        } else {
                                                            return `${accumulator} ${ln}`;
                                                        }
                                                    }, '')}
                                                </td>
                                                <td>{addrline.postalCode}</td>
                                                <td>{addrline.period.start}</td>
                                                <td colSpan={2}>{addrline.period.end}</td>
                                                <td colSpan={3}>{addrline.use} {addrline.text}</td>
                                                {addrline.extension.map((extns) => (
                                                    extns.extension.map((extn) => (
                                                        extn.url === "value" ?
                                                            (<td>{extn.valueString}</td>)
                                                            :
                                                            null
                                                    ))
                                                ))}
                                            </tr>
                                        ))}
                                        </>
                                    )
                                    :
                                    (
                                    
                                            <th colSpan={14} className='overdue-true'>No PDS Record found</th>
                                    )
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
                </>
                )}           
            </div>
        </div>
    );
}

export default PatientModal;
