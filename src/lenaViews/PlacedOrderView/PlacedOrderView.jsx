import './PlacedOrderView.css'
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../lenaHelpers/APIRequests.js";
import * as storage from '../../lenaHelpers/LocalStorage.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { getCSSQuery } from '../../lenaHelpers/Helpers';

class OrdersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseID: "123123ABD",
      total: 0,
      contacts: "Contacto Loja: 234555666\nContacto Vendedora: 913555666\nContacto Alternativo: 963555666", 
      warnings: "Pagar valor do/s producto/s para dar o seguimento inicial\n Posteriormente será enviada uma mensagem com o custo do envio\nMensagens são enviadas na página de seguimento de encomenda\nNos pagamentos deve meter o seu ID de compra ou enviar sms para nr 913555666 ex -'pagamento 123456ABC' ",
      payment: "MBWAY: 913555666\nAlternativo MBWAY: 963555666\nPaypal: helena@hotmail.com"
    };
  }

  componentDidMount(){
    const data = storage.getPlacedOrderData();
    this.setState({
      purchaseID: data.id,
      total: data.total
    });

    api.config('warnings').then((conf)=>{
      this.setState({warnings: conf.config});
    });
    api.config('payMethods').then((conf)=>{
      this.setState({payment: conf.config});
    });
    api.config('contacts').then((conf)=>{
      this.setState({contacts: conf.config});
    });
  }

  Linker(props){
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

  Navigation(props){
    const isMD = getCSSQuery(useMediaQuery, 'md');

    return(
            <div className="container text-center navigation-pov">
                {isMD ? <></> : <props.linker text={'Acompanhar Encomenda'} route={'/FollowPurchase'}/>}
                <span className="display-5 px-3 bg-white rounded shadow">
                  Pedido Efectuado
                </span>
                <div className="actions-md-pov">
                  {isMD ? <props.linker text={'Acompanhar Encomenda'} route={'/FollowPurchase'}/> : <></>}
                  <props.linker text={'Productos'} route={'/Products'}/>
                </div>
            </div>
          );
  }

  render() {
    return (
      <div className="">
        <div
            className="p-5 bg-primary bs-cover"
            style={{
              backgroundImage: "url(../../images/LenaTestProducts/banner.png)",
            }}
          >
            <this.Navigation linker={this.Linker}/>
        </div>
        <div className="id-purchase-pov">
            ID de Compra
            <br/>
            {this.state.purchaseID}
            <br/>
            <br/>
            Total
            <br/>
            {this.state.total}
        </div>
        <div className="container mb-3">
          
          <div className="row g-3">
            <div className="col-md-6">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-9">
                    <div className="card-body">
                      <h6>
                        <FontAwesomeIcon icon={faCreditCard} />
                        <span to="" className="text-decoration-none">
                        Modos de Pagamento
                        </span>
                      </h6>
                      <div className="small">
                        <ol>
                         {this.state.warnings.replaceAll('\n', '\r').split('\r').map((line, index)=> {
                                return<li key={index}>{line}</li>
                            }
                          )
                        }
                        </ol>
                        <ul>
                         {this.state.payment.replaceAll('\n', '\r').split('\r').map((line, index)=> {
                                return<li key={index}>{line}</li>
                            })}
                        </ul>
                      </div>
                      <div className="mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-9">
                    <div className="card-body">
                      <h6>
                        <FontAwesomeIcon icon={faPhoneVolume} />
                        <span to="" className="text-decoration-none">
                        Contactos
                        </span>
                      </h6>
                      <div className="small">
                        <ul>
                         {this.state.contacts.split('\n').map((line, index)=> <li key={index}>{line}</li>)}
                        </ul>
                      </div>
                      <div className="mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default OrdersView;
