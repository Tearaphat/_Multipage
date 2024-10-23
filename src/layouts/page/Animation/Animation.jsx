import './Animation.css'
import React, { useState, useEffect } from 'react';
import Basketball from '../../../assets/image/basketball.png'
import football from '../../../assets/image/football.png';
import valleyball from '../../../assets/image/valleyball.png';
import human from '../../../assets/image/me.png';
import cartoon from '../../../assets/image/cartoon.png';

const fieldWidth = 500;
const fieldHeight = 300;
const vx = 5;
const vy = 5;
const frame = 40;
const ballDiameter = 70; // อัปเดตให้สอดคล้องกับ CSS
const maxTop = fieldHeight - ballDiameter - 7;
const maxLeft = fieldWidth - ballDiameter - 7;
const minSpeed = 10;
const maxSpeed = 1;

const App = () => {
  const [running, setRunning] = useState(false);
  const [left, setLeft] = useState(0);
  const [up, setUp] = useState(0);
  const [goDown, setGoDown] = useState(true);
  const [goRight, setGoRight] = useState(true);
  const [rotateDegree, setRotateDegree] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(1);
  const [spinSpeed, setSpinSpeed] = useState(minSpeed);
  const [background, setBackground] = useState('');

  useEffect(() => {
    if (running) {
      const interval = setInterval(process, 35);
      return () => clearInterval(interval);
    }
  }, [running, left, up, rotateDegree]);

  const process = () => {
    calculate();
    render();
  };

  const calculate = () => {
    let newLeft = left;
    let newUp = up;
    let newGoRight = goRight;
    let newGoDown = goDown;

    if (newGoRight) {
      newLeft += vx;
      if (newLeft >= maxLeft) {
        newGoRight = false;
        updateSpinAnimation();
      }
    } else {
      newLeft -= vx;
      if (newLeft <= 0) {
        newGoRight = true;
        updateSpinAnimation();
      }
    }

    if (newGoDown) {
      newUp += vy;
      if (newUp >= maxTop) {
        newGoDown = false;
        updateSpinAnimation();
      }
    } else {
      newUp -= vy;
      if (newUp <= 0) {
        newGoDown = true;
        updateSpinAnimation();
      }
    }

    setLeft(newLeft);
    setUp(newUp);
    setGoRight(newGoRight);
    setGoDown(newGoDown);
  };

  const render = () => {
    setRotateDegree(prev => prev + rotationDirection * spinSpeed);
  };

  const updateSpinAnimation = () => {
    setSpinSpeed(Math.random() * (maxSpeed - minSpeed) + minSpeed);
    setRotationDirection(Math.random() > 0.5 ? 1 : -1);
  };

  const runClick = () => {
    setRunning(!running);
  };

  const backgroundChange = (type) => {
    switch (type) {
      case 'basketball':
        setBackground(`url(${Basketball})`);
        break;
      case 'football':
        setBackground(`url(${football})`);
        break;
      case 'valleyball':
        setBackground(`url(${valleyball})`);
        break;
      case 'human':
        setBackground(`url(${human})`);
        break;
      case 'cartoon':
        setBackground(`url(${cartoon})`);
        break;
      case 'clear':
        setBackground('');
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div
        className="field"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="ball"
          style={{
            left: left + 'px',
            top: up + 'px',
            backgroundImage: background,
            transform: `rotate(${rotateDegree}deg)`,
          }}
        />
      </div>

      <div className="control btn-group" role="group">
        <button className="btn btn-success" id="run" onClick={runClick}>
          <span>
            {running ? (
              <><i className="bi bi-pause"></i>&nbsp;STOP</>
            ) : (
              <><i className="bi bi-play"></i>&nbsp;RUN</>
            )}
          </span>
        </button>
        <button className="anime btn btn-primary" onClick={() => backgroundChange('clear')}>CLEAR</button>
        <button className="anime btn btn-primary" onClick={() => backgroundChange('basketball')}>Basketball</button>
        <button className="anime btn btn-primary" onClick={() => backgroundChange('football')}>Football</button>
        <button className="anime btn btn-primary" onClick={() => backgroundChange('valleyball')}>Valley</button>
        <button className="anime btn btn-primary" onClick={() => backgroundChange('human')}>Human</button>
        <button className="anime btn btn-primary" onClick={() => backgroundChange('cartoon')}>Cartoon</button>
      </div>
    </div>
  );
};

export default App;
