import './Modal.css';
import React from 'react';

export default function Modal(props) {
  return (
    <>
      <div hidden={!props.isVisible} className={'container-m' + (props.isWarning ? ' warning' : '')}>
        <h2>{props.title ?? 'My Title'}</h2>
        {!(props.message && typeof props.message === "string") ?
          (props.message):
          (<p>{props.message ?? 'This is a message'}</p>)
        }
        
        <div className="actions-container-m">
            {props.actions ? props.actions.map((action, index)=>{
              return <button
                      key={index}
                      type="button"
                      className="btn btn-sm btn-primary action-m"
                      title="Add to cart"
                      onClick={()=>action.callback(props.arg)}
                    >
                    {action.name}
                    </button>
            }): <></>}
        </div>
      </div>
      <div className={props.isVisible ? 'block-m' : ''}></div>
    </>
  )
}
