import React from 'react';
import { getCSSQuery } from '../../lenaHelpers/Helpers';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from "react-router-dom";

import "./Header.css";
import HeaderButtons from '../HeaderButtons/HeaderButtons';
export default function Header(props) {

    const { 
        img = "url(../../images/LenaTestProducts/banner.png)", 
        upLink = { link: "", content: ""}, downLink = { link: "", content: "" },
        title = "",
    } = props;

    const isSMD = getCSSQuery(useMediaQuery, 'smd');
    const isMD = getCSSQuery(useMediaQuery, 'md');
    const navigate = useNavigate();


  return (
        <div
            className={"p-5 bg-primary bs-cover" + (isMD? " less-padding-h" : "")}
            style={{
              backgroundImage: img,
            }}
          >
            <div className="container text-center container-header-h">
                <span 
                  className="display-5 px-3 bg-white rounded shadow clickable-title-h"
                  onClick={()=>navigate("/")}
                  >
                  {title}
                </span>
                <div className={(isSMD? "actions-smd-h" : "actions-md-h")}>
                  <HeaderButtons upLink={upLink} downLink={downLink}/>
                </div>
            </div>
        </div>
  )
}
