import React from "react";

export default function CompanyDetails({companyID, colorSelection, colorCombinations}) {
    return(
        <>
            {/* Aruba */}
            { companyID == '0' && 
                <>
                    <div className='experience-title'>
                        <h3 className='duration'>2021 - Present</h3>
                        <div>
                            <p>
                                Fullstack Developer @
                            </p>
                            <a href="https://www.arubanetworks.com/en-in/" target="_blank" className='experience-company-title'>
                            <span className='underline-animation'> HPE Aruba Networking</span>
                            </a>
                            
                        </div>
                    </div>
                    <div className="experience-accomplishments">
                        Aruba is the global leader in wired, wireless, and SD-WAN solutions that use AI to automate and secure the network from edge-to-cloud.
                        <ul>
                            <li><div>I build & maintain their cloud-based networking solution website - Aruba Central</div></li>
                            <li><div>Built a ChatGPT model to generate answers to users' networking queries</div></li>
                            <li><div>Worked on a BERT sementic search classifier</div></li>
                        </ul> 
                    </div>
                </>
            }

            {/* Cloudesign */}
            { companyID == '1' &&
                <>
                    <div className='experience-title'>
                        <h3 className='duration'>2019 | May - July</h3>
                        <div>
                            <p>
                                Backend Intern @
                            </p>
                            <a href="https://www.cloudesign.com/" target="_blank" className= 'experience-company-title'>
                                <span className='underline-animation'> Cloudesign</span>
                            </a>
                            
                        </div>
                    </div>
                    <div className="experience-accomplishments">
                        Cloudesign is a global IT Consulting, IT Outsourcing and Software Engineering firm in Mumbai.
                        <ul>
                            <li><div>Made an Attendance Bot on Slack</div></li>
                            <li><div>Graphically presented reports and analytics</div></li>
                        </ul> 
                    </div>
                </>
            }
        </>
    )
}