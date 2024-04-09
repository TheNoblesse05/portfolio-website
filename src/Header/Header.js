import React from "react";
import './header.css'
import ReactTooltip from 'react-tooltip';
import mail_light from '../assets/mail_light.svg'
import git_light from '../assets/github_light.svg'
import linkedin_light from '../assets/linkedin_light.svg'
import resume_light from '../assets/resumedocument.svg'
import resume_file from '../assets/resume.pdf'
import ButtonMailto from './MailAction/ButtonMalito'

export default function Header({backgroundC, colorSelection, colorCombinations}) {
    return(
        <div className='header'>
            <div className='icons'>
                <div className='mail' data-tip="Mail">
                    <ButtonMailto email='vedant.tilwani@gmail.com' subject='Hello'>
                    <img src = {mail_light} alt="Mail SVG"/>
                    </ButtonMailto>
                    <ReactTooltip place="right" textColor={colorCombinations[colorSelection][3]} backgroundColor={colorCombinations[colorSelection][1]} effect="solid"/>
                </div>
                <div className='linkedin' data-tip="LinkedIn">
                    <a href='https://linkedin.com/in/vedant-tilwani-creative-developer' target="_blank">
                    <img src = {linkedin_light} alt="LinkedIn SVG"/>
                    </a>
                    <ReactTooltip place="right" textColor={colorCombinations[colorSelection][3]} backgroundColor={colorCombinations[colorSelection][1]} effect="solid"/>
                </div>
                <div className='github' data-tip="GitHub">
                    <a href='https://github.com/TheNoblesse05' target="_blank">
                    <img src = {git_light} alt="GitHub SVG"/>
                    </a>
                    <ReactTooltip place="right" textColor={colorCombinations[colorSelection][3]} backgroundColor={colorCombinations[colorSelection][1]} effect="solid"/>
                </div>
                <div className='resume' data-tip="Resume">
                    <a href={resume_file} download='Vedant Tilwani Resume'>
                    <img src = {resume_light} alt="Resume SVG"/>
                    </a>
                    <ReactTooltip place="right" textColor={colorCombinations[colorSelection][3]} backgroundColor={colorCombinations[colorSelection][1]} effect="solid"/>
                </div>
            </div>
            <div className='border-line'></div>
        </div>
    )
}