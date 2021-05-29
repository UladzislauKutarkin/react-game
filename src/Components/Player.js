import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import music from '../Components/sound/Chiptronical.ogg'


export default function Player () {
    return (<AudioPlayer
        autoPlay
        src={music}
        // other props here
    />
    )
}