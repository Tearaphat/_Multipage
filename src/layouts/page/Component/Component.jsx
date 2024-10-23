import './Component.css'
import Counter from '../../../compo/counter/Counter'
import Timer from '../../../compo/Timer/Timer'
import Add from '../../../compo/Add/Add'
import Temperature from '../../../compo/Temperatures/Temperatures'

function Component() {
    return (  
    <div className="component-container">
        <span className='badge bg-dark'><h2>React components</h2></span>
      <div className='in-container'>
        <Counter />
        <Timer />
        <Add />
        <Temperature />
      </div>
      <span className='badge bg-dark'><h2>Thiraphat Detrungphitak 66085923</h2></span>
        </div>
    );
}


export default Component;