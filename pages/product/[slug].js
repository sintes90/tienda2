import React from 'react'
import { Product } from '../../components';
import {useRouter} from 'next/router';

const ProductDetails = ({ product }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const { name, price, details, image } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={image} alt={name} />

          </div>
          {/* <div className="small-images-container">
            <img src={image} alt={name} />
            <img src={image} alt={name} />
            <img src={image} alt={name} />
          </div> */}
          <div className="product-details-desc">
            <h1>{name}</h1>
            <div className="reviews">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export const getStaticPaths = async () => {
  return{
    paths: [],
    fallback: true
  }
}

export const getStaticProps = async () => {
  return {
    props: {
      product: {
        id: 1,
        name: 'product1',
        price: 100,
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg'
      }
    }
  }

}

export default ProductDetails;