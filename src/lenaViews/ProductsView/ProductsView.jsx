
import './ProductsView.css';
import React, { lazy, useState, useEffect } from "react";
import * as api from "../../lenaHelpers/APIRequests.js";
import * as storage from '../../lenaHelpers/LocalStorage.js';
import { useMediaQuery } from 'react-responsive';
import { getCSSQuery } from '../../lenaHelpers/Helpers';
import NotifyNewProduct from "../NotifyNewProduct/NotifyNewProduct";
import ProductsContainer from '../../lenaComponents/ProductsContainer/ProductsContainer';
import Header from '../../lenaComponents/Header/Header';

import "lightgallery.js/dist/css/lightgallery.css";

const CategoryView = lazy(() => import("../../lenaComponents/CategoryView/CategoryView"));
const CardServices = lazy(() => import("../../lenaComponents/ServicesView/ServicesView"));
const Basket = lazy(() =>
  import("../../lenaViews/Basket/Basket")
);

export default function ProductsView(props) {
        const [totalItems, setTotalItems] = useState(0);
        const [selectedCategory, setSelectedCategory] = useState('');
        const [updateBasket, setUpdateBasket] = 
            useState((storage.getBasket() ?? []).length);

        const [delivery, setDelivery] = useState(0);
        const [support, setSupport] = useState(0);
        const [returns, setReturns] = useState(0);
        
        const [isShowingNotification, setIsShowingNotification] = useState(false);

        const isMD = getCSSQuery(useMediaQuery, 'md');
        const isSMD = getCSSQuery(useMediaQuery, 'smd');

      useEffect(() => {
        api.config('delivery').then((conf)=>{
          setDelivery(conf.config);
        });

        api.config('support').then((conf)=>{
            setSupport(conf.config);
        });

        api.config('returns').then((conf)=>{
            setReturns(conf.config);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);      

    return (
        <React.Fragment>
          <Header
            title={"Produtos"}
            updateBasket={updateBasket}
            img={"url(../../images/LenaTestProducts/banner.png)"}
            upLink={{
                link: "/ViewBasket", 
                content: <Basket updateBasket={updateBasket} isProductsSMD={isSMD} />
              }}
            downLink={{
                link: "/FollowPurchase", 
                content: <>
                          Acompanhar {isSMD ? <br/> : <></>} Encomenda
                        </>
              }}
          />
         <div className={'columns-container-pv' + (isMD ? " column-1-pv" : "")}>
            <div>
                <CategoryView setCategory={setSelectedCategory} setIsLoading={props.setIsLoading} />
                {isMD ?
                <>
                  <div>
                    <span className="category-pv">
                      <span className="text-warning-pv">
                        {totalItems} na categoria{" "}
                        {selectedCategory.replace("categoria", "").replace("Categoria", "")}
                      </span>
                    </span>
                    <hr />
                    <div className='products-pv'>
                      <ProductsContainer 
                          selectedCategory={selectedCategory} 
                          setIsLoading={props.setIsLoading}
                          setTotalItems={setTotalItems}
                          setUpdateBasket={setUpdateBasket}
                          updateBasket={updateBasket}
                          setIsShowingNotification={setIsShowingNotification}
                          />
                    </div>
                    <hr />
                  </div>
                  <CardServices
                      delivery={delivery}
                      support={support}
                      returns={returns}
                      /> 
                </> 

                 : <CardServices
                  delivery={delivery}
                  support={support}
                  returns={returns}
                  />}
            </div>
            {isMD ? <></>: 
            <div>
              <span className="category-pv">
                <span className="text-warning-pv">
                  {totalItems} na categoria{" "}
                  {selectedCategory.replace("categoria", "").replace("Categoria", "")}
                </span>
              </span>
              <hr />
              <div className='products-full-pv'>
                <ProductsContainer 
                    selectedCategory={selectedCategory} 
                    setIsLoading={props.setIsLoading}
                    setTotalItems={setTotalItems}
                    setUpdateBasket={setUpdateBasket}
                    updateBasket={updateBasket}
                    setIsShowingNotification={setIsShowingNotification}
                    />
              </div>
              <hr />
            </div>
            } 
         </div>
         <div className='space-pv'></div>
          {
            isShowingNotification ?
            <NotifyNewProduct count={updateBasket} setIsShowing={setIsShowingNotification}/>:
            <></>

          }
        </React.Fragment>
    )
}
