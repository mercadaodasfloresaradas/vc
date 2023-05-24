import './NewProductCard.css';
import React, { useEffect, useState } from 'react';
import * as api from "../../lenaHelpers/APIRequests.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from 'react-spinners/BounceLoader';
import { MdOutlineZoomIn, MdRemoveShoppingCart } from 'react-icons/md';
import {
    useLightgallery,
  } from "react-lightgallery";
import Button from '../../lenaComponents/Button/Button';

export default function NewProductCard(props) {
    const product = props.data;
    const [img64, setImg64] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);

    const { openGallery } = useLightgallery();

  useEffect(()=>{
    if(product &&  product.id && product.category){
        setIsLoading(true);
        const callback = (data) => {
            if(data && data.img64){
                setImg64(data.img64);
            }

            setIsLoading(false);
        }
        console.log(props.isTest);
        if(props.isTest){
            api.testPhoto().then(callback);
        }else{
            api.photo(product.id, product.category).then(callback);
        }
    }
  }, [product]);

  useEffect(()=>{
    if(img64 && !props.photos[product.id]){
        props.setPhotos({...props.photos, [product.id]: [`data:image/jpeg;base64,${img64}`]});
    }

    const height = document.querySelector('.description-container-npc.' + product.id).offsetHeight;
    if(height >= 119){
        console.log(height);
        setIsScrollable(true);
    }
  }, [img64]);

  return (
    <>
        <div className={'card-npc'}>
            <div className={'container-npc'}>
                <div className="container-img-npc" onClick={()=>{
                                                    img64 && !isLoading && openGallery(product.id)    
                                                    }}>
                                                    
                    {
                        isLoading ? <LoadingOverlay
                            active={isLoading}
                            spinner={<PuffLoader color="#36d7b7" />}
                            className="loading-npc"></LoadingOverlay> :
                            <>
                                <img src={`data:image/jpeg;base64,${img64}`} className="img-fluid img-npc" alt="..." />
                                <div className="zoom-container-npc">
                                    <MdOutlineZoomIn className="zoom-npc"/>
                                </div>
                            </>                                
                    }
                </div>
                <div className={'description-name-npc item-npc text-container-npc'}>
                    <h4>{ product ? product.name : '' }</h4>
                    <div className={"description-container-npc " + product.id + (isScrollable ? " scroll-npc" : "")} >
                        <p>{ product ? product.description : '' }</p> 
                    </div>
                </div>
                {props.showPrice ? (
                    <div className={'buy-npc'}>
                        <p>{(product ? product.price : 0) + '€'}</p>
                        {props.isToBuy ? (
                            <Button content={
                                <FontAwesomeIcon icon={faCartPlus} />
                                }
                                onClick={()=>props.toBasket ? props.toBasket(product) : ()=>{}}
                            />
                        ): (
                            props.isToRemove ? (
                                <Button content={
                                    <MdRemoveShoppingCart />
                                    }
                                    onClick={()=>props.toRemove ? props.toRemove(product) : ()=>{}}
                                />
                            ) : (<></>)
                        )}
                    </div>
                ) : (
                    <div className="empty-npc">
                    </div>
                )}
            </div>
        </div>
        
    </>
  )
}