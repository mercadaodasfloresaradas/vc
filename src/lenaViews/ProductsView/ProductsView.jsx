
import './ProductsView.css';
import React, { lazy, useState, useEffect } from "react";
import * as api from "../../lenaHelpers/APIRequests.js";
import { useNavigate } from "react-router-dom";
import * as storage from '../../lenaHelpers/LocalStorage.js';
import { useMediaQuery } from 'react-responsive';
import { getCSSQuery } from '../../lenaHelpers/Helpers';
import {
  LightgalleryProvider,
  LightgalleryItem
} from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";
import NotifyNewProduct from "../NotifyNewProduct/NotifyNewProduct";
const Paging = lazy(() => import("../../components/Paging"));
const FilterCategory = lazy(() => import("../../lenaViews/CategoryView"));
const CardServices = lazy(() => import("../../lenaViews/ServicesView"));

const NewProductCard = lazy(() =>
  import("../NewProductCard/NewProductCard")
);

const Basket = lazy(() =>
  import("../../lenaViews/Basket/Basket")
);



export default function ProductsView(props) {
        const [totalItems, setTotalItems] = useState(0);
        const [view] = useState('list');
        const [currentProducts, setCurrentProducts] = useState([]);
        const [, setCurrentPage] = useState(null);
        const [products, setProducts] = useState([]);
        const [selectedCategory, setSelectedCategory] = useState('');
        const [updateBasket, setUpdateBasket] = 
            useState((storage.getBasket() ?? []).length);

        const [delivery, setDelivery] = useState(0);
        const [support, setSupport] = useState(0);
        const [returns, setReturns] = useState(0);
        
        const [isShowingNotification, setIsShowingNotification] = useState(false);

        const [photos, setPhotos] = useState({});

        const isMD = getCSSQuery(useMediaQuery, 'md');
        const isSMD = getCSSQuery(useMediaQuery, 'smd');

        const pageLimitDefault = 9;

      useEffect(() => {
        getProducts();

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

      useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [selectedCategory]);

      useEffect(() => {
        getCurrentProducts(1, 0, pageLimitDefault);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [products]);
    
      function onPageChanged(page) {
        const { currentPage, totalPages, pageLimit } = page;
        getCurrentProducts(currentPage, totalPages, pageLimit);
      };

      function getCurrentProducts(currentPage, totalPages, pageLimit){
        let productsTemp = products;
        if(productsTemp && productsTemp.length){
          const offset = (currentPage - 1) * pageLimit;
          const currentProductsTemp = productsTemp.slice(offset, offset + pageLimit);
      
          setCurrentPage(currentPage);
          setCurrentProducts(currentProductsTemp);
        }
      }
    
      /* function onChangeView(newView) {
        setView( view );
      }; */
    
      function getProducts (){
        props.setIsLoading(true);
        api.products(selectedCategory).then((data)=>{
          setProducts(data);
          if(data && data.length){
            const totalItemsTemp = data.length;
            setTotalItems(totalItemsTemp);
          }

          props.setIsLoading(false);
        }).catch((err)=>{
          console.log(err);
          props.setIsLoading(false);
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

      const Linker = (props) =>{
        const navigate = useNavigate();
        return(  <button
          type="button"
          className="btn btn-sm btn-primary base-button-color"
          title="navigate"
          onClick={()=>{navigate(props.route)}}
        >
        {props.text}
        </button>);
      }


    return (
        <React.Fragment>
        <LightgalleryProvider>
          <div
            className={"p-5 bg-primary bs-cover" + (isMD? " less-padding-pv" : "")}
            style={{
              backgroundImage: "url(../../images/LenaTestProducts/banner.png)",
            }}
          >
            <div className="container text-center container-header-pv">
              {isMD ? 
                  <></> :
                  <Linker text={'Acompanhar Encomenda'} route={'/FollowPurchase'}></Linker>}
              <span className="display-5 px-3 bg-white rounded shadow">
                Produtos
              </span>
              <div className={(isSMD? "actions-smd-pv" : "actions-md-pv")}>
                {isMD ? 
                  <Linker text={'Acompanhar Encomenda'} route={'/FollowPurchase'}></Linker> :
                   <></>}
                <Basket updateBasket={updateBasket} isProductsSMD={isSMD} />
              </div>
            </div>
          </div>
         
          <div className="container-fluid mb-3 products-for-margin-top">
            <div className="row">
              <div className="col-md-3">
                <FilterCategory setCategory={setSelectedCategory} setIsLoading={props.setIsLoading} />
                {isMD ? <></> : <CardServices
                  delivery={delivery}
                  support={support}
                  returns={returns}
                  />}
              </div>
              <div className="col-md-5">
                <div className="row">
                  <div className="col-md-8">
                    <span className="align-middle font-weight-bold total-per-category-text">
                      {totalItems} na categoria{" "}
                      <span className="text-warning">{selectedCategory}</span>
                    </span>
                  </div>
                </div>
                <hr />
                <div className="row g-3">
                  {view === "list" &&
                    currentProducts.map((product, idx) => {
                      return (
                        <div key={idx} className="col-md-12">
                          <NewProductCard 
                            data={product}  
                            toBasket={toBasket} 
                            isToBuy={true} 
                            showPrice={true}
                            photos={photos}
                            setPhotos={setPhotos}
                            />
                        </div>
                      );
                    })}
                    {isMD ? <CardServices
                                delivery={delivery}
                                support={support}
                                returns={returns}
                                /> : <></>}
                </div>
                <hr />
                <Paging
                  totalRecords={totalItems ?? 0}
                  pageLimit={pageLimitDefault}
                  pageNeighbours={3}
                  onPageChanged={onPageChanged}
                  sizing=""
                  alignment="justify-content-center"
                />
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
          {
            isShowingNotification ?
            <NotifyNewProduct count={updateBasket} setIsShowing={setIsShowingNotification}/>:
            <></>

          }
        </React.Fragment>
    )
}
