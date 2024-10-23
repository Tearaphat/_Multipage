import { useState } from 'react';
import './Counter.css';

function Counter(props) {
    let name = "john Doe";
     // geter and setter
     const [value , setValue] = useState(props.value || 0)
    function increment(){
        setValue(value + 1)
    }
    function decrement(){
    
        setValue(value - 1)
    }
    return ( 
        <div>
            <div className='counter-container'>
                <h3 className="title">{props.name || "COUNTER"}</h3>
                <button className='btn btn-danger' onClick={increment}><span>+</span></button>
                <span className="value-counter">{value}</span>
                <button className='btn btn-success' onClick={decrement}><span>&minus;</span></button>
            </div>
        </div>
    );
}

export default Counter;