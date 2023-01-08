import './TestProductUI.css';
import React, {useState, useEffect} from 'react';
import NewProductCard from '../NewProductCard/NewProductCard';
import * as api from "../../lenaHelpers/APIRequests.js";
import {
  LightgalleryProvider,
  LightgalleryItem,
} from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

export default function TestProductUI() {
    const [product, setProduct] = useState();
    const [photos, setPhotos] = useState({});

    useEffect(()=>{
        api.test().then((data) => setProduct(data));
    },[]);

    return (
        <>    
        <LightgalleryProvider>
            <div className={'container-tpui'}>
                <div className="col-md-6">
                    <div className="row g-3">
                        <div className="col-md-12 cards-tpui">
                            <NewProductCard 
                              data={product} 
                              isToBuy={true} 
                              showPrice={true} 
                              isTest={true} 
                              photos={photos}
                              setPhotos={setPhotos} />
                            <NewProductCard 
                              data={product} 
                              isToBuy={false} 
                              showPrice={true} 
                              isTest={true} 
                              photos={photos}
                              setPhotos={setPhotos}/>
                            <NewProductCard 
                              data={product} 
                              isToBuy={false} 
                              showPrice={false} 
                              isTest={true} 
                              photos={photos}
                              setPhotos={setPhotos}/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div hidden={true}>
            {Object.keys(photos).map((photoCollection, index)=>{
                return photos[photoCollection].map((item, innerIndex)=>{
                  return(
                  <LightgalleryItem key={index} group={photoCollection} src={item}>
                    <img src={item} style={{ width: "100%" }} alt={""}/>
                  </LightgalleryItem>
                  );
                })
              })
            }
        </div>

             
            </LightgalleryProvider>
        </>
    )
}
