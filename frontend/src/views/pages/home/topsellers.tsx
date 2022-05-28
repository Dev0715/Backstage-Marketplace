import React from 'react';
import {Link} from "react-router-dom";

const Topsellers = () => {
    return (
        <section className="row row--grid">
            <div className="col-12">
                <div className="main__title">
                    <h2>Backstagers</h2>

                    {/* <Link to="authors.html" className="main__link">View all <svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"/>
                    </svg></Link> */}
                </div>
            </div>
            <div className="col-12">
                <ul className="sellers-list">
                    <li>
                        <span className="sellers-list__number">1</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar.jpg" alt=""/>
                            <Link to="#">@miriuuu</Link>
                            
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">2</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar2.jpg" alt=""/>
                            <Link to="#">@sc00ty</Link>
                            
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">3</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar3.jpg" alt=""/>
                            <Link to="#">@redalert</Link>
                         
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">4</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar4.jpg" alt=""/>
                            <Link to="#">@1one</Link>
                            
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">5</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar5.jpg" alt=""/>
                            <Link to="#">@kateblank</Link>
                            
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">6</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar6.jpg" alt=""/>
                            <Link to="#">@johndoe</Link>
                           
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">7</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar7.jpg" alt=""/>
                            <Link to="#">@nickname</Link>
                          
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">8</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar8.jpg" alt=""/>
                            <Link to="#">@lllily</Link>
                            
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">9</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar9.jpg" alt=""/>
                            <Link to="#">@fantraingle</Link>
                            
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">10</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar10.jpg" alt=""/>
                            <Link to="#">@oxyoxyoxy</Link>
                            
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">11</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar11.jpg" alt=""/>
                            <Link to="#">@vandam</Link>
                          
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">12</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar12.jpg" alt=""/>
                            <Link to="#">@dididi</Link>
                           
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">13</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar13.jpg" alt=""/>
                            <Link to="#">@lyzzy</Link>
                            
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">14</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar14.jpg" alt=""/>
                            <Link to="#">@oceanu</Link>
                            
                        </div>
                    </li>

                    <li>
                        <span className="sellers-list__number">15</span>
                        <div className="sellers-list__author sellers-list__author--verified">
                            <img src="img/avatars/avatar15.jpg" alt=""/>
                            <Link to="#">@justart</Link>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}
export default Topsellers;