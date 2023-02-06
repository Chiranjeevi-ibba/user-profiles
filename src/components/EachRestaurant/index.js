import React, { useEffect, useReducer } from 'react'
import { useParams } from "react-router-dom";
import jsCookie from "js-cookie"
import { AiFillStar } from 'react-icons/ai'
import { BiRupee } from 'react-icons/bi'
import { ThreeDots } from "react-loader-spinner";
import EachDishDesign from '../EachDishDesign';
import "./index.css"

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default function EachRestaurant() {
  const restauranrId = useParams().id;
  // console.log(restauranrId);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { apiStatus: apiStatusConstants.initial, restaurantData: [], itemsList: [] }
  );
  const jwtToken = jsCookie.get("jwt_token");
  const RESTAURANT_DETAILS_URL = `https://apis.ccbp.in/restaurants-list/${restauranrId}`;

  useEffect(() => {
    const dataFetch = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      setState({ apiStatus: apiStatusConstants.inProgress });

      const response = await fetch(RESTAURANT_DETAILS_URL, options);
      if (response.ok === true) {
        const data = await response.json()
        const updatedData = {
          costForTwo: data.cost_for_two,
          cuisine: data.cuisine,
          id: data.id,
          imageUrl: data.image_url,
          itemsCount: data.items_count,
          location: data.location,
          name: data.name,
          opensAt: data.opens_at,
          rating: data.rating,
          reviewsCount: data.reviews_count,
        }
        const updatedItemsList = data.food_items.map(each => ({
          cost: each.cost,
          foodType: each.food_type,
          id: each.id,
          imageUrl: each.image_url,
          name: each.name,
          rating: each.rating,
        }))

        setState({ restaurantData: updatedData, itemsList: updatedItemsList, apiStatus: apiStatusConstants.success })
      } else {
        setState({ apiStatus: apiStatusConstants.failure });
      }
    }
    dataFetch()
  }, [jwtToken, RESTAURANT_DETAILS_URL])

  const { restaurantData, itemsList } = state;
  const {
    imageUrl,
    name,
    cuisine,
    location,
    rating,
    reviewsCount,
    costForTwo,
  } = restaurantData


  const renderOnSuccess = () => {
    return (
      <div className='restaurant-outer-ul-cont'>
        <ul className='restaurant-dishes-cont'>
          {itemsList.map(each => (
            <EachDishDesign key={each.id} eachDish={each} />
          ))}
        </ul>
      </div>
    )
  }

  const renderOnFaliure = () => {
    return (
      <div className="failure-container">
        <img className='failiure-view-image' src={require("../../Resources/failure-view.png")} alt="failure view" />
        <h1 className="oops-text">Oops! Something Went Wrong</h1>
        <h4 className="try-again-text">We are having some trouble processing your request. Please try again.</h4>
      </div>
    )
  }

  const renderOnLoading = () => {
    return (
      <div className="loading-container">
       <ThreeDots height={50} width={50} color="#f7931e" />
      </div>
    )
  }

  const renderAllProducts = () => {
    const { apiStatus } = state;
    // console.log(apiStatus);

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderOnSuccess();
        break;
      case apiStatusConstants.failure:
        return renderOnFaliure();
        break;
      case apiStatusConstants.inProgress:
        return renderOnLoading();
        break;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='restaurant-banner'>
        <div className='inner-restaurant-banner'>
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-banner-image"
          />
          <div className="restaurant-details-container">
            <h1 className="r-name-text">{name}</h1>
            <p className="r-cuisine-text">{cuisine}</p>
            <p className="r-location-text">{location}</p>

            <div className="rating-two-cost-container">
              <div className="star-rating-container">
                <p className="r-star-money-text">
                  <AiFillStar /> {rating}
                </p>
                <p className="r-location-text">{reviewsCount}+ ratings</p>
              </div>
              <img
                className="line-style"
                src="https://i.ibb.co/19h18cL/Line-6.png"
                alt="line"
              />
              <div className="two-cost-0container">
                <p className="r-star-money-text">
                  <BiRupee /> {costForTwo}
                </p>
                <p className="r-location-text">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderAllProducts()}
    </div>
  )
}
