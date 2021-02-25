import React from 'react';
import $ from 'jquery';
import ChartClock from './ChartClock';
import StockChart from './StockChart';
import Indicator from './Indicator';
import Zoom from '../assets/icons/zoom.svg';
import Compare from '../assets/icons/compare.svg';
import IndicatorIcon from '../assets/icons/indicator.svg';
import CrossIcon from '../assets/icons/crossicon.svg';
import Line from '../assets/icons/line.svg';
import Area from '../assets/icons/area.svg';
import Candles from '../assets/icons/candles.svg';
import Column from '../assets/icons/bar.svg';
import JumpLine from '../assets/icons/jumpline.svg';
import Range from '../assets/icons/range.svg';
import OHLC from '../assets/icons/OHLC.svg';
import Marker from '../assets/icons/marker.svg';
import Stick from '../assets/icons/stick.svg';
import Renko from '../assets/icons/renko.svg';
import Kagi from '../assets/icons/kagi.svg';
import Point from '../assets/icons/point.svg';

export class ChartContainer extends React.Component {


    constructor(props)
    {
        super(props);
        this.setInitialSize = this.setInitialSize.bind(this);
        this.state = {
            chartTypeOpen : false,
            indicatorOpen : false,
            chartType : 'line',
            chartWidth : 0,
            chartHeight : 0,
            zoom : false,
            range : '6M',
            chartTypeIcon : Line
        }
    }

    componentDidMount()
    {
        this.setInitialSize();
    }

    setInitialSize()
    {
        let wd = $('.stock__chart').width();
        let ht = $('.stock__chart').height();
        this.setState({
            chartWidth : wd,
            chartHeight : ht
        });
    }

    changeChart(type)
    {
        console.log(type);
        this.setState({
            chartType : type
        });
        if(type === 'area')
        {
            this.state.chartTypeIcon = Area;
        }
        else if(type === 'candlestick')
        {
            this.state.chartTypeIcon = Candles;
        }
        else if(type === 'column')
        {
            this.state.chartTypeIcon = Column;
        }
        else if(type === 'jumpLine')
        {
            this.state.chartTypeIcon = JumpLine;
        }
        else if(type === 'line')
        {
            this.state.chartTypeIcon = Line;
        }
        else if(type === 'rangeArea')
        {
            this.state.chartTypeIcon = Range;
        }
        else if(type === 'ohlc')
        {
            this.state.chartTypeIcon = OHLC;
        }
        else if(type === 'marker')
        {
            this.state.chartTypeIcon = Marker;
        }
        else if(type === 'stick')
        {
            this.state.chartTypeIcon = Stick;
        }
        else if(type === 'renko')
        {
            this.state.chartTypeIcon = Renko;
        }
        else if(type === 'kagi')
        {
            this.state.chartTypeIcon = Kagi;
        }
        else if(type === 'point')
        {
            this.state.chartTypeIcon = Point;
        }
        $('.stock__chart__types>div').removeClass('active');
        $('.stock__chart__types>div[data-chart="'+type+'"]').addClass('active');
    }

    changeRange(type)
    {
        this.setState({
            range : type
        });
        $('.chart__range>div').removeClass('active__range');
        $('.chart__range>div[data-range="'+type+'"]').addClass('active__range');
    }

    ToggleChartType()
    {
        if(this.state.chartTypeOpen)
        {
            $('.stock__chart__types').removeClass('active');
            this.setState({
                chartTypeOpen : false
            });
        }
        else
        {
            $('.stock__chart__types').addClass('active');
            this.setState({
                chartTypeOpen : true
            });
        }
    }

    OpenIndicatorPopup()
    {
        if(!this.state.indicatorOpen)
        {
            $('.Indicator__popup').addClass('active');
            this.setState({
                indicatorOpen : true
            });
        }
    }

    CloseIndicatorPopup()
    {
        if(this.state.indicatorOpen)
        {
            $('.Indicator__popup').removeClass('active');
            this.setState({
                indicatorOpen : false
            });
        } 
    }

    openZoomMode()
    {
        console.log('zoom');
        if(this.state.zoom)
        {


            $('.app__header').removeClass('app__header__zoom');
            $('.app__body').removeClass('app__body__zoom');
            $('.app__footer').removeClass('app__footer__zoom');
            $('.key__statistics').removeClass('key__statistics__zoom');
            $('.chart__container').removeClass('chart__container__zoom');
            $('.app__body__left').removeClass('app__body__left__zoom');
            $('.app__body__right').removeClass('app__body__right__zoom');
            $('.chart__options').removeClass('active');
            $('.ks__container__full').css('display','none');
            $('.ks__container__half').css('display','flex');
        
            this.setState({
                zoom : false,
                chartWidth : $('.stock__chart').width(),
                chartHeight : $('.stock__chart').height()
            });
            console.log('zoom out',$('.stock__chart').height(),$('.stock__chart').width());
        }
        else
        {


            $('.app__header').addClass('app__header__zoom');
            $('.app__body').addClass('app__body__zoom');
            $('.app__footer').addClass('app__footer__zoom');
            $('.key__statistics').addClass('key__statistics__zoom');
            $('.chart__container').addClass('chart__container__zoom');
            $('.app__body__left').addClass('app__body__left__zoom');
            $('.app__body__right').addClass('app__body__right__zoom');
            $('.chart__options').addClass('active');
            $('.ks__container__full').css('display','flex');
            $('.ks__container__half').css('display','none');

            this.setState({
                zoom : true,
                chartWidth : $('.stock__chart').width(),
                chartHeight : $('.stock__chart').height()
            });

            console.log('zoom in',$('.stock__chart').height(),$('.stock__chart').width());

           
            
        }
       
    }

