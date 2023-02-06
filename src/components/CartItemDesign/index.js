import React from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { addCartItem, deleteCartItem } from '../../redux/cartSlice';
import "./index.css"

export default function CartItemDesign(props) {
    const {eachItem} = props;
    const {imageUrl, cost, name, quantity, id} = eachItem;
    const dispatch = useDispatch();

    const onClickIncreaseBtn = () => {
        dispatch(addCartItem(eachItem));
      }
  
      const onClickDecreaseBtn = () => {
        dispatch(deleteCartItem({id}));
      }

  return (
    <div>
        <li className='each-cart-li'>
            {/* Desktop view */}
            <div className='cart-items-desktop-view'>
            <div className='cart-image-name-cont'>
                <img className='cart-image' src={imageUrl} alt={name}  />
                <p className='cart-item-name'>{name}</p>
            </div>
            <div className='cart-quantity-controller'>
                <div onClick={onClickDecreaseBtn}> <BsDashSquare /> </div>
                <div className='cart-quantity-amount'>{quantity}</div>
                <div onClick={onClickIncreaseBtn}> <BsPlusSquare /> </div>
            </div>
            <div className='cart-each-item-toal-price'>
                <p className='cart-each-item-price'>&#x20b9; {cost*quantity}</p>
            </div>
            </div>
            {/* MObile view */}
            <div className='cart-items-mobile-view'>
                <img className='cart-image' src={imageUrl} alt={name}  />
                <div className='mb-inner-cart-items-cont'>
                    <p className='cart-item-name'>{name}</p>
                    <div className='mb-cart-quantity-controller'>
                        <div onClick={onClickDecreaseBtn}> <BsDashSquare /> </div>
                        <div className='cart-quantity-amount'>{quantity}</div>
                        <div onClick={onClickIncreaseBtn}> <BsPlusSquare /> </div>
                    </div>
                    <p className='cart-each-item-price'>&#x20b9; {cost*quantity}</p>
                </div>
            </div>
        </li>
    </div>
  )
}
