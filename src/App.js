import React, {useEffect, useState} from 'react'
import './App.css';
import cloneDeep from "lodash.clonedeep";
import { useEvent, getColors } from "./Components/util";
import useLocalStorageState from "use-local-storage-state";
import Player from "./Components/Player";
import useSound from 'use-sound';
import GameOverSound from './Components/sound/mixkit-arcade-retro-game-over-213.wav';
import NewButtonSound from './Components/sound/mixkit-arcade-game-jump-coin-216.wav';
import StepSound from './Components/sound/mixkit-unlock-game-notification-253.wav';
import newRecordScore from './Components/sound/mixkit-magic-sweep-game-trophy-257.wav'
import Footer from "./Components/Footer";
import newGameSound from './Components/sound/mixkit-fairy-arcade-sparkle-866.wav';
import arcadeGameSound from './Components/sound/mixkit-arcade-bonus-229.wav';
import classicGameSound from './Components/sound/mixkit-positive-interface-beep-221.wav';
import refreshSound from './Components/sound/mixkit-quick-jump-arcade-game-239.wav';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Header from "./Components/Header";


function App() {
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const [playGameOver] = useSound(GameOverSound);
  const [playNewHover, { stop }] = useSound(NewButtonSound);
  const [playStep] = useSound(StepSound);
  const [playNewRecord] = useSound(newRecordScore);
  const [playNewGame] = useSound(newGameSound)
  const [setArcade] = useSound(arcadeGameSound)
  const [setClassic] = useSound(classicGameSound)
  const [setNewBackground] = useSound(refreshSound)
  const [playField, setPlayField] = useState(4);
  const [playFieldUpAndDown, setPlayFieldUpAndDown] = useState(3);
  const [bigField, setBigField] = useState(false)
  const [bgc, setBgc] = useState(  {
      backgroundColor: "#faf8ef"
  });

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const handle = useFullScreenHandle();
  const [bestScore, setBestscore] = useLocalStorageState('key',0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false);
  const [gameStyle, setGameStyle] = useState('Classic');
  const classicStyle = document.querySelector('.classic')
  const arcadeStyle = document.querySelector('.arcade')
  const changeStyleHandlerArcade = () => {
      setGameStyle('Arcade')
      classicStyle.classList.remove('actives')
      arcadeStyle.classList.add('actives')
      setArcade()
  }
  const changeStyleHandlerClassic = () => {
    setGameStyle('Classic')
    classicStyle.classList.add('actives')
    arcadeStyle.classList.remove('actives')
    setClassic()
  }
  const refreshVector = document.querySelector('.vectorToRotate')

  //Setting Field
  const setBigFieldHanlder = () => {
      const emptyGrid = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      setScore(0)
      addNumber(emptyGrid);
      addNumber(emptyGrid);
      setData(emptyGrid);
      setPlayField(5);
      setPlayFieldUpAndDown(4)
      setBigField(false)
      if (!bigField) {
      const emptyGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      setScore(0)
      addNumber(emptyGrid);
      addNumber(emptyGrid);
      setData(emptyGrid);
      setPlayField(4);
      setPlayFieldUpAndDown(3)
      setBigField(true)
    }


  }
  // Initialize
  const initialize = () => {
    let newGrid = cloneDeep(data);
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
    setBigFieldHanlder()
  };
  //Change BackgroundColor
  const changeColorHandler = () => {
    if(bgc.backgroundColor==='#faf8ef') {
      setBgc({...bgc, backgroundColor: '#ffb88c'
    }
      )
      setNewBackground()
    } else if (bgc.backgroundColor==='#ffb88c'){
      setBgc({...bgc, backgroundColor: '#bdc3c7'
          }
      )
      setNewBackground()
    } else if (bgc.backgroundColor==='#bdc3c7'){
      setBgc({...bgc, backgroundColor: '#faf8ef'
      }
      )
      setNewBackground()
    }
    refreshVector.classList.add('rotated')
  }

  // AddNumber
  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }
      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
      if (attempts > 100) {
        gridFull = true;
      }
    }
  };
  // Swipe Left
  const swipeLeft = (lose) => {
    console.log("swipe left");
    console.log(playField)
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      console.log(b)
      let slow = 0;
      let fast = 1;
      while (slow < playField) {
        if (fast === playField) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (lose) {
      return newArray;
    } else {
      setData(newArray);
      if (JSON.stringify(oldGrid) === JSON.stringify(newArray)) {
        setScore(score)
      } else {
        if (bestScore < score) {
          setScore(score+4)
          setBestscore(score)
          playNewRecord()
        } else {
          setScore(score+4)
          playStep()
        }
      }
    }
  };

  const swipeRight = (lose) => {
    console.log("swipe right");
    let oldData = JSON.parse(JSON.stringify(data));
    let newArray = cloneDeep(data);

    for (let i = 3 ; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (lose) {
      return newArray;
    } else {
      setData(newArray);
      if (JSON.stringify(newArray) === JSON.stringify(oldData)) {
        setScore(score)
      } else {
        if (bestScore < score) {
          setScore(score+4)
          setBestscore(score)
          playNewRecord()
        } else {
          setScore(score+4)
          playStep()
        }
      }
    }
  };

  const swipeDown = (lose) => {
    console.log("swipe down");
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = playFieldUpAndDown; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if (lose) {
      return b;
    } else {
      setData(b);
      if (JSON.stringify(b) === JSON.stringify(oldData)) {
        setScore(score)
      } else {
        if (bestScore < score) {
          setScore(score+4)
          setBestscore(score)
          playNewRecord()
        } else {
          setScore(score+4)
          playStep()
        }
      }
    }
  };

  const swipeUp = (lose) => {
    console.log("swipe up");
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < playField) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (lose) {
      return b;
    } else {
      setData(b);
      if (JSON.stringify(oldData) === JSON.stringify(b)) {
        setScore(score)
      } else {
        if (bestScore < score) {
          setScore(score+4)
          setBestscore(score)
          playNewRecord()
        } else {
          setScore(score+4)
          playStep()
        }
      }

    }
  };

  // Check Game over
  const checkIfGameOver = () => {
    let checker = swipeLeft(true);
    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;

    }

    let checker2 = swipeDown(true);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    let checker3 = swipeRight(true);
    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }

    let checker4 = swipeUp(true);
    return JSON.stringify(data) === JSON.stringify(checker4);


  };
  // Reset
  const resetGame = () => {
    setGameOver(false);
    if (!bigField) {
      const emptyGrid = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      setScore(0)
      addNumber(emptyGrid);
      addNumber(emptyGrid);
      setData(emptyGrid);
      playNewGame()
      }
    else { const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
      setScore(0)
      addNumber(emptyGrid);
      addNumber(emptyGrid);
      setData(emptyGrid);
      playNewGame();}

  };

  const handleKeyDown = (event) => {
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        swipeUp();
        break;
      case DOWN_ARROW:
        swipeDown();
        break;
      case LEFT_ARROW:
        swipeLeft();
        break;
      case RIGHT_ARROW:
        swipeRight();
        break;
      default:
        break;
    }

    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      setGameOver(true);
      playGameOver()
    }
  };
  useEffect(() => {
    initialize();
  }, []);

  useEvent("keydown", handleKeyDown);

  return (
      <FullScreen handle={handle}>
      <div className='App' style={bgc}>
        <Header changeBcg={changeColorHandler}
                changeClassic={changeStyleHandlerClassic}
                changeArcade={changeStyleHandlerArcade}
                bigFieldHandler={setBigFieldHanlder}
                fullscreenhanlder={handle}
        />
        <div className="playField">
          <div className="headerWrapper">
            <div className="headerTitle">
              2048
            </div>
            <div className="Score-and-GameBtn-Wrapper">
              <div className='ScoreWrapper'>
              <div className='Score'>
               Score: {score}
              </div>
                <div className='Score'>
                  Best : {bestScore}
                </div>
              </div>
              <div onClick={resetGame}  onMouseEnter={playNewHover} onMouseLeave={stop} className='newGameButton btn'>
                NEW GAME
              </div>

            </div>
          </div>
          <div className="playFieldWrapper">
            {gameOver && (
                <div className='gameOverOverlay'>
                  <div>
                    <div className='GameOver'>
                      Game Over
                    </div>
                    <div>
                      <div className='tryAgainWrapper'>
                        <div onMouseEnter={playNewHover} onMouseLeave={stop} className='tryAgainButton' onClick={resetGame}>
                          Try Again
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )}
              {data.map((row, oneIndex) => {
                return (
                    <div style={{ display: "flex" }} key={oneIndex}>
                      {row.map((digit, index) => (
                          <Block gameStyle={gameStyle} num={digit} key={index}/>
                      ))}
                    </div>
                );
              })}
          </div>
          <div className='HowToPlay'>
            <strong>HOW TO PLAY:</strong> Use your <strong>arrow keys</strong> to move the tiles.
            Tiles with the same number <strong>merge into one</strong> when they touch.
            Add them up to reach <strong>2048!</strong>
          </div>
          <Player/>
        </div>
        <Footer/>
      </div>
</FullScreen>
  );
}

const Block = ({ num, gameStyle }) => {
  const { blockStyle } = style;

  return (
      <div
          style={{
            ...blockStyle,
            background: getColors(num, gameStyle),
            color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
          }}
      >
        {num !== 0 ? num : ""}
      </div>
  );
};

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  }
};

export default App;