    render() {

        // console.log(this.props.data);

        return (

            <>
            <div className="Indicator__popup">
                <div className="Indicator__title__name"><p>Indicators & Strategies</p><span id="Indicator__close" onClick={this.CloseIndicatorPopup.bind(this)}><img src={CrossIcon} alt="X"/></span></div>
                <div className="Indicator__options">
                    <Indicator name="Simple Moving Average (SMA)"/>
                    <Indicator name="Weighted Moving Average (WMA)"/>
                    <Indicator name="Exponential Moving Average (EMA)"/>
                    <Indicator name="Triangular Moving Average (TMA)"/>
                    <Indicator name="Bollinger Bands (BBands)"/>
                    <Indicator name="Moving Average Convergence/Divergence (MACD)"/>
                    <Indicator name="Relative Strength Index (RSI)"/>
                    <Indicator name="Average True Range (ATR)"/>
                    <Indicator name="Stochastic Oscillator (Slow)"/>
                    <Indicator name="Stochastic Oscillator (Fast)"/>
                    <Indicator name="Stochastic Oscillator (Full)"/>
                    <Indicator name="Force Index (FI)"/>
                    <Indicator name="Elder Ray Indicator (ERI)"/>
                    <Indicator name="Elder Ray Indicator Bull Power (ERI)"/>
                    <Indicator name="Elder Ray Indicator Bear Power (ERI)"/>
                    <Indicator name="Elder Ray Impulse (ERIMP)"/>
                    <Indicator name="Parabolic SAR (PSAR)"/>
                </div>
            </div>
            <div className="chart__container">

                <div className="chart__container__stock__options">
                    <div className="chart__options">
                        <div className="chart__option__block chart__stock__name">
                            <span>RELIANCE</span>
                        </div>
                        <div className="chart__option__block">
                            <span>D</span>
                        </div>
                        <div className="chart__option__block chart__stock__type__change" onClick={this.ToggleChartType.bind(this)}>
                            <span><img src={this.state.chartTypeIcon} alt="C" id="chart__type__icon"/></span>
                            <div className="stock__chart__types">
                                <div data-chart="area" onClick={this.changeChart.bind(this,'area')}><img src={Area} alt="+"/><span>Area</span></div>
                                <div data-chart="candlestick" onClick={this.changeChart.bind(this,'candlestick')}><img src={Candles} alt="+"/><span>Candlestick</span></div>
                                <div data-chart="column" onClick={this.changeChart.bind(this,'column')}><img src={Column} alt="+"/><span>Column</span></div>
                                <div data-chart="jumpLine" onClick={this.changeChart.bind(this,'jumpLine')}><img src={JumpLine} alt="+"/><span>Jump Line</span></div>
                                <div data-chart="line" className="active" onClick={this.changeChart.bind(this,'line')}><img src={Line} alt="+"/><span>Line</span></div>
                                <div data-chart="rangeArea" onClick={this.changeChart.bind(this,'rangeArea')}><img src={Range} alt="+"/><span>Range Area</span></div>
                                <div data-chart="ohlc" onClick={this.changeChart.bind(this,'ohlc')}><img src={OHLC} alt="+"/><span>OHLC</span></div>
                                <div data-chart="marker" onClick={this.changeChart.bind(this,'marker')}><img src={Marker} alt="+"/><span>Marker</span></div>
                                <div data-chart="stick" onClick={this.changeChart.bind(this,'stick')}><img src={Stick} alt="+"/><span>Stick</span></div>
                                <div data-chart="renko" onClick={this.changeChart.bind(this,'renko')}><img src={Renko} alt="+"/><span>Renko</span></div>
                                <div data-chart="kagi" onClick={this.changeChart.bind(this,'kagi')}><img src={Kagi} alt="+"/><span>Kagi</span></div>
                                <div data-chart="point" onClick={this.changeChart.bind(this,'point')}><img src={Point} alt="+"/><span>Point & Figure</span></div>
                            </div>
                        </div>
                        <div className="chart__option__block">
                            <img src={Compare} alt="+"/><span>Compare</span>
                        </div>
                        <div className="chart__option__block" onClick={this.OpenIndicatorPopup.bind(this)}>
                            <img src={IndicatorIcon} alt="+"/><span>Indicator</span>
                        </div>
                        <div className="chart__option__block">
                            <img src={IndicatorIcon} alt="+"/><span>Interactive</span>
                        </div>
                    </div>
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
                </div>
                
                <div className="stock__chart">
                    <StockChart key={1} data={this.props.data} range={this.state.range} width={this.state.chartWidth} height={this.state.chartHeight} zoom={this.state.zoom} chartType={this.state.chartType}/>
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
                <div className="chart__zoom" onClick={this.openZoomMode.bind(this)}>
                    <img src={Zoom} alt="zoom"/> 
                </div>
            </div>
            </>
        )
    }
}

export default ChartContainer;
