import React from 'react';
import $ from 'jquery';
import ChartClock from './ChartClock';
import StockChart from './StockChart';
import Zoom from '../assets/icons/zoom.svg';


export class ChartContainer extends React.Component {


    constructor(props)
    {
        super(props);
        this.state = {
            range : '6M'
        }
    }

    changeRange(type)
    {
        this.setState({
            range : type
        });
        $('.chart__range>div').removeClass('active__range');
        $('.chart__range>div[data-range="'+type+'"]').addClass('active__range');
        
    }

    render() {

        console.log(this.props.data);

        return (
            <div className="chart__container">
                <div className="stock__info">
                    <div className="stock__details">
                        <p className="stock__name__code">
                            <span id="stock__full__name">Reliance Industries Ltd.</span>
                            <span id="stock__nse__code">NSE : RELIANCE</span>
                            <span id="stock__bse__code">BSE : 326154</span>
                        </p>
                        <div className="stock__type">Oil & Gas</div>
                    </div>
                    <div className="stock__price__details">
                        <p className="stock__price__performance">
                            <span>Rs. 2,300<span className="price__decimals">.00</span></span>
                            <span className="stock__performance">(+3.21%)</span>
                            <ChartClock />
                        </p>
                    </div>
                    <div className="stock__purchase">
                        <div className="buy__stock">Buy</div>
                        <div className="sell__stock">Sell</div>
                    </div>
                </div>
                <div className="stock__chart">
                    <StockChart key={1} data={this.props.data} range={this.state.range}/>
                </div>
                <div className="chart__range">
                    <div data-range="1D" className="chart__range__value" onClick={this.changeRange.bind(this,'1D')}>1D</div>
                    <div data-range="5D" className="chart__range__value" onClick={this.changeRange.bind(this,'5D')}>5D</div>
                    <div data-range="1M" className="chart__range__value" onClick={this.changeRange.bind(this,'1M')}>1M</div>
                    <div data-range="6M" className="chart__range__value active__range" onClick={this.changeRange.bind(this,'6M')}>6M</div>
                    <div data-range="YTD" className="chart__range__value" onClick={this.changeRange.bind(this,'YTD')}>YTD</div>
                    <div data-range="1Y" className="chart__range__value" onClick={this.changeRange.bind(this,'1Y')}>1Y</div>
                    <div data-range="5Y" className="chart__range__value" onClick={this.changeRange.bind(this,'5Y')}>5Y</div>
                    <div data-range="Max" className="chart__range__value" onClick={this.changeRange.bind(this,'Max')}>Max</div>
                </div>
                <div className="chart__zoom">
                    <img src={Zoom} alt="zoom"/> 
                </div>
            </div>
        )
    }
}

export default ChartContainer;
