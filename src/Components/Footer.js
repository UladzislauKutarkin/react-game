import React from 'react';
import {Link} from "react-router-dom";
import useSound from 'use-sound';
import hoverSound from '../Components/sound/mixkit-arcade-game-jump-coin-216.wav'
import githubIcon from '../Components/img/part+1+github-1320568339880199515.png'
import rsSchoolLogo from '../Components/img/rs_school_js.svg'
import { BrowserRouter } from 'react-router-dom';


export default function Footer() {
    const [playHover, { stop }] = useSound(hoverSound);
    return (
        <BrowserRouter>
        <footer className='wrapper-footer'>
            <div className='game-footer'>
                <Link to={{ pathname: "https://github.com/UladzislauKutarkin" }} target="_blank">
                    <img onMouseEnter={playHover} onMouseLeave={stop} className='footer-img'
                         alt='GitHubLogo'
                         src={githubIcon}/>
                </Link>
                <span className='footer-year'><strong>2021</strong></span>
                <Link to={{ pathname: "https://rs.school/js/" }} target="_blank">
                    <img onMouseEnter={playHover} onMouseLeave={stop} className='footer-img'
                         alt='RsSchoolLogo'
                         src={rsSchoolLogo}/>
                </Link>
            </div>
        </footer>
        </BrowserRouter>
    )

}