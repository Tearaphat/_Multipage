import './Cart.css'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function cart({carts, setCarts}) {
    return (  
        <div className="carts-container">
            <div className="carts-item-container">
                {carts.map((cart) => {
                    return (<Card style={{ width: '18rem' }} key = {cart.id}>
                        <Card.Img variant="top" src={cart.thumbnailUrl} />
                        <Card.Body>
                            <Card.Title>{cart.title}</Card.Title>
                            <Card.Text>
                                <b>{cart.price.toFixed(2)}</b>
                            </Card.Text>
                            <Button variant="outline-danger" onClick={() => {
                                setCarts(carts.filter((c) => c.id !== cart.id))
                            }}>Remove From Carts</Button>
                        </Card.Body>
                    </Card>)
                })}

            </div>
        </div>
    );
}

export default cart;