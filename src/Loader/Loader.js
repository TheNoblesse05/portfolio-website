import React from "react";
import './loader.css';
import BounceLoader from "react-spinners/BounceLoader";

export default function Loader({colorCombinations}) {
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#336699"/></svg>'
        )}'), auto`
    return(
        <div className="loader-main">
            <div className="loader-name">
                Vedant Tilwani <span>Portfolio</span>
            </div>
            <div className="loader-text">
                With a mission to present the possibilites of web design, I puruse new expressions through experiment and thought.
            </div>
            <div className="bounce-loader">
                <BounceLoader className="loading-circle" color={colorCombinations[1][3]} size={40} loading speedMultiplier={1}/>
                <BounceLoader className="loading-circle" color={colorCombinations[2][3]} size={40} loading speedMultiplier={1}/>
                <BounceLoader className="loading-circle" color={colorCombinations[3][3]} size={40} loading speedMultiplier={1}/>
                <BounceLoader className="loading-circle" color={colorCombinations[4][3]} size={40} loading speedMultiplier={1}/>
            </div>
        </div>
    )
}