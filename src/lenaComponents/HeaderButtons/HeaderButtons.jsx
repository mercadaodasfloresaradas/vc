import React from 'react';
import { useNavigate } from "react-router-dom";


import "./HeaderButtons.css";

export default function HeaderButtons(props) {
    const { upLink = { link: "", content: ""}, downLink = { link: "", content: "" }} = props;

    const navigate = useNavigate();

  return (
    <div>
      <button className='up-button-hb'
        onClick={()=>{navigate(upLink.link)}}
      >
        {upLink.content}
      </button>
      <button className='down-button-hb'
        onClick={()=>{navigate(downLink.link)}}
      >
        {downLink.content}
      </button>
    </div>
  )
}
