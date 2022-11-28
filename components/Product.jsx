import React from 'react';
import Link from 'next/link';

const Product = ({product: { image, name, slug, price }}) => {
  return (
    <div>
      <Link href={'/product/${slug.current}'}>
        <div className="product-card">
          <img
            //src={"https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg"}
            src={image}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product