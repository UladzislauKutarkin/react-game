import React, {useState } from 'react'
import '../App.css'
import refreshBtn from '../Components/img/Vector.png'
import useSound from 'use-sound';
import hoverSound from '../Components/sound/mixkit-arcade-game-jump-coin-216.wav'
import fullscreenIcon from '../Components/img/fullscreen.png'


export default function Header(props) {
    const [playHover, { stop }] = useSound(hoverSound);
    const [mode, setMode] = useState('Off')
    const refreshVector = document.querySelector('.vectorToRotate')
    const removeRefresh = ()=> {
        refreshVector.classList.remove('rotated')
    }
    const SetPlayMode= ()=> {
        if(mode==='On') {
            props.bigFieldHandler()
            setMode('Off')
        } else if(mode==='Off') {
            props.bigFieldHandler()
            setMode('On')
        }
    }

    return (
        <header className='header-wrapper'>
            <div className="header-center-items">

            <div className='refresh-btn btn'>
                <img  className='vectorToRotate'
                      onClick={props.changeBcg}
                      onAnimationEnd={removeRefresh}
                      src={refreshBtn}
                      alt='RefreshBtn'
                      onMouseEnter={playHover} onMouseLeave={stop}
                />
            </div>
            <div className='game-style-wrapper'>
                <div onClick={props.changeClassic}
                     className="game-style classic btn"
                     onMouseEnter={playHover} onMouseLeave={stop}>Classic</div>
                <div onClick={props.changeArcade}
                     className="game-style arcade btn"
                     onMouseEnter={playHover} onMouseLeave={stop}>Arcade</div>
            </div>
                <div className='playMode btn' onClick={SetPlayMode}
                     onMouseEnter={playHover} onMouseLeave={stop}>
                    Big Field: {mode}
                </div>
                <div>
                    <img onClick={props.fullscreenhanlder.enter} className='refresh-btn btn'
                         src={fullscreenIcon}
                         alt='fullScreen'
                         onMouseEnter={playHover} onMouseLeave={stop}
                    />
                </div>
            </div>
        </header>
    )
}