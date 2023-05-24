import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import * as api from "../../lenaHelpers/APIRequests";
import { useMediaQuery } from 'react-responsive';
import { getCSSQuery } from '../../lenaHelpers/Helpers';

import "./CategoryView.css"

const FilterCategory = (props) => {
  const [categories, setCategories] = useState([]);

  const isMD = getCSSQuery(useMediaQuery, 'md');

  useEffect(()=>{
    props.setIsLoading(true);
    api.categories().then((data)=>{
      setCategories(data);
      if(data.length){
        props.setCategory(data[0]);
      }
      props.setIsLoading(false);
    }).catch((err)=>{
      console.log(err);
      props.setIsLoading(false);
    }); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card mb-3 card-cv">
      <div className="card-header font-weight-bold text-uppercase">
        Categorias
      </div>
      <ul className={"list-group list-group-flush" + (isMD ? " scrollable-cv" : "")}>
        
        {categories.map((category, index)=>{
          return(
            <li className="list-group-item" key={index}>
              <Link onClick={()=>{
                  props.setCategory(category);
                }} to="/Products" className="text-decoration-none stretched-link">
                 {category}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterCategory;
