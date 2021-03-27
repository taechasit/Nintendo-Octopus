import "./App.css";
import styled, { keyframes } from "styled-components";
import BG from "../src/assets/bg.png";
import wave from "../src/assets/wave.png";
import boat from "../src/assets/boat.png";
import onboat3 from "../src/assets/onboat3.png";
import onboat2 from "../src/assets/onboat2.png";
import onboat1 from "../src/assets/onboat1.png";
import char1 from "../src/assets/char1.png";
import char2 from "../src/assets/char2.png";
import char3 from "../src/assets/char3.png";
import char4 from "../src/assets/char4.png";
import char5 from "../src/assets/char5.png";
import charhand1 from "../src/assets/charhand1.png";
import charhand2 from "../src/assets/charhand2.png";
import charhand3 from "../src/assets/charhand3.png";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [walkState, setWalkState] = useState(0);
  
  const [handGetGoldState, setHandGetGoldState] = useState(0);
  const [octoState, setOctoState] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });

  const handleKeyPress = useCallback((event) => {
    console.log(event.key);

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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, [handleKeyPress]);

  const char = [
    <img className="main onboat1" src={onboat1} alt="BG" width="100%" />,
    <img className="main char1" src={char1} alt="BG" width="100%" />,
    <img className="main char2" src={char2} alt="BG" width="100%" />,
    <img className="main char3" src={char3} alt="BG" width="100%" />,
    <img className="main char4" src={char4} alt="BG" width="100%" />,
    <img className="main char5" src={char5} alt="BG" width="100%" />,
  ];
  const charhand = [
    <img className="main charhand1" src={charhand1} alt="BG" width="100%" />,
    <img className="main charhand2" src={charhand2} alt="BG" width="100%" />,
    <img className="main charhand3" src={charhand3} alt="BG" width="100%" />,
  ];

  return (
    <MainDiv className="App" onKeyDown={handleKeyPress}>
      <img src={BG} alt="main BG" width="100%" />
      <img className="main wave" src={wave} alt="wave" width="100%" />
      <img className="main onboat3" src={onboat3} alt="BG" width="100%" />
      <img className="main onboat2" src={onboat2} alt="BG" width="100%" />
      {char[walkState]}
      {walkState === 5 ? charhand.map((i) => i) : null}
      <img className="main boat" src={boat} alt="BG" width="100%" />
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

const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  background-color: #a5a181;
  .main {
    position: absolute;
    top: 0;
    left: 0;
  }
  .charhand1,
  .charhand2,
  .charhand3 {
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
`;

export default App;
