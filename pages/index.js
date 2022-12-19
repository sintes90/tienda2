import React from 'react';
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products }) => {

  return (
    <>
      <HeroBanner id={products}/>
      <div className="products-heading">
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {/*['product1', 'product2'].map((product) => product)*/}
        {/* products?.map //estaba asi */}
        {products.map((product) => <Product key={product.id} product={product} />)}
      </div>
      <FooterBanner />
    </>
  )
}

export const getServerSideProps = async () => {
  
  //Test with real data from docker and sql server.
  const res = await fetch('http://localhost/products');
  const products = await res.json();
  //console.log(products);

  return {
    props: { products }
  }

  //Test with static data.
  // return {
  //   props: {
  //     products: [
  //       {
  //         id: 1,
  //         name: 'product1',
  //         price: 100,
  //         image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg',
  //         description: 'product1 description',
  //       },
  //       {
  //         id: 2,
  //         name: 'product2',
  //         price: 200,
  //         image: 'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs',
  //         description: 'product2 description',
  //       },
  //       {
  //         id: 3,
  //         name: 'product3',
  //         price: 300,
  //       }
  //     ]
  //   }
  // }
}

export default Home;