import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductComponents = () => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    const { id, title, image, price, category } = product;
    return (
      <div className="four wide column" key={id} >
        <Link to={`/product/${id}`}>
          <div className="ui link cards" style={{height:"550px",width:"350px",padding:"30px" ,marginRight:"20px"}}>
            <div className="card" style={{ height:"500px", marginRight:"20px"}}>
              <div className="image" style={{marginRight:"20px"}}>
                <img src={image} alt={title} style={{ width: '250px', height: '300px' }}/>
              </div>
              <div className="content" style={{marginRight:"20px"}}>
                <div className="header">{title}</div>
                <div className="meta price">$ {price}</div>
                <div className="meta">{category}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponents;