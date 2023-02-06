import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart, selectAllCartItems } from '../../redux/cartSlice';
import CartItemDesign from '../CartItemDesign';
import Navbar from '../Navbar'
import "./index.css"

export default function Cart() {
  const data = useSelector(selectAllCartItems);
  const dispatch = useDispatch();


  const renderCartItems = () => {
    if (data.length > 0) {
      // const totalCost = data.map(each => )
      let totalCost = 0;

      data.map(each => totalCost += each.cost*each.quantity);

      console.log(totalCost);

      return (
        <div className='inner-cart-cont'>
          <ul className='cart-ul'>
            <li className='cart-heading-li'>
              <h3 className='h-item'>Item</h3>
              <h3 className='h-quantity'>Quantity</h3>
              <h3 className='h-price'>Price</h3>
            </li>
            {data.map(each => (
              <CartItemDesign eachItem={each} key={each.id} />
            ))}
          </ul>
          <div className='outer-order-total-cont'>
            <div className='order-total'>
              <h3>Order Total:</h3>
              <div className='totalcost-ordr-btn-cont'>
                <h3>&#x20b9; {totalCost}</h3>
                <Link to="/payment">
                  <button onClick={() => {dispatch(emptyCart())}} className='place-order-btn'>Place Order</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='no-orders-cont'>
          <img className='no-orders-image' src="https://i.ibb.co/2WKQwLT/cooking-1.png" alt="NO Orders" />
          <h1 className='no-orders-text'>No Orders Yet</h1>
          <p className='your-cart-para-text'>Your cart is empty. Add something from the menu</p>
          <Link to="/">
            <button className='order-now-btn'>Order Now</button>
          </Link>
        </div>
      )
    }
  }

  return (
    <div className='main-cart-cont'>
      <div>
        {renderCartItems()}
      </div>
    </div>
  )
}
