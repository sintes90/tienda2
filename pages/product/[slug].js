import React from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
//import { Product } from '../../components';

import { useStateContext } from '../../context/StateContext';
import { useRouter } from 'next/router';


const ProductDetails = ({ product }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { name, price, details, image} = product;
  //const [index, setIndex] = useState(0);
  const {decQty, incQty, qty, onAdd} = useStateContext();


  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={image} alt={name} />
          </div>
          <div className="small-images-container">
            {/* {imgUrls?.map((item, i) => (
              <img 
                key={i}
                src={imgUrls}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))} */}
            <img className="small-image" src={image} alt={name} />
            <img className="small-image" src={image} alt={name} />
            <img className="small-image" src={image} alt={name} />
            <img className="small-image" src={image} alt={name} />
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/>
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus/></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus/></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" /*onClick=""*/>Buy Now</button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {/* {product.map((item) => (<Product key={item.id} product={item}/>))} */}
            <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} />
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
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg',
        details: 'Great lokking and sounding product',
      },
    }
  }

}

export default ProductDetails;