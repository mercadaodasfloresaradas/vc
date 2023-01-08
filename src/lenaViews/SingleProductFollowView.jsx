import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const CardProductList = (props) => {
  const product = props.data;
  
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-2 text-center">
          <img src={ product.img } className="img-fluid" alt="..." />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h6 className="card-subtitle mr-2 d-inline">
              <Link to='/Products'  className="text-decoration-none">
                {product.name}
              </Link>
            </h6>
          </div>
        </div>
        <div className="col-md-1">
          <div className="card-body">
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
