import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as api from "./lenaHelpers/APIRequests.js";
import * as storage from "./lenaHelpers/LocalStorage.js";

import Footer from "./lenaViews/Footer/Footer";
import NoService from "./lenaViews/NoService/NoService";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.min.css";
import './LenaCSS/LenaStyles.css';

import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from 'react-spinners/BounceLoader';

const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const HomeLenaView = lazy(() => import("./lenaViews/HomeView/HomeView"));
const ProductsView = lazy(() => import("./lenaViews/ProductsView/ProductsView"));
const BasketView = lazy(() => import("./lenaViews/BasketView/BasketView"));
const PlacedOrderView = lazy(() => import("./lenaViews/PlacedOrderView/PlacedOrderView"));
const FollowPurchaseView = lazy(() => import("./lenaViews/FollowPurchaseView/FollowPurchaseView"));
const TestProductUI = lazy(() => import("./lenaViews/TestProductUI/TestProductUI"));

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [showNoService, setShowNoService] = useState(false);

  useEffect(()=>{
    const repeatSignal = () =>{
      const noResponseTimeout = setTimeout(() => {
        setShowNoService(true);
      }, 2900);

      api.home().then((response)=>{
        if(response !== 'Home'){
          setShowNoService(true);
          
          const url = new URL(window.location.href);
          const rel = url.toString().substring(url.origin.length);
          
          if(rel !== '/'){
            window.location.href = '/';
          }
        }else{
          setShowNoService(false);
          clearTimeout(noResponseTimeout);
        }
        setTimeout(repeatSignal, 100000);
      });
    }

    repeatSignal();
    
    api.config('limitProducts').then((conf)=>{
      if(conf && conf.config && !conf.code){
        storage.setOrdersLimit(conf.config);
      }
    });

    api.config('noService').then((conf)=>{
      if(conf && conf.config && !conf.code){
        storage.setNoService(conf.config);
      }
    });
    return ()=>{

    }
  }, []);

  global.getHasService = () =>{
    return !showNoService;
  }

  return (
        <LoadingOverlay
            active={isLoading}
            spinner={<PuffLoader color="#36d7b7" />}
          >
          <div id="lena-root">
            <main>
              <BrowserRouter>
                <React.Fragment>
                      <Suspense
                        fallback={
                          <div className="text-white text-center mt-3">Loading...</div>
                        }
                      >
                        <Routes>
                          <Route exact path="/Error" element={<InternalServerErrorView/>} />
                          <Route exact path="/" element={<HomeLenaView setIsLoading={setIsLoading}/>}/>
                          <Route exact path="/Products" element={<ProductsView setIsLoading={setIsLoading} isLoading={isLoading}/>}/>
                          <Route exact path="/FollowPurchase" element={<FollowPurchaseView setIsLoading={setIsLoading} />}/>
                          <Route exact path="/PlacedOrder" element={<PlacedOrderView setIsLoading={setIsLoading} />}/>
                          <Route exact path="/ViewBasket" element={<BasketView setIsLoading={setIsLoading} />}/>
                          <Route exact path="/UI" element={<TestProductUI setIsLoading={setIsLoading} />}/>
                        </Routes> 
                      </Suspense>
                </React.Fragment>
              </BrowserRouter>
              <div className="extra-height"/>
            </main>
            <Footer/>
            {showNoService ? <NoService/> : <></>}
          </div>
        </LoadingOverlay>
  );
}

export default App;
