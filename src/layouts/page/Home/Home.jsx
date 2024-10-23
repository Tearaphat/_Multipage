import './Home.css'
import Working from '../../../assets/working.gif'
function Home() {
    return ( 
        <div className='home-container'>
            <div className="left-side">
                <div className='img-container'><div className='img-me'></div></div>
                <b>My name is Thiraphat Detrungphitak <br />
                Student ID: 66085923 <br />
                Section : L002 <br />
                learning at sripatum university</b>
            </div>
            <div className='right-side'>
                <span><b>This website are a part of CSI-205 course this web is <br /> 
                    develop with react + vite</b> 
                </span>
                <span><img src={Working} alt="" style={{width:'400px'}}/></span>
            </div>
        </div>
     );
}

export default Home;