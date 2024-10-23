import React, { useState, useEffect } from 'react';
import './Calculator.css'

const Calculator = () => {
    const [screen, setScreen] = useState('');
    const [secondTotal, setSecondTotal] = useState(0);
    const [lastOperator, setLastOperator] = useState(null);
    const [resetDisplay, setResetDisplay] = useState(false);

    // Handle keyboard inputs
    useEffect(() => {
        const checkKey = (e) => {
            if (e.key === 'Enter') {
                calculate();
            } else if (e.key === 'Escape' || e.key === 'Backspace') {
                clearDisplay();
            } else if (e.key === '+') {
                operatorClick('add');
            } else if (e.key === '-') {
                operatorClick('sub');
            } else if (e.key === '*') {
                operatorClick('mul');
            } else if (e.key === '/') {
                operatorClick('div');
            } else if (e.key === '.') {
                addClick('.');
            } else if (e.key >= '0' && e.key <= '9') {
                addClick(e.key);
            }
        };

        document.addEventListener('keydown', checkKey);

        return () => {
            document.removeEventListener('keydown', checkKey);
        };
    }, [screen, lastOperator, resetDisplay]);

    const addClick = (input) => {
        if (resetDisplay) {
            setScreen(input);
            setResetDisplay(false);
        } else if (screen.length >= 9) {
            return;
        } else {
            setScreen((prev) => prev + input);
        }
    };

    const clearDisplay = () => {
        setScreen('');
        setSecondTotal(0);
        setLastOperator(null);
    };

    const operatorClick = (input) => {
        setSecondTotal(parseFloat(screen));
        setResetDisplay(true);

        switch (input) {
            case 'add':
                setLastOperator('+');
                break;
            case 'sub':
                setLastOperator('-');
                break;
            case 'mul':
                setLastOperator('*');
                break;
            case 'div':
                setLastOperator('/');
                break;
            default:
                break;
        }
    };

    const calculate = () => {
        const firstTotal = parseFloat(screen);
        if (lastOperator === null) return;

        let result = 0;
        switch (lastOperator) {
            case '+':
                result = secondTotal + firstTotal;
                break;
            case '-':
                result = secondTotal - firstTotal;
                break;
            case '*':
                result = secondTotal * firstTotal;
                break;
            case '/':
                result = secondTotal / firstTotal;
                break;
            default:
                return;
        }

        setScreen(result.toString());
        setResetDisplay(true);
        setSecondTotal(0);
        setLastOperator(null);
    };

    return (
        <div className="wrapper">
            {/* SCREEN */}
            <div className="screen-con">
                <input type="text" value={screen} readOnly />
            </div>
            {/* BUTTONS */}
            <section className="cals-btt">
                <div className="btt-row">
                    <button className="btt-clear" onClick={clearDisplay}>AC</button>
                    <button className="btt-none">+/-</button>
                    <button className="btt-none">%</button>
                    <button className="btt-operator" onClick={() => operatorClick('div')}>÷</button>
                </div>
                <div className="btt-row">
                    <button className="btt-number" onClick={() => addClick('7')}>7</button>
                    <button className="btt-number" onClick={() => addClick('8')}>8</button>
                    <button className="btt-number" onClick={() => addClick('9')}>9</button>
                    <button className="btt-operator" onClick={() => operatorClick('mul')}>x</button>
                </div>
                <div className="btt-row">
                    <button className="btt-number" onClick={() => addClick('4')}>4</button>
                    <button className="btt-number" onClick={() => addClick('5')}>5</button>
                    <button className="btt-number" onClick={() => addClick('6')}>6</button>
                    <button className="btt-operator" onClick={() => operatorClick('sub')}>-</button>
                </div>
                <div className="btt-row">
                    <button className="btt-number" onClick={() => addClick('1')}>1</button>
                    <button className="btt-number" onClick={() => addClick('2')}>2</button>
                    <button className="btt-number" onClick={() => addClick('3')}>3</button>
                    <button className="btt-operator" onClick={() => operatorClick('add')}>+</button>
                </div>
                <div className="btt-row">
                    <button className="btt-zero" onClick={() => addClick('0')}>0</button>
                    <button className="btt-dot" onClick={() => addClick('.')}>.</button>
                    <button className="btt-equal" onClick={calculate}>=</button>
                </div>
            </section>
        </div>
    );
};

export default Calculator;