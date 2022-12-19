import React, { useEffect, useState } from 'react';
import Link from 'next/link';


const HeroBanner = () => {
  
  const [imgHerobanner, setImgHerobanner] = useState();
  
  //petition to get the image from the database and set it to the state.
  useEffect(() => {
      fetch('http://localhost/products/4')
      .then(res => res.json())
      .then(data => {
        setImgHerobanner(data);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>MID TEXT</h3>
        <h1>LARGE TEXT</h1>
        <img src={imgHerobanner?.herobanner} alt="headphones" className="hero-banner-image"/>
      
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