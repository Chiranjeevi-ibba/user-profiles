import React from "react";
import Navbar from "../Navbar";
import HomeOffersCarousel from "../HomeOffersCarousel";
import PopularRestaurants from "../PopularRestaurants";
import "./index.css"

export default function Home() {
  return (
    <section className="home-cont">
    <div className="inner-home-cont">
      <HomeOffersCarousel />
      <PopularRestaurants />
    </div>
    </section>
  );
}
