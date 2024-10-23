
import './Variable.css';

function Variable({name,value,setValue,type}) {
     //const [value , setValue] = useState(props.value || 0)
    return (
        <div>
            <div className='variable-container'>
                <h3 className="title">{name || "COUNTER"}</h3>
                <button className='btn btn-danger' onClick={() => setValue(value + 1)}>+</button>
                <span className="value">{type && type === 'int' ? value : value.toFixed(2)}</span>
                <button className='btn btn-success' onClick={() => setValue(value - 1)}>&minus;</button>
            </div>
        </div>
    );
}

export default Variable;