import './SingleProductView.css';
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import * as api from "../../lenaHelpers/APIRequests.js";

const CardProductList = (props) => {
  const product = props.data;
  const [img64, setImg64] = useState('');

  useEffect(()=>{
    api.photo(product.id, product.category).then((data) => setImg64(data.img64));
  }, [product.category, product.id]);
  
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          {
            product.img ?
            <img src={ product.img } className="img-fluid" alt="..." />:
            <>
              <img src={`data:image/jpeg;base64,${img64}`} className="img-fluid" alt="..." />
            </>
          }
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle mr-2 d-inline">
              <Link to='/Products'  className="text-decoration-none">
                {product.name}
              </Link>
            </h6>
            {product.description &&
              product.description.includes("|") === false && (
                <p className="small mt-2">{product.description}</p>
              )}
            {product.description && product.description.includes("|") && (
              <ul className="mt-2">
                {product.description.split("|").map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className={"font-weight-bold h5 " + (props.canGoToBasket ? "" : "price-spv")}>
                {product.price}€
              </span>
            </div>
            { props.canGoToBasket ? (<div className="btn-group btn-block" role="group">
              <button
                type="button"
                className="btn btn-sm btn-primary base-button-color"
                title="Add to cart"
                onClick={()=>props.toBasket(product)}
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            </div>): <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
