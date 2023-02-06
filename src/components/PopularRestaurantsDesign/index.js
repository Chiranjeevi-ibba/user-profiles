import React from 'react'
import {AiFillStar, AiFillSound} from "react-icons/ai"
// import {HiReceiptPercent} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import './index.css'

export default function PopularRestaurantsDesign(props) {
    const {eachRestaurant} = props
    const {id, cuisine, name, imageUrl, userRating, costForTwo} = eachRestaurant
    const {rating, totalReviews, ratingColor} = userRating

    // console.log(eachRestaurant);

  return (
    <Link to={`/restaurant/${id}`} className="each-res-linker">
      <li className='restaurant-li'>
          <img className='restaurant-image' src={imageUrl} alt={name} />
          <h3 className='restaurant-name'>{name}</h3>
          <p className='restaurant-cuisine'>{cuisine}</p>
          <div className='restaurant-ratings-cont'>
              <div className='rating-review-cont'>
                <div style={{backgroundColor: `#${ratingColor}`}} className='inner-rating-cont'>
                  <AiFillStar size={18} className='rating-icon' />
                  <h3 className='restaurant-rating'>{rating}</h3>
                </div>
                {/* <p className='restaurant-total-reviews'>({totalReviews} ratings)</p> */}
              </div>
              <h3 className='restaurant-cost-for-two'>Rs{costForTwo} FOR TWO</h3>
          </div>
          <div className='free-delivery-cont'>
            <AiFillSound />
            <h3 className='free-delivery-text'>Free delivery</h3>
          </div>
          <div className='quick-view-cont'>
            <h3 className='quick-view-text'>QUICK VIEW</h3>
          </div>
      </li>
    </Link>
   
  
  )
}





// <li className='restaurant-li'>
        
//         <img className='restaurant-image' src={imageUrl} alt={name} />
//        <div className='restaurant-details-cont'>
//            <h3 className='restaurant-name'>{name}</h3>
//            <p className='restaurant-cuisine'>{cuisine}</p>
//            <div className='restaurant-ratings-cont'>
//                <AiFillStar color={ratingColor} />
//                <h3 className='restaurant-rating'>{rating}</h3>
//                <p className='restaurant-total-reviews'>({totalReviews} ratings)</p>
//            </div>
//        </div>
//    </li>