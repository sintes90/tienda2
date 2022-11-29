import React from 'react';
import Link from 'next/link';

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>MID TEXT</h3>
        <h1>LARGE TEXT</h1>
        <img src="https://www.marsgaming.eu/uploads/_thumnails/mh4v2_960x960.png" alt="headphones" className="hero-banner-image"/>
      
        <div>
          <Link href={"/product/ID"}>
            <button type="button">BUTTON TEXT</button>
          </Link>
          
          <div className="desc">
            <h5>Description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner