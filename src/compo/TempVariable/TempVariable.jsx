import './TempVariable.css'


function TempVariable({name,value,setValue,type}) {
    return (  
        <div>
            <div className='container-temp'>
                <h3 className="title">{name || "COUNTER"}</h3>
                <div className="button-container">
                <button className='btn btn-danger' onClick={() => setValue(value + 1)}><span>+</span></button>
                <span className="value-temp">{type && type === 'int' ? value : value.toFixed(2)}</span>
                <button className='btn btn-success' onClick={() => setValue(value - 1)}><span>&minus;</span></button>
                </div>
            </div>
        </div>
    );
}

export default TempVariable;