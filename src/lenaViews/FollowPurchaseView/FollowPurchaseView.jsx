
import './FollowPurchaseView.css';
import React, { lazy, useState, useEffect} from "react";
import * as api from "../../lenaHelpers/APIRequests.js";
import ProductsContainer from '../../lenaComponents/ProductsContainer/ProductsContainer';
import { IoSearchCircle } from "react-icons/io5";
import { BiConversation } from "react-icons/bi";
import { useMediaQuery } from 'react-responsive';
import { getCSSQuery } from '../../lenaHelpers/Helpers';
import Header from '../../lenaComponents/Header/Header';
import Button from '../../lenaComponents/Button/Button';

import "lightgallery.js/dist/css/lightgallery.css";;

const CardFollowList = lazy(() =>
  import("../../lenaComponents/SingleFollowCard/SingleFollowCard")
);

const MessageFollowList = lazy(() =>
  import("../../lenaComponents/SingleFollowMessage/SingleFollowMessage")
);

const Basket = lazy(() =>
  import("../../lenaViews/Basket/Basket")
);

const Modal = lazy(() =>
  import("../Modal/Modal")
);

export default function ProductsView(props) {

        const EPurchaseState ={
          toPay: 'Aguarda Pagamento', 
          payed: 'Pago verifique nos comentarios a data de entrega', 
          finalized: 'Pago e entregue', 
          old: 'Should not be here',
          val: (inKey)=>{
            return EPurchaseState[inKey] || ''
          },
          warning: (inKey) =>{
            let finalVal = '';

            switch (EPurchaseState[inKey]) {
              case EPurchaseState.toPay:
                finalVal = "Devolvemos o dinheiro, até ao dia antes da entrega.";
                break;
              case EPurchaseState.payed:
                finalVal = "Se não defeniu a sua morada como verdadeiramente queria, por favor envie uma mensagem a vendedora com a nova morada.";
                break;
              case EPurchaseState.finalized:
                finalVal = "Concluio a sua compra com sucesso!";
                break;
              case EPurchaseState.old:
                finalVal = 'Should not be here';
                break;
              default:
                break;
            }

            return finalVal
          },
        }

        const messageActions = [
          {
            name: 'Enviar resposta',
            callback: ()=>{
              if(newMessage.replaceAll(' ', '')){
                props.setIsLoading(true);
                api.comment(idSaved, newMessage).then((data)=>{
                  if(data.conversations){
                    setMessages([
                      messages[0],
                      ...data.conversations
                    ]);
                    setWarningData({
                      ...warningData,
                      isVisible: false
                    });
                    setNewMessage('');
                  }else{
                    setWarningData({
                      title: 'Erro',
                      message: 'Erro a enviar mensagem: Poderá ter sido falha no sistema ou você ja excedeu o limite de 3 messagens. Se assim for por favor, aguarde a resposta do vendedor!',
                      actions: [{
                        name: 'Ok',
                        callback: ()=>{
                          setWarningData({
                            title: 'Messagens',
                            message: getMessageModalStructure(),
                            actions: messageActions,
                            isWarning: false,
                            isVisible: false
                          })
                        }
                      }],
                      isWarning: true,
                      isVisible: true
                    });
                  }

                  props.setIsLoading(false);
                }).catch((err)=>{
                  console.log(err);
                  props.setIsLoading(false);
                });
              }
            }
          },
          {
            name: 'Não',
            callback: ()=>{
              setWarningData({
                ...warningData,
                isVisible: false
              });
            }
          },
        ];

        const getMessageModalStructure = () =>{
          return(<div>
            <p>
              {messages.length ? (messages[messages.length - 1].message.substring(0, 50) + '...') : ''}
            </p>
            <textarea
                    id="messages"
                    name="messages" 
                    className="form-control col-sm"
                    placeholder="Escreva aqui a sua mensagem..."
                    required
                    value={newMessage}
                    onChange={(e)=>{
                      setNewMessage(e.target.value);
                    }}
              />
          </div>);
        }

        const [messages, setMessages] = useState([]);
        const [view,] = useState('list');
        const [total, setTotal] = useState(0);
        const [purchaseState, setPurchaseState] = useState('');
        const [warnings, setWarnings] = useState('');
        const [products, setProducts] = useState([]);
        const [id, setId] = useState('');
        const [idSaved, setIdSaved] = useState('');
        const [newMessage, setNewMessage] = useState('');
        const [warningData, setWarningData] = useState({
          title: 'Messagens',
          message: getMessageModalStructure(),
          actions: messageActions,
          isWarning: false,
          isVisible: false
        });
        const [timer, setTimer] = useState();

        const isMD = getCSSQuery(useMediaQuery, 'md');

        useEffect(()=>{
          setWarningData({
            ...warningData,
            message: getMessageModalStructure(),
            actions: messageActions,
          })
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[newMessage]);

        useEffect(()=>{
          
          return ()=>{
            if(timer){
              clearInterval(timer);
            }
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);
      
        const checkPurchase = () =>{
          props.setIsLoading(true);
          const idForInterval = id;

          const requestToCheck = (isOnlyComments)=>{
            console.log('updates');
            api.showSale(idForInterval).then((data)=>{
              if(data.details && data.products && data.conversations && data.conversations.messages){
                const formatDate = new Date(data.details.date).toLocaleDateString('pt-PT');
                setMessages([
                  {
                    sender: "c",
                    message: `Conversa Automática - ${formatDate} - ${data.details.address} - ${data.details.phone} - ${data.details.NIF}`
                  },
                  ...data.conversations.messages
                ]);
                setPurchaseState(EPurchaseState.val(data.details.state));
                if(!isOnlyComments){
                  console.log("test", isOnlyComments);
                  setTotal(data.details.priceTotal);
                  setProducts(data.products.products);
                  setIdSaved(id);
                }

                api.config(data.details.state).then((conf)=>{
                  setWarnings(conf.config);
                });
                
              }
              props.setIsLoading(false);
            }).catch((err)=>{
              props.setIsLoading(false);
            });
          }

          if(timer){
            clearInterval(timer);
          }

          const inter = setInterval(()=>{requestToCheck(true)}, 50000);

          requestToCheck();

          setTimer(inter);
          
        }
      

    return (
        <>

          <Header
            title={<>Acompanhar {isMD ? <br/> : <></>} Encomenda</>}
            img={"url(../../images/LenaTestProducts/banner.png)"}
            upLink={{
                link: "/ViewBasket", 
                content: <Basket isFollowMD={isMD} />
              }}
            downLink={{
                link: "/Products", 
                content: "Produtos"
              }}
          />
         
          <div className="container-fluid mb-3 follow-data-container-fpv">
            <div className="row">
              {
                isMD? <></> : 
                (
                  <>
                 <div className="col-md-4">
                  <div className="row g-3 follow-overload-fpv">
                    {view === "list" && products.length !== 0 &&
                     (
                      <ProductsContainer 
                          productsInjected={products}
                          isToBuy={false}
                          showPrice={false}
                          noMargin={true}
                          />
                     )}
                  </div>
                </div>
                      
                  </>
                )
              }
              
              {
                products.length > 0 ? 
                (<div className="col-md-4 indication-follow-purchase-fpv">
                  <div className='indication-follow-purchase-inner-fpv'>
                    <CardFollowList title="Estado da Encomenda" bodyMessage={purchaseState}/>
                    <CardFollowList title="Total Encomenda" bodyMessage={ total + '€'}/>
                    <CardFollowList title="Avisos" bodyMessage={warnings} isList={true}/>
                  </div>
                </div>) : (<></>)
              }
              <div className="col-md-4">
                <div className="messages-follow-container-fpv">
                  <div className="messages-follow-container-inner-fpv">
                    {messages.map((message, index)=>{
                      return (
                          <MessageFollowList key={index}
                            user={message.sender} 
                            message={message.message}></MessageFollowList>
                      );
                    })}

                  </div>
                </div>
                {messages.length ?
                <div className='conversation-fpv'>
                  <Button 
                  onClick={()=>{
                      setWarningData({
                        ...warningData,
                        isVisible: true
                      });
                    }}
                  content={<BiConversation className='icon-fpv'/>}
                  />
                </div> : <></>}
              </div>
              {
                isMD? 
                (<div className="col-md-4 margins-md-fpv">
                  <div className="row g-3 follow-overload-small-fpv">
                    {view === "list" && products.length !== 0 &&
                     (
                      <ProductsContainer 
                          productsInjected={products}
                          isToBuy={false}
                          showPrice={false}
                          noMargin={true}
                          />
                     )}
                  </div>
                </div>) : <></>
              }
            </div> 
          </div>
          <div className={"search-container-fpv"}>
            <div className="follow-basket-fpv container">
              <div className="input-container-fpv">
                <span className="col-sm-1">
                    ID da Compra
                </span>
                <input
                      id="follow-id"
                      name="followid"
                      type="text"
                      className="form-control col-sm"
                      placeholder="ID"
                      required
                      value={id}
                      onChange={(e)=>setId(e.target.value)}
                />

                <Button 
                  onClick={checkPurchase}
                  content={<IoSearchCircle className='icon-fpv'/>}
                  />
              </div>
            </div>
          </div>
          <Modal {...warningData}/>
        </>
    )
}
