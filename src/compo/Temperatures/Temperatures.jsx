import './Temperature.css'
import { useState, useEffect } from 'react';
import '../TempVariable/TempVariable.jsx'
import TempVariable from '../TempVariable/TempVariable.jsx';

function Temperature(){
    const [celsius, setCelsius] = useState(0)
    const [fahrenheit, setFahrenheit] = useState(0)
    const [kelvin, setKelvin] = useState(0)
    const [input, setInput] = useState(0)

    useEffect(() => {
        if (input === 0) {
            setFahrenheit((celsius * 9) / 5 + 32);
            setKelvin(celsius + 273.15);
         }
      }, [celsius]);

    useEffect(() => {
        if (input === 1) {
            setCelsius((fahrenheit - 32) * 5 / 9);
            setKelvin(((fahrenheit - 32) * 5 / 9) + 273.15);
         }
      }, [fahrenheit]);

    useEffect(() => {
        if (input === 2) {
            setCelsius(kelvin - 273.15);
            setFahrenheit((kelvin - 273.15) * 9 / 5 + 32);
         }
      }, [kelvin]);

    return(
        <div>
            <div className="addtemp-container">
                <h3>Temperatures</h3>
                <h2 className='temp-h2'><span className="badge bg-primary">{celsius.toFixed(2)} °C</span><span className="badge bg-primary">{fahrenheit.toFixed(2)} °F</span><span className="badge bg-primary">{kelvin.toFixed(2)} °K</span></h2>
            <div className="addtemp-variables">
                <TempVariable name ={'Celsius'} value={celsius} setValue={(value) => {setCelsius(value);setInput(0)}} />
                <TempVariable name ={'Fahrenheit'} value={fahrenheit} setValue={(value) => {setFahrenheit(value);setInput(1)}}/>
                <TempVariable name ={'Kelvin'} value={kelvin} setValue={(value) => {setKelvin(value);setInput(2)}}/>
                </div>
            </div>
        </div>
    )
}

export default Temperature