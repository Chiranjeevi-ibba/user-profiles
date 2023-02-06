import React from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem, deleteCartItem } from '../../redux/cartSlice'
import "./index.css"

export default function EachDishDesign(props) {
    const {eachDish} = props
    const {cost, id, imageUrl, name, rating} = eachDish
    const dispatch = useDispatch();
    const data = useSelector((store) => store.cart)

    const addBtnChecker = data.find(each => each.id === id);
    // console.log(addBtnChecker);

    const onClickAddOrIncreaseBtn = () => {
      dispatch(addCartItem({...eachDish, quantity: 1}));
      // console.log(eachDish);
    }

    const onClickDecreaseBtn = () => {
      dispatch(deleteCartItem({id}));
      // console.log(eachDish);
    }

    const renderAddBtn = () => {
      if(addBtnChecker) {
        return (
          <div className='quantity-controller'>
            <div onClick={onClickDecreaseBtn}> <BsDashSquare /> </div>
            <div className='quantity-amount'>{addBtnChecker.quantity}</div>
            <div onClick={onClickAddOrIncreaseBtn}> <BsPlusSquare /> </div>
          </div>
        )
      }
      return <button className='add-btn' onClick={onClickAddOrIncreaseBtn}>ADD</button>
    }
    
    return (
        <li className="each-dish-container">
          <img className="each-dish-image" src={imageUrl} alt="food item" />
          <div className="each-dish-details">
            <h1 className="each-dish-name">{name}</h1>
            <p className="each-dish-cost">Rs {cost}/-</p>
            <div className="star-rating-cont">
                <AiFillStar className="star-icon" color="#FFCC00" />
                <p className="each-dish-rating">{rating}</p>
            </div>
            { renderAddBtn() }
          </div>
        </li>
      )
    }
