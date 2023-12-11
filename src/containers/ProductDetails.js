import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, removeSelectedProduct } from "../redux/actions/productsActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [cartCount, setCartCount] = useState(0);
  const [itemAdded, setItemAdded] = useState(false);
  const product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;
  const dispatch = useDispatch();

  const fetchProductDetail = async (id) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      dispatch(selectedProduct(response.data));
    } catch (error) {
      console.log("Error fetching product details: ", error);
    }
  };

  useEffect(() => {
    if (productId && productId !== "") {
      fetchProductDetail(productId);
    }
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);

    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = [...existingCartItems, { title, price }];

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      localStorage.setItem("userCartCount", JSON.stringify({ userEmail, cartCount }));
    }

    setItemAdded(true);
    setTimeout(() => {
      setItemAdded(false);
    }, 2000);

    toast.success(`${title} added to cart!`);
  };

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider"></div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} alt={title} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <button onClick={handleAddToCart} className="ui vertical animated button">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </button>
                {itemAdded && <p style={{ color: "green" }}>Item added to cart!</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default ProductDetails;
