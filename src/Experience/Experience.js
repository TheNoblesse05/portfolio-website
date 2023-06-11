import React, { useState } from "react";
import './experience.css'
import logo1 from  '../assets/Aruba-rlogo.png'
import logo2 from '../assets/cloudesign-rlogo.png'
import CompanyDetails from "./ExperienceDetails/CompanyDetails";

export default function Experience({backgroundC, colorSelection, colorCombinations}) {

    const [companyID, setCompanyID] = useState('0')

    const changeCompany = (index) => {
        setCompanyID(index)
    }

    
    let mainStyle = '#f0f0f0'
    return(
        <div className='experience-main-container' style={{background: `${colorCombinations[colorSelection][2]}26`}}>
            <div className='experience-header' style={{color: colorCombinations[colorSelection][3]}}>
                Experience
            </div>
            <div className='experience-text'>
                <div className='experience-desc'>
                    <div className='company-detail'>
                        <CompanyDetails companyID={companyID} colorSelection={colorSelection} colorCombinations={colorCombinations} /> 
                        <div className="experience-footer">
                            <a>
                                <img src={logo1} onClick={() => changeCompany('0')} className={'logo-img'} style = {companyID=='0' ? {background: `linear-gradient(0deg, ${colorCombinations[colorSelection][3]}, transparent, transparent, transparent)`} : {}} alt='Aruba' />
                            </a>
                            <div className='small-line' />
                            <a>
                                {
                                    <img src={logo2} onClick={() => changeCompany('1')} className='logo-img' style = {companyID=='1' ? {background: `linear-gradient(0deg, ${colorCombinations[colorSelection][3]}, transparent, transparent, transparent)`} : {}} alt='Cloudesign' />
                                }
                            </a>
                        </div>
                    </div>
                    <div className='company-detail-mob'>
                        <ul>
                            <li>
                                <p>
                                Fullstack Developer @
                                </p>
                                <a href="https://www.arubanetworks.com/en-in/" target="_blank" className='experience-company-title'>
                                <span className='underline-animation'> HPE Aruba Networking</span>
                                </a>
                                <h3 className='duration'>(2021 - Present)</h3>
                            </li>
                            <li>
                                <p>
                                    Backend Intern @
                                </p>
                                <a href="https://www.cloudesign.com/" target="_blank" className= 'experience-company-title'>
                                    <span className='underline-animation'> Cloudesign</span>
                                </a>
                                <h3 className='duration'>(2019 | May - July)</h3>
                            </li>
                        </ul>
                    </div>
                    <div className='coffee-machine'>
                        <div className="main-container-coffee">
                            <div className="coffee-header">
                                <div className="coffee-header__buttons coffee-header__button-one"></div>
                                <div className="coffee-header__buttons coffee-header__button-two"></div>
                                <div className="coffee-header__display"></div>
                                <div className="coffee-header__details"></div>
                            </div>
                            <div className="coffee-medium">
                                <div className="coffe-medium__exit"></div>
                                <div className="coffee-medium__arm"></div>
                                <div className="coffee-medium__liquid"></div>
                                <div className="coffee-medium__smoke coffee-medium__smoke-one"></div>
                                <div className="coffee-medium__smoke coffee-medium__smoke-two"></div>
                                <div className="coffee-medium__smoke coffee-medium__smoke-three"></div>
                                <div className="coffee-medium__smoke coffee-medium__smoke-for"></div>
                                <div className="coffee-medium__cup"></div>
                            </div>
                            <div className="coffee-footer"></div>
                        </div>
                    </div>
                    
                </div>
            </div>         
        </div>
    )
}