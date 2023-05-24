import React from 'react';
import "./SingleFollowCard.css"

export default function SingleFollowCard(props) {
    return (
        <div className="row row-sfc">
                  <div className="card">
                      <div className="row g-0">
                        <div className="col-md-9">
                          <div className="card-body">
                            <h6>
                              <span to="" className="text-decoration-none">
                              {props.title}
                              </span>
                            </h6>
                            <div className="small">
                              {props.isList ? (<>
                                {props.bodyMessage.replaceAll('\n', '\r').split('\r').map((line, index)=> {
                                  return(<div key={index}>
                                  <p style={{marginBottom: index === 0 ? '8px' : 0,}}>{line}</p>
                                  </div>)
                                })}
                              </>) : props.bodyMessage }
                            </div>
                            <div className="mt-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
    )
}