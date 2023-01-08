import './Basket.css'
import React, {useState, useEffect} from 'react';
import { BsBasket2Fill } from 'react-icons/bs';
import * as storage from '../../lenaHelpers/LocalStorage.js';
import { useNavigate } from "react-router-dom";

export default function Basket(props) {
    const [basketCount, setBasketCount] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        setBasketCount(storage.getBasket().length);
    },[props.updateBasket]);

    const goToBasket = () =>{
        if(basketCount > 0){
            navigate('/ViewBasket');
        }
    }

    const responsiveAlert = () =>{
        if(props.isProductsSMD){
            return "alert-products-view-bk";
        }else if(props.isFollowMD){
            return "alert-follow-view-bk";
        }

        return ""
    }

  return (
    <div className='container-bk' onClick={goToBasket}>
        <BsBasket2Fill/>
        {
            basketCount > 0 ?
            <div className={'alert-bk ' + responsiveAlert()}>
                {basketCount}
            </div>:
            <></>
        }
    </div>
  )
}
