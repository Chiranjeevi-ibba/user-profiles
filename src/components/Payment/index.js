import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

export default function Payment() {
    return (
        <>
        <div className="payment-container">
            <img src="https://i.ibb.co/xL1qPdj/Vector.png" alt="payment sucessfull" />
            <h1 className="payment-text">Payment Successful</h1>
            <p className="payment-para-text">
                Thank you for ordering Your payment is successfully completed.
            </p>

            <Link to="/">
                <button className="goto-home-btn" type="button">
                    Go to Home Page
                </button>
            </Link>
        </div>
        </>
    )
}
