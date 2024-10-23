import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar({ tab, setTab, products, carts ,setToken}) {
    return (
        <div className='navbar-container'>
            <Link to={'/Home'}>
                <button className={'btn ' + (tab === 'home' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => { setTab('home') }}>
                    Home
                </button>
            </Link>

            <Link to={'/Animation'}>
                <button className={'btn ' + (tab === 'animation' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => { setTab('animation') }}>
                    Animation
                </button>
            </Link>

            <Link to={'/Todo'}>
                <button className={'btn ' + (tab === 'todo' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => { setTab('todo') }}>
                    Todo
                </button>
            </Link>

            <Link to={'/Component'}>
                <button className={'btn ' + (tab === 'component' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => { setTab('component') }}>
                    Component
                </button>
            </Link>

            <Link to={'/Calculator'}>
                <button className={'btn ' + (tab === 'calculator' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => { setTab('calculator') }}>
                    Calculator
                </button>
            </Link>
            <Link to={'/Product'}>
                <button className={'btn ' + (tab === 'product' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => { setTab('product') }}>
                    Products({products.length})
                </button>
            </Link>
            <Link to={'/Cart'}>
                <button className={'position-relative btn ' + (tab === 'cart' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => { setTab('cart') }}>
                    Carts
                    {carts.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {carts.length < 10 ? carts.length : '9+'}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    )}
                </button>
            </Link>
        
                <button className= 'btn btn-outline-danger'
                    onClick={() => { setToken('') }}>
                    Logout
                </button>
        </div >
    );
}

export default Navbar;