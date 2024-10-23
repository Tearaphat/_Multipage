import Variable from "../Variable/Variable"
import { useState } from 'react';
import './Add.css'
function Add(){
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    return (
        <div className="add-container">
            <h3>ADD</h3>
            <h2 className="add-h2"><span className="badge bg-primary">A={a}</span><span className="badge bg-primary">B={b}</span><span className="badge bg-primary">A+B={a+b}</span></h2>
            <div className="add-variables">
            <Variable name ={'A'} value={a} setValue={setA} />
            <Variable name ={'B'} value={b} setValue={setB}/>
            </div>
        </div>
    )
}
export default Add