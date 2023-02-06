import React from 'react'
import jsCookie from "js-cookie";
import axios from "axios";
import { useEffect } from 'react'
import "./index.css"
import { useReducer } from 'react';
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import PopularRestaurantsDesign from '../PopularRestaurantsDesign';
import { ThreeDots } from "react-loader-spinner";

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}


export default function PopularRestaurants() {

    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { apiStatus: apiStatusConstants.initial, restaurantsList: [], activePage: 1, activeSort: "Lowest", activeSearch: "" }
    );
    const {activePage, restaurantsList,} = state

    const LIMIT = 12
    const OFFSET = (activePage - 1) * LIMIT
    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list?offset=${OFFSET}&limit=${LIMIT}`
    const jwtToken = jsCookie.get("jwt_token")

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }
        setState({ apiStatus: apiStatusConstants.inProgress });

             axios.get(restaurantsUrl, options)
            .then(response => {
                if (response.status === 200) {
                    const updatedRestaurants = response.data.restaurants.map(each => ({
                        costForTwo: each.cost_for_two,
                        cuisine: each.cuisine,
                        groupByTime: each.group_by_time,
                        hasOnlineDelivery: each.has_online_delivery,
                        hasTableBooking: each.has_table_booking,
                        id: each.id,
                        imageUrl: each.image_url,
                        isDeliveringNow: each.is_delivering_now,
                        location: each.location,
                        menuType: each.menu_type,
                        name: each.name,
                        opensAt: each.opens_at,
                        userRating: {
                            rating: each.user_rating.rating,
                            ratingColor: each.user_rating.rating_color,
                            ratingText: each.user_rating.rating_text,
                            totalReviews: each.user_rating.total_reviews,
                        },
                    }))
                    setState({ restaurantsList: updatedRestaurants, apiStatus: apiStatusConstants.success })
                } else {
                    setState({ apiStatus: apiStatusConstants.failure })
                }

            })
    }, [activePage, jwtToken, restaurantsUrl])

    const onClickLeftArrow = () => {
        if(activePage > 1) {
            setState({activePage: activePage - 1})
        }
    }

    const onClickRightArrow = () => {
        if (activePage < 3) {
            setState({activePage: activePage + 1})
        }
    }

    const renderOnSuccess = () => {
        return (
           <>
            <ul className='restaurants-ul'>
                {restaurantsList.map(each => (
                    <PopularRestaurantsDesign eachRestaurant={each} key={each.id} />
                ))}
            </ul>
            <div className='pagination-cont'>
                <button onClick={onClickLeftArrow} className='left-arrow' type='button'>
                    <AiOutlineLeft />
                </button>
                <h3 className='active-page'>{activePage} of 3</h3>
                <button onClick={onClickRightArrow} className='right-arrow' type='button'>
                    <AiOutlineRight />
                </button>
            </div>
           </>
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

      const { apiStatus } = state;
      console.log(apiStatus);

      const renderAllProducts = () => {
        const { apiStatus } = state;
    
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
        <div className='popular-restaurant-cont'>
            <div className='inner-popular-restaurant-cont'>
                <div>
                    <h1 className='popular-restaurant-text'>Popular Restaurants</h1>
                    <h3 className='select-your-fav-text'>Select Your favourite restaurant special dish and make your day happy...</h3>
                </div>
                <div className='select-sort-cont'>
                    Sort by
                    <select className='sort-by'>
                        <option value="Lowest">Lowest</option>
                        <option value="Highest">Highest</option>
                    </select>
                </div>
            </div>
            <div>
                {renderAllProducts()}
            </div>
        </div>
    )
}
