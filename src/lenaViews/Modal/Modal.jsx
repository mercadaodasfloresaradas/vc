import Button from '../../lenaComponents/Button/Button';
import './Modal.css';
import React from 'react';

export default function Modal(props) {
  return (
    <>
      <div hidden={!props.isVisible} className={'container-m' + (props.isWarning ? ' warning' : '')}>
        <h2>{props.title ?? 'My Title'}</h2>
        {!(props.message && typeof props.message === "string") ?
          (props.message):
          ( props.message.split('\n').map((message, index )=> <p className={index !== 0? 'small-text' : ''}>{message ?? 'This is a message'}</p>) )
        }
        
        <div className="actions-container-m">
            {props.actions ? props.actions.map((action, index)=>{
              return (
                    <>
                      <Button 
                        key={index}
                        onClick={()=>action.callback(props.arg)}
                        content={
                          action.name
                        }/>

                    </>)
            }): <></>}
        </div>
      </div>
      <div className={props.isVisible ? 'block-m' : ''}></div>
    </>
  )
}
