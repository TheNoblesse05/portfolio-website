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
                            <li><div>I build & maintain their cloud-based networking solution website - Aruba Central.</div></li>
                            <li><div>Designed and implemented a high-volume search bar that processes over 9,000+ monthly queries, delivering user device information, relevant in-page navigation, and summarized documentation with citations using Large Language Models (LLMs).</div></li>
                            <li><div>Integrated Captive Portals for seamless client authentication within Aruba Central while strategically executing and optimizing data flows for enhanced user authentication and access control functions across various cloud providers (Google Azure, AWS and Okta).</div></li>
                            <li><div>Led the migration of containerized applications from x86 to ARM processors.</div></li>
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
                            <li><div>Developed an Attendance Bot on Slack streamlining attendance and tracking and managing the process for the team.</div></li>
                            <li><div>Utilized the ELK Stack to automate the generation of visually enriched reports and analytics for the client, enhancing visualization and streamlining data processing.</div></li>
                        </ul> 
                    </div>
                </>
            }
        </>
    )
}