
import './Product.css'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Product({products, carts, setCarts}) {
    return (
        <div className='product-container'>
            <div className="product-item-container">
                {products.map((product) => {
                    return (<Card style={{ width: '18rem' }} key = {product.id}>
                        <Card.Img variant="top" src={product.thumbnailUrl} />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>
                                <b>{product.price.toFixed(2)}</b>
                            </Card.Text>
                            {carts.find ((cart) => cart.id === product.id) ? 
                            (<span className='badge bg-danger'>Added</span>)
                            : (
                            <Button variant="outline-primary" onClick={() => {
                                setCarts([...carts, product])
                            }}>Add to Carts</Button>
                            )}
                        </Card.Body>
                    </Card>)
                })}
            </div>
            <h4>Item: <span className='badge text-bg-danger'>{carts.length}&nbsp;Items</span> - Total Price:&nbsp;<span className='badge text-bg-success'>${carts.reduce((prev,cart) => {return prev + cart.price},0).toFixed(2)}</span></h4>
        </div>
    );
}

export default Product;