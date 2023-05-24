import React from "react";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconLifePreserverFill } from "bootstrap-icons/icons/life-preserver.svg";
import { ReactComponent as IconArrowCounterclockwiseFill } from "bootstrap-icons/icons/arrow-counterclockwise.svg";

import "./ServicesView.css";

const CardServices = (props) => {
  return (
    <div className="card card-sv">
      <div className="card-header font-weight-bold text-uppercase">
        Serviço ao Cliente
      </div>
      <div className="card-body">
        <div className="row border-bottom">
          <div className="col-2">
            <IconTruckFill className="h1" />
          </div>
          <div className="col">
            <div className="ml-3">
              <span className="font-weight-bold">Entrega</span>
              <p className="small">{props.delivery}</p>
            </div>
          </div>
        </div>
        <div className="row border-bottom py-3">
          <div className="col-2">
            <IconLifePreserverFill className="h1" />
          </div>
          <div className="col">
            <div className="ml-3">
              <span className="font-weight-bold">Suporte</span>
              <p className="small m-0">{props.support}</p>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-2">
            <IconArrowCounterclockwiseFill className="h1" />
          </div>
          <div className="col">
            <div className="ml-3">
              <span className="font-weight-bold">Devolução</span>
              <p className="small m-0">
                {props.returns}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardServices;
