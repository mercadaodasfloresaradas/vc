import React, { lazy, useState, useEffect } from "react";
import * as api from "../../lenaHelpers/APIRequests.js";
import {
    LightgalleryProvider,
    LightgalleryItem
} from "react-lightgallery";
import * as storage from '../../lenaHelpers/LocalStorage.js';

import "./ProductsContainer.css";

const NewProductCard = lazy(() =>
    import("../../lenaViews/NewProductCard/NewProductCard")
);

export default function ProductsContainer(props) {
    const [products, setProducts] = useState([]);
    const [photos, setPhotos] = useState({});

    const { 
        selectedCategory = "***", 
        setTotalItems = () => {}, 
        setUpdateBasket = () => {},
        updateBasket = 0,
        setIsShowingNotification = () => {},
        productsInjected= [],
        isToBuy = true,
        showPrice = true,
        noMargin = false,
        toRemove= ()=>{},
        isToRemove= false,
    } = props;

    console.log("");
    useEffect(() => {
        if(selectedCategory !== "***"){
            getProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);
    
    useEffect(() => {
        if(productsInjected.length !== 0){
            setProducts(productsInjected);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsInjected]);

    function getProducts() {
        //setIsLoading(true);

        api.products(selectedCategory).then((data) => {
            if(data && data.length){
                const totalItemsTemp = data.length;
                setProducts(data);
                setTotalItems(totalItemsTemp);
            }
            //setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            //setIsLoading(false);
        });
    };

    function toBasket(product) {
        const limit = +storage.getOrdersLimit() ?? 20;
        const updateBasketTemp = updateBasket + 1;

        if(updateBasketTemp <= limit){
          storage.addProductToBasket(product);
          setUpdateBasket(updateBasketTemp);
          setIsShowingNotification(true);
        }
      }
    
    return (
        <div className={"container-pc" + (noMargin ? " no-margin-pc" : "")}>
            <div className="container-inner-pc">
                <LightgalleryProvider>
                    {products.map((product, idx) => {
                        return (
                            <div className="product-pc" key={idx}>
                                <NewProductCard
                                    data={product}
                                    toBasket={toBasket}
                                    isToBuy={isToBuy}
                                    showPrice={showPrice}
                                    photos={photos}
                                    setPhotos={setPhotos}
                                    toRemove={toRemove}
                                    isToRemove={isToRemove}
                                />
                            </div>
                        );
                    })
                    }

                    <div hidden={true}>
                        {Object.keys(photos).map((photoCollection, index) => {
                            return photos[photoCollection].map((item, innerIndex) => {
                                return (
                                    <LightgalleryItem key={index} group={photoCollection} src={item}>
                                        <img src={item} style={{ width: "100%" }} alt={""} />
                                    </LightgalleryItem>
                                );
                            })
                        })
                        }
                    </div>
                </LightgalleryProvider>
            </div>
        </div>
    )
}
