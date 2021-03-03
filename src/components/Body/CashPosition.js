import React from 'react';
import ShareProfile from './ShareProfile';
import More from '../../assets/icons/more.svg';
import Menu from '../../assets/icons/menu.svg';

export class CashPosition extends React.Component {
    render() {
        return (
            <div className="cash__position">
                <div className="menu__btn">
                    <img src={Menu} alt="menu"/>
                </div>
                <div className="cp__title">
                    <p>Cash Position</p>
                </div>
                <div className="cp__value">
                    <p><span>&#x20B9;</span>13,254.00</p>
                </div>
                <div className="cp__line"></div>
                <div className="cp__portfolio">
                    <p>Portfolio</p>
                    <p id="cp__portfolio__name">Growth Portfolio</p>
                </div>
                <div className="cp__line"></div>
                <div className="cp__shares__container">
                    <div className="more__btn">
                        <img src={More} alt="more"/>
                    </div>
                    <div className="cp__shares">
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="1.32"/>
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="-1.32"/>
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="1.32"/>
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="-1.32"/>
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="-1.32"/>
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="-1.32"/>
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="1.32"/>
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="1.32"/>
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="1.32"/>
                        <ShareProfile code="NSE:RELIANCE" name="Reliance Industries Ltd." shares="1" value="2,100.00" change="1.32"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CashPosition;
