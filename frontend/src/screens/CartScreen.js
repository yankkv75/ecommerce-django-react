import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image,  Button, Card } from 'react-bootstrap';

import Message  from '../components/Message';
import { addToCart, deleteCart } from '../actions/cartActions';


function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const quantity = location.search ? Number(location.search.split('=')[1]) : '1'
    
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity ))
        }
    }, [dispatch, productId, quantity] )

    const deleteFromCartHandler = (id) => {
        dispatch(deleteCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Cart is empty <Link to='/' className='text-link'>Go Back</Link>
                    </Message>
                ) :(
                    <ListGroup variant = 'flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Link to={`/product/${item.product}`}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Link>
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`} className='text-link'>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    
                                    <Col md={3}>
                                        QTY: {item.quantity}
                                    </Col>

                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={() => deleteFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item ) => acc + item.quantity, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <div className="d-grid gap">
                                <Button 
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}    
                                >
                                    Proceed To Checkout
                                </Button>
                            </div>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
