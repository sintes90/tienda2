import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
//import { Product } from '../../components';

import { useStateContext } from '../../context/StateContext';
import { useRouter } from 'next/router';


const ProductDetails = ({ product }) => {

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { name, price, details, image } = product;
  //const [index, setIndex] = useState(0);

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);

  }
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6CrJSeF81whn5Tbp9Ga-SkdPE_uoeubH7fJvK7Tlsicfjq-o0V5AQl5Q24ABSkiZ6kbk&usqp=CAU',
    'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/1200px-IMG_Academy_Logo.svg.png',
    'https://w7.pngwing.com/pngs/388/487/png-transparent-computer-icons-graphy-img-landscape-graphy-icon-miscellaneous-angle-text.png',
    'https://www.shutterstock.com/image-illustration/img-file-document-icon-trendy-260nw-1407027353.jpg',
    'https://us.123rf.com/450wm/mamun25g/mamun25g2206/mamun25g220602684/mamun25g220602684.jpg?ver=6',
    'https://www.shutterstock.com/image-vector/vector-line-icon-img-260nw-2050481222.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_B-bqbHdgkzvtgSJ_LfGGkT9fXPD27E7qQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSelBigqrdiZHkWeDVKxu-Tq2glyBX5QQFxYg&usqp=CAU',         
  ];

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={image} alt={name} />
          </div>
          <div className="small-images-container">
            {/*} {images.map((item, i) => (
              <img 
                key={i}
                src={item}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}  */}
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
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
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
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {/* {product.map((item) => (<Product key={item.id} product={item}/>))} */}
            {images.map((item, i) => (
              <img  key={i} src={item} width="150px"/>
            ))}
            {/* <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} />
            <img width='150px' src={image} alt={name} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}


export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps = async () => {

  return {
    props: {
      product: {
        id: 1,
        name: 'Product1',
        price: 100,
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg',
        details: 'Great lokking and sounding product',
        description: 'product1 description!',
      },
    }
  }


}

export default ProductDetails;