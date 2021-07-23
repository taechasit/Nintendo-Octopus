import "./App.css";
import styled, { keyframes } from "styled-components";
import { useCallback, useEffect, useState } from "react";
import audio from "../src/assets/CollectCoin.mp3";
import gameOver from "../src/assets/GameOver.mp3";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => images[item.replace('./', '')] = r(item) );
  return images;
}
const images = importAll(require.context('../src/assets', false, /\.(png|jpe?g|svg)$/));

function App() {
  const [walkState, setWalkState] = useState(0);
  const [lifePoint, setLifePoint] = useState(3);
  const [handGetGoldState, setHandGetGoldState] = useState(0);
  const [goldState, setGoldState] = useState(0);
  const [gotCatchState, setGotCatchState] = useState(false);
  const [isGameOverState, setIsGameOverState] = useState(false);
  const [lastScoreState, setLastScoreState] = useState(false);

  const [tail1, setTail1] = useState({ status: 0, state: 0});
  const [tail2, setTail2] = useState({ status: 0, state: 0});
  const [tail3, setTail3] = useState({ status: 0, state: 0});
  const [tail4, setTail4] = useState({ status: 0, state: 0});


  const handleKeyPress = useCallback((event) => {
    if (event.key === "ArrowRight") {
      if (walkState < 5) {
        setWalkState(walkState + 1);
      } else {
        setWalkState(walkState);
      }
    } else if (event.key === "ArrowLeft") {
      if (walkState > 0) {
        setWalkState(walkState - 1);
      } else {
        setWalkState(walkState);
      }
    }
  },[walkState]);

  
  function randomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {
    if(lifePoint === 0){
      setIsGameOverState(true)
      setLifePoint(3)
      setGoldState(0)
      setHandGetGoldState(0)
      setLastScoreState(handGetGoldState)
    }else if(walkState === 2 && tail1.state === 4){
      new Audio(gameOver).play();
      setLifePoint(lifePoint -1)
      setGotCatchState(true)
      setTail1({...tail1,state:4})
      setTail2({...tail2,state:2})
      setTail3({...tail3,state:4})
      setTail4({...tail4,state:3})
      setWalkState(6)
      setGoldState(0)
    }else if(walkState === 3 && tail2.state === 5){
      new Audio(gameOver).play();
      setLifePoint(lifePoint -1)
      setGotCatchState(true)
      setTail1({...tail1,state:4})
      setTail2({...tail2,state:2})
      setTail3({...tail3,state:4})
      setTail4({...tail4,state:3})
      setWalkState(6)
      setGoldState(0)
    }else if(walkState === 4 && tail3.state === 4){
      new Audio(gameOver).play();
      setLifePoint(lifePoint -1)
      setGotCatchState(true)
      setTail1({...tail1,state:4})
      setTail2({...tail2,state:2})
      setTail3({...tail3,state:4})
      setTail4({...tail4,state:3})
      setWalkState(6)
      setGoldState(0)
    }else if(walkState === 5 && tail4.state === 3){
      new Audio(gameOver).play();
      setLifePoint(lifePoint -1)
      setGotCatchState(true)
      setTail1({...tail1,state:4})
      setTail2({...tail2,state:2})
      setTail3({...tail3,state:4})
      setTail4({...tail4,state:3})
      setWalkState(6)
      setGoldState(0)
    }
    return () => {};
    
  }, [walkState,lifePoint,tail1,tail2,tail3,tail4,lastScoreState,goldState,handGetGoldState]);

  useEffect(() => {
    if(walkState === 0 && goldState > 0){
      setHandGetGoldState(handGetGoldState+goldState)
      new Audio(audio).play();
      setGoldState(0)
    }
    return () => {};
    
  }, [walkState,handGetGoldState,goldState]);

  useEffect(()=>{
    let addPoint
    if(walkState === 5){
      addPoint = setInterval(()=>{ 
        setHandGetGoldState(handGetGoldState+1)
        setGoldState(goldState+1)
        new Audio(audio).play();
      }, 780);

    }
    return () => {
      clearInterval(addPoint)
    };
  },[walkState,handGetGoldState,goldState])

  useEffect(() => {
    if(walkState !== 6 ){
      document.addEventListener("keydown", handleKeyPress, false);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, [handleKeyPress,walkState]);


  useEffect(()=>{
    let tail1State
    let time = randomInt(500,800)
    if(gotCatchState){
      tail1State = setInterval(()=>{ 
        setGotCatchState(false)
        setWalkState(0)
      }, 3000);
    }else if(tail1.status === 0){
      if(tail1.state < 4){
        tail1State = setInterval(()=>{ 
          setTail1({...tail1,state:tail1.state + 1})
        }, time);
      }else{
        setTail1({...tail1,status:1})
      }

    }else if(tail1.status === 1){
      if(tail1.state > 0){
        tail1State = setInterval(()=>{ 
          setTail1({...tail1,state:tail1.state - 1})
        }, time);
      }else{
        setTail1({...tail1,status:0})
      }
    }

    return () => {
      clearInterval(tail1State)
    };
  },[tail1,gotCatchState])

  useEffect(()=>{
    let tail2State
    let time = randomInt(500,800)
    if(gotCatchState){
      tail2State = setInterval(()=>{ 
        setGotCatchState(false)
        setWalkState(0)
      }, 3000);
    }else if(tail2.status === 0){
      if(tail2.state < 5){
        tail2State = setInterval(()=>{ 
          setTail2({...tail2,state:tail2.state + 1})
        }, time);
      }else{
        setTail2({...tail2,status:1})
      }

    }else if(tail2.status === 1){
      if(tail2.state > 0){
        tail2State = setInterval(()=>{ 
          setTail2({...tail2,state:tail2.state - 1})
        }, time);
      }else{
        setTail2({...tail2,status:0})
      }
    }

    return () => {
      clearInterval(tail2State)
    };
  },[tail2,gotCatchState])

  useEffect(()=>{
    let tail3State
    let time = randomInt(500,800)
    if(gotCatchState){
      tail3State = setInterval(()=>{ 
        setGotCatchState(false)
        setWalkState(0)
      }, 3000);
    }else if(tail3.status === 0){
      if(tail3.state < 4){
        tail3State = setInterval(()=>{ 
          setTail3({...tail3,state:tail3.state + 1})
        }, time);
      }else{
        setTail3({...tail3,status:1})
      }

    }else if(tail3.status === 1){
      if(tail3.state > 0){
        tail3State = setInterval(()=>{ 
          setTail3({...tail3,state:tail3.state - 1})
        }, time);
      }else{
        setTail3({...tail3,status:0})
      }
    }

    return () => {
      clearInterval(tail3State)
    };
  },[tail3,gotCatchState])

  useEffect(()=>{
    let tail4State
    let time = randomInt(500,800)
    if(gotCatchState){
      tail4State = setInterval(()=>{ 
        setGotCatchState(false)
        setWalkState(0)
      }, 3000);
    }else if(tail4.status === 0){
      if(tail4.state < 3){
        tail4State = setInterval(()=>{ 
          setTail4({...tail4,state:tail4.state + 1})
        }, time);
      }else{
        setTail4({...tail4,status:1})
      }

    }else if(tail4.status === 1){
      if(tail4.state > 0){
        tail4State = setInterval(()=>{ 
          setTail4({...tail4,state:tail4.state - 1})
        }, time);
      }else{
        setTail4({...tail4,status:0})
      }
    }

    return () => {
      clearInterval(tail4State)
    };
  },[tail4,gotCatchState])


  const char = [
    <img key='char1' className="main onboat1" src={images['onboat1.png'].default} alt="BG" width="100%" />,
    <img key='char2' className="main char1" src={images['char1.png'].default} alt="BG" width="100%" />,
    <img key='char3' className="main char2" src={images['char2.png'].default} alt="BG" width="100%" />,
    <img key='char4' className="main char3" src={images['char3.png'].default} alt="BG" width="100%" />,
    <img key='char5' className="main char4" src={images['char4.png'].default} alt="BG" width="100%" />,
    <img key='char6' className="main char5" src={images['char5.png'].default} alt="BG" width="100%" />,
    null
  ];
  const charhand = [
    <img key='hand1' className="main charhand1" src={images['charhand1.png'].default} alt="BG" width="100%" />,
    <img key='hand2' className="main charhand2" src={images['charhand2.png'].default} alt="BG" width="100%" />,
    <img key='hand3' className="main charhand3" src={images['charhand3.png'].default} alt="BG" width="100%" />,
  ];
  const gotCatch = [
    <img key='hand1' className="main gotcatch1" src={images['catch1.png'].default} alt="BG" width="100%" />,
    <img key='hand2' className="main gotcatch2" src={images['catch2.png'].default} alt="BG" width="100%" />,
  ];
  const tail1Array = [
    null,
    <img key='tail1-1' className="main" src={images['tail-1-1.png'].default} alt="BG" width="100%" />,
    <img key='tail1-2' className="main" src={images['tail-1-2.png'].default} alt="BG" width="100%" />,
    <img key='tail1-3' className="main" src={images['tail-1-3.png'].default} alt="BG" width="100%" />,
    <img key='tail1-4' className="main" src={images['tail-1-4.png'].default} alt="BG" width="100%" />,
  ]
  const tail2Array = [
    null,
    <img key='tail2-1' className="main" src={images['tail-2-1.png'].default} alt="BG" width="100%" />,
    <img key='tail2-2' className="main" src={images['tail-2-2.png'].default} alt="BG" width="100%" />,
    <img key='tail2-3' className="main" src={images['tail-2-3.png'].default} alt="BG" width="100%" />,
    <img key='tail2-4' className="main" src={images['tail-2-4.png'].default} alt="BG" width="100%" />,
    <img key='tail2-5' className="main" src={images['tail-2-5.png'].default} alt="BG" width="100%" />,
  ]

  const tail3Array = [
    null,
    <img key='tail3-1' className="main" src={images['tail-3-1.png'].default} alt="BG" width="100%" />,
    <img key='tail3-2' className="main" src={images['tail-3-2.png'].default} alt="BG" width="100%" />,
    <img key='tail3-3' className="main" src={images['tail-3-3.png'].default} alt="BG" width="100%" />,
    <img key='tail3-4' className="main" src={images['tail-3-4.png'].default} alt="BG" width="100%" />,
  ]

  const tail4Array = [
    null,
    <img key='tail4-1' className="main" src={images['tail-4-1.png'].default} alt="BG" width="100%" />,
    <img key='tail4-2' className="main" src={images['tail-4-2.png'].default} alt="BG" width="100%" />,
    <img key='tail4-3' className="main" src={images['tail-4-3.png'].default} alt="BG" width="100%" />,
  ]

  let lifePointArray = null
  if(lifePoint === 3){
    lifePointArray = [
      <img key='life3' className="main onboat3" src={images['onboat3.png'].default} alt="BG" width="100%" />,
      <img key='life2' className="main onboat2" src={images['onboat2.png'].default} alt="BG" width="100%" />
    ]
  }else if(lifePoint === 2){
    lifePointArray = [
      <img key='life2' className="main onboat2" src={images['onboat2.png'].default} alt="BG" width="100%" />
    ]
  }

  let isGameOver = null
  if(isGameOverState){
    isGameOver = (
      <div className='gameOverContainer'>
        <div>
          <h1>GAME OVER</h1>
          <h2>PLAY AGAIN</h2>
          <h3>LAST SCORE {lastScoreState} </h3>
          <div className='btnbox'>
            <h3 className='btn' onClick={()=>setIsGameOverState(false)}>Yes</h3>
            <h3 className='btn'>No</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <MainDiv className="App" onKeyDown={handleKeyPress}>
      <img src={images['bg.png'].default} alt="main BG" width="100%" />
      <img className="main wave" src={images['wave.png'].default} alt="wave" width="100%" />
      {lifePointArray}
      {char[walkState]}
      {walkState === 5 ? charhand : null}
      {gotCatchState ? gotCatch : null}
      {tail1Array[tail1.state]}
      {tail2Array[tail2.state]}
      {tail3Array[tail3.state]}
      {tail4Array[tail4.state]}
      <img className="main boat" src={images['boat.png'].default} alt="BG" width="100%" />
      <h1 className='point'>{handGetGoldState}</h1>
      {isGameOver}
    </MainDiv>
  );
}
const getgold1 = keyframes`
0%{ opacity: 1;  } 
11%{ opacity: 1;  } 
22%{ opacity: 1;  } 
33%{ opacity: 0;  } 
44%{ opacity: 0;  } 
55%{ opacity: 0;  } 
66%{ opacity: 0;  } 
77%{ opacity: 0;  } 
88%{ opacity: 0;  } 
99%{ opacity: 0;  } 
100%{ opacity: 0;  } 
`;
const getgold2 = keyframes`
0%{ opacity: 0;  } 
11%{ opacity: 0;  } 
22%{ opacity: 0;  } 
33%{ opacity: 1;  } 
44%{ opacity: 1;  } 
55%{ opacity: 1;  } 
66%{ opacity: 0;  } 
77%{ opacity: 0;  } 
88%{ opacity: 0;  } 
99%{ opacity: 0;  } 
100%{ opacity: 0;  } 
`;
const getgold3 = keyframes`
0%{ opacity: 0;  } 
11%{ opacity: 0;  } 
22%{ opacity: 0;  } 
33%{ opacity: 0;  } 
44%{ opacity: 0;  } 
55%{ opacity: 0;  } 
66%{ opacity: 1;  } 
77%{ opacity: 1;  } 
88%{ opacity: 1;  } 
99%{ opacity: 0;  } 
100%{ opacity: 0;  } 
`;

const gotCatch1 = keyframes`
0%{ opacity: 1;  } 
11%{ opacity: 1;  } 
22%{ opacity: 1;  } 
33%{ opacity: 1;  } 
44%{ opacity: 1;  } 
55%{ opacity: 1;  } 
66%{ opacity: 0;  } 
77%{ opacity: 0;  } 
88%{ opacity: 0;  } 
99%{ opacity: 0;  } 
100%{ opacity: 0;  } 
`;
const gotCatch2 = keyframes`
0%{ opacity: 0;  } 
11%{ opacity: 0;  } 
22%{ opacity: 0;  } 
33%{ opacity: 0;  } 
44%{ opacity: 0;  } 
55%{ opacity: 0;  } 
66%{ opacity: 1;  } 
77%{ opacity: 1;  } 
88%{ opacity: 1;  } 
99%{ opacity: 1;  } 
100%{ opacity: 1;  } 
`;

const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  background-color: #c4c2b5;
  .main {
    position: absolute;
    top: 0;
    left: 0;
  }
  .charhand1,
  .charhand2,
  .charhand3,
  .gotcatch1,
  .gotcatch2 {
    opacity: 0;
  }
  .charhand1 {
    animation: ${getgold1} 0.8s infinite;
  }
  .charhand2 {
    animation: ${getgold2} 0.8s infinite;
  }
  .charhand3 {
    animation: ${getgold3} 0.8s infinite;
  }
  .gotcatch1 {
    animation: ${gotCatch1} 0.8s infinite;
  }
  .gotcatch2 {
    animation: ${gotCatch2} 0.8s infinite;
  }
  .point{
    position: absolute;
    top:10%;
    right:30%;
    color: #424242;
    font-size: 5vw;
  }
  .gameOverContainer{
    position: absolute;
    display:flex;
    justify-content: center;
    align-items: center;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-color:rgba(0, 0, 0, 0.5);
    div{
      display:flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color:white;
      h1{
        font-size: 6vw;
        margin: 2rem 0;
      }
      h2{
        font-size: 4vw;
        margin: 2rem 0;
      }
      h3{
        margin: 2rem 0;
      }
      .btnbox{
        margin: 2rem 0;
        font-size: 1vw;
        display:flex;
        width:250px;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        .btn{
          cursor:pointer;
          transition: all 0.1s ease-in-out;
          &:hover{
            transform: scale(2);
            color:#e5ff00;
          }
        }
      }
    }
    
  }
`;

export default App;
