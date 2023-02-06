import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai"
import { useState } from "react";
import jsCookie from "js-cookie";
import ReactTooltip from "react-tooltip";
import "./index.css";
import { useDispatch } from "react-redux";
import { onChangeJwtToken } from "../../redux/jwtTokenSlice";



export default function Navbar() {
  const [menu, setMenu] = useState(false);
  let navigate = useNavigate();
  let path = useLocation();
  const dispatch = useDispatch();

  let isHomeActive = path.pathname === "/" ? true : false;
  let isCartActive = path.pathname === "/cart" ? true : false;
  let hamburgerIcon = menu ? "is-active" : "";
  let mbView = menu ? "mb-view-open" : ""; 

  const homeStyle = isHomeActive ? "home-h-color" : ""
  const cartStyle = isCartActive ? "cart-h-color" : ""

  const onClickLogoutBtn = () => {
    jsCookie.remove('jwt_token')
    dispatch(onChangeJwtToken(undefined))
    navigate('/login')
  }

  // console.log(hamburgerIcon);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo-cont">
          <img src="https://i.ibb.co/BtDHXkn/Frame-274.png" alt="website logo" className="navbar-logo" />
          <h1 className="navbar-title">Tasty Kitchens</h1>
        </div>

        

        <div className="navbar-hamburger-icon-cont">
          {/* hamburger icon */}
          <div className={`hamburger ${hamburgerIcon}`} id="hamburger-1" onClick={() => setMenu(!menu)}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>

          <div className="navbar-desktop-view-cont">
            <ul className="dk-navbar-ul">
              <Link to="/" className="link">
                <li className={`dk-navbar-list-items ${homeStyle}`}>Home</li>
              </Link>
              <Link to="/cart" className="link">
                <li data-tip data-for="cart" className={`dk-navbar-list-items ${cartStyle}`}>Cart</li>
              </Link>
              <li className="dk-navbar-list-items">
                <button onClick={onClickLogoutBtn} className="logout-btn">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={`navbar-mobile-view-cont ${mbView}`}>
        <ul className="mobile-view-navbar-ul">
          <Link to="/" className="link">
            <li className={`mb-navbar-list-items ${homeStyle}`}>Home</li>
          </Link>
          <Link to="/cart" className="link">
            <li data-tip data-for="cart" className={`mb-navbar-list-items ${cartStyle}`}>Cart</li>
          </Link>
          <li className="mb-navbar-list-items">
            <button onClick={onClickLogoutBtn} className="logout-btn">Logout</button>
          </li>
        </ul>
      </div>
    </header>
  );
}

