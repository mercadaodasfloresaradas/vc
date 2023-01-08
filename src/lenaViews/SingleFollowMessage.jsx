import React from 'react'

export default function SingleFollowCard(props) {
    return (
        <div className="row message-follow-style">
                  <div className="card">
                      <div className="row g-0">
                        <div className="col-md-9">
                          <div className="card-body">
                            <h6>
                              <span to="" className="text-decoration-none">
                              {props.user === 's' ? 'Vendedora' : 'Cliente' }
                              </span>
                            </h6>
                            <div className="small">
                              {props.message}
                            </div>
                            <div className="mt-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
    )
}
