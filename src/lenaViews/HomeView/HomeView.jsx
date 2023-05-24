import './HomeView.css'
import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../../lenaHelpers/APIRequests.js";
import * as storage from '../../lenaHelpers/LocalStorage.js';
import Button from '../../lenaComponents/Button/Button';
import { useMediaQuery } from 'react-responsive';
import { getCSSQuery } from '../../lenaHelpers/Helpers';

export default function HomeView(props) {
    const [introMessage, setIntroMessage] = useState("Seja bem vindo!\n\r Promoção em ramos do dia dos namorados!");
    const [storeName, setStoreName] = useState("Lena Store");
    const [hasService, setHasService] = useState(false);

    const isMD = getCSSQuery(useMediaQuery, 'md');


    useEffect(()=>{
        api.config('welcome').then((conf)=>{
            const welcome = storage.getWelcome();
            
            if(conf && conf.config && !conf.code){
                setIntroMessage(conf.config);
                storage.setWelcome(conf.config);
            }else if(welcome){
                setIntroMessage(welcome);
            }
        });
        api.config('storeName').then((conf)=>{
            const storeName = storage.getStoreName();

            if(conf && conf.config && !conf.code){
                setStoreName(conf.config);
                storage.setStoreName(conf.config);
            }else if(storeName){
                setStoreName(storeName);
            }
        });

        const timer = setInterval(() => {
            setHasService(global.getHasService());
        }, 1000);

        return ()=>{
            clearInterval(timer);
        };
    }, []);

    const LinkLayout = (props) => {
        if(hasService){
            return(
                <Link to={props.to} className={"access-hv " + (isMD && props.hasHeight ? "products-height-hv" : "")}>
                    {props.children}
                </Link>
            );
        }else{
            return(
                <></>
            );
        }
    }
    
    return (
    <div className='container-intro-hv'>
            <div className='background-hv'></div>
            <div className='intro-container-inner-hv'>
            <div className="logo-intro-hv">
                    <img src="/images/LenaIntroHome/logo.png" alt="" className='logo-hv' />
                    <div className="intro-actions-hv">
                        <div className="intro-text-hv">
                            <h1>{storeName}</h1>
                            <p>{introMessage}</p>
                        </div>
                        <div className="intro-buttons-container-hv">
                            <LinkLayout to="/Products" hasHeight={true}>
                                <Button content={<>Produtos</>} extraClasses={"width-hv"}/>
                            </LinkLayout> 
                            <LinkLayout to="/FollowPurchase">
                                <Button content={<>Acompanhar {isMD ? <br/> : <></>} Encomenda</>} extraClasses={"width-hv"}/>
                            </LinkLayout> 
                        </div>                                     
                    </div>
                </div>  
            </div> 
    </div>    
    )
}
