
import './BasketView.css';
import "lightgallery.js/dist/css/lightgallery.css";
import React, { lazy, useState, useEffect, useRef } from "react";
import * as api from "../../lenaHelpers/APIRequests.js";
import * as storage from '../../lenaHelpers/LocalStorage.js';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { getCSSQuery } from '../../lenaHelpers/Helpers';
import ProductsContainer from '../../lenaComponents/ProductsContainer/ProductsContainer';
import Header from '../../lenaComponents/Header/Header';
import Button from '../../lenaComponents/Button/Button';


const Modal = lazy(() =>
  import("../Modal/Modal")
);





export default function ProductsView(props) {

        const isMD = getCSSQuery(useMediaQuery, 'md');

        const navigate = useNavigate();
        const inputRef = useRef();

        const dismissModal = () =>{
          const dataToChange = JSON.parse(JSON.stringify(warningData));
          dataToChange.isVisible = false; 
          setWarningData(dataToChange);
        }


        const confirmDoPurchase = (args) =>{
          props.setIsLoading(true);
          dismissModal();
          api.newSale(args.name, args.phoneNumber, args.address, args.NIF, args.products.map((product)=> {
            return({
              id: product.id, 
              category: product.category
            });
          }), true).then((data)=>{
            console.log(data);
            if(data.success){
              storage.cleanBasket();
              storage.insertPlacedOrderData(data.id, data.total);
              navigate('/PlacedOrder');
            }else if(data.isOutOfLimit){
              const dataToChange = JSON.parse(JSON.stringify(warningData));
          
              dataToChange.message = 'Excedeu o número diário de pedidos de compra que pode fazer, por favor tente de novo amanhã...';
              dataToChange.isVisible = true;
              dataToChange.isWarning = true;
              dataToChange.actions = stateActions[1];
              
              setWarningData(dataToChange);
            }
  
            props.setIsLoading(false);
          }).catch((err)=>{
            console.log(err);
            props.setIsLoading(false);
          });
        }

        const [warningAction] = useState(
          [
            {
              name: 'Ok',
              callback: dismissModal
            },
          ]
        );

        const [purchaseAction] = useState(
          [
            {
              name: 'Sim',
              callback: confirmDoPurchase,
            },
            {
              name: 'Não',
              callback: dismissModal,
            },
          ]);

        const [stateActions] = useState([purchaseAction, warningAction]);

        const [view,] = useState('list');
        const [name, setName] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [address, setAddress] = useState('');
        const [NIF, setNIF] = useState('');
        const [totalPrice, setTotalPrice] = useState(0);
        const [products, setProducts] = useState([]);
        const [warningData, setWarningData] = useState({
          title: 'Aviso',
          message: 'Team a certeza que quer avançar com a compra?',
          actions: stateActions[0],
          isWarning: false,
          isVisible: false,
          arg: '',
        });


      useEffect(() => {
        updateProducts(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useEffect(() => {
        console.log({products});
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [products]);

      const updateProducts = (isFirst) =>{
        props.setIsLoading(true);

        const productsToBasket = storage.getBasket();
        setProducts(productsToBasket);
        api.newSale('*', '*', '*', '*', productsToBasket.map((product)=> {
          return({
            id: product.id, 
            category: product.category
          });
        }), false).then((data)=>{
          if(data && (data.total > -1 || +data.total > -1)){
            console.log(data);
            setTotalPrice(data.total);
          }else{
            setTotalPrice(0);
          }


          console.log({ toremove: data.productsToRemove, products});

          if(data && data.productsToRemove && data.productsToRemove.length){
            data.productsToRemove.forEach(product => {
              storage.removeProductFromBasket(product);
            });

            const newBasket = storage.getBasket();
            setProducts(newBasket);
          }
          props.setIsLoading(false);
          const input = document.querySelector("#name");
          if(isFirst && input){
              input.focus();
          }
        }).catch((err)=>{
          console.log(err);
          props.setIsLoading(false);
        });
      }
    
      
      const makePurchase = ()=>{
        const hasName = name.replaceAll(' ', '') !== '' && name.replaceAll(' ', '').length > 10; 
        const hasPhone = phoneNumber.replaceAll(' ', '') !== '' && phoneNumber.replaceAll(' ', '').length === 9; 
        const hasAddress = address.replaceAll(' ', '') !== '' && address.replaceAll(' ', '').length > 10; 
        const hasNIF = NIF.replaceAll(' ', '') !== '' && NIF.replaceAll(' ', '').length === 9; 
        const hasProducts = !!products.length; 

        if(!hasAddress || !hasName || !hasPhone || !hasNIF || !hasProducts){
          const dataToChange = JSON.parse(JSON.stringify(warningData));
          
          dataToChange.message = <> Faltam preencher: <br/>
            {!hasName ? <> Nome com mais de 10 letras<br/></> : ''} 
            {!hasPhone ? <> Número de telefone com 9 digitos<br/></> : ''} 
            {!hasAddress ? <>Morada com mais de 10 letras<br/></>: ''} 
            {!hasNIF ? <>NIF com 9 números<br/></>: ''} 
            {!hasProducts ? <>Por favor selecione productos<br/></>: ''} 
          </>;
          dataToChange.isVisible = true;
          dataToChange.isWarning = true;
          dataToChange.actions = stateActions[1];

          setWarningData(dataToChange);
        }else{

          const dataToChange = JSON.parse(JSON.stringify(warningData));
          
          dataToChange.message = 'Tem a certeza que quer avançar com o pedido?\n Anote o código na proxima página para poder acompanhar a sua encomenda.\n O valor total é apenas para os produtos, a vendedora irá informar-lhe do valor do transporte.';
          dataToChange.isVisible = true;
          dataToChange.isWarning = false;
          dataToChange.actions = stateActions[0];

          dataToChange.arg = {products, name, phoneNumber, address, NIF};
          
          setWarningData(dataToChange);
        }
      }

      const toRemove = (product) =>{
        storage.removeProductFromBasket(product);
        updateProducts();
      }

      const Actions = () =>{
        return(
              <div className="purchase-actions-inner-bv">
                <div className='total-make-bv'>  
                  <span className="display-5 px-3 bg-white rounded basket-total-bv">
                    total
                    <br />
                    {totalPrice ?? 0} €
                  </span>
                  <Button 
                    onClick={makePurchase}
                    content={"Fazer Pedido "}
                    />
                </div>
              </div>
        )
      }

    return (
        <React.Fragment>
          <Header
            title={"Carrinho"}
            img={"url(../../images/LenaTestProducts/banner.png)"}
            upLink={{
                link: "/FollowPurchase", 
                content: <>Acompanhar {isMD ? <br/> : <></>} Encomenda</>
              }}
            downLink={{
                link: "/Products", 
                content: "Produtos"
              }}
          />
         
          <div className="container-bv">
              <div className='inputs-actions-bv'>
                <div className='container-inputs-bv'>
                  <label className="label-bv">
                    Nome Completo
                  </label>
                  <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control input-basket"
                      placeholder="Nome completo"
                      required
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      ref={inputRef}
                    />
                  <label className="label-bv">
                    Telemóvel assoc. MBWay
                  </label>
                  <input
                      id="phone"
                      name="phone"
                      type='number'
                      className="form-control input-basket"
                      placeholder="Número de telefone associado ao MBWay"
                      required
                      value={phoneNumber}
                      onChange={(e)=>setPhoneNumber(e.target.value)}
                    />
                  <label className="label-bv">
                    NIF
                  </label>
                  <input
                      id="NIF"
                      name="NIF"
                      type='number'
                      className="form-control input-basket"
                      placeholder="NIF"
                      required
                      value={NIF}
                      onChange={(e)=>setNIF(e.target.value)}
                    />
                  <label className="label-bv">
                    Morada Completa para Envio
                  </label>
                  <input
                      id="adress"
                      name="adress"
                      type="text"
                      className="form-control input-basket"
                      placeholder="Morada"
                      required
                      value={address}
                      onChange={(e)=>setAddress(e.target.value)}
                    />
                </div>
                <Actions/>
              </div>
            <div className="products-bv">
                <hr />
                  {view === "list" &&
                    (<ProductsContainer 
                          productsInjected={products}
                          isToRemove={true}
                          isToBuy={false}
                          showPrice={true}
                          noMargin={true}
                          toRemove={toRemove}
                          />)}
                <hr />
            </div> 
          </div>
          <div className='space-bv'></div>
          <Modal {...warningData}
            title={warningData.title}
            message={warningData.message}
            actions={warningData.actions}
            isWarning={warningData.isWarning}
            isVisible={warningData.isVisible}
            arg={warningData.arg}
          />
        </React.Fragment>
    )
}
