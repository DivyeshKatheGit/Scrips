import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import {scaleTime} from 'd3-scale';
import { format } from 'd3-format';
import {ChartCanvas,Chart} from 'react-stockcharts';
import {XAxis,YAxis} from 'react-stockcharts/lib/axes';
import {LineSeries,AreaSeries,BarSeries,CandlestickSeries,ScatterSeries ,OHLCSeries,KagiSeries,RenkoSeries,PointAndFigureSeries, SquareMarker,CircleMarker , BollingerSeries , MACDSeries , RSISeries ,StochasticSeries ,StraightLine ,ElderRaySeries , SARSeries , VolumeProfileSeries} from 'react-stockcharts/lib/series';
import { pointAndFigure ,kagi,renko} from "react-stockcharts/lib/indicator";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {fitWidth} from 'react-stockcharts/lib/helper';
import { last } from "react-stockcharts/lib/utils";
import { timeFormat } from 'd3-time-format';
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from "react-stockcharts/lib/coordinates";

export class StockChart extends React.Component {
    render() {

        const {data : initialData,type,width,height,ratio,range,zoom,chartType} = this.props;

        // console.log(this.props);

        let dataVal;
        let xAccessorVal;
        let xScaleVal;
        let displayxAccessorVal;
        let calculatedData;
        let chartSeries;
        let start,end;

        // const height = $('.stock__chart').height();

        console.log(height,width);

        let margin;

        if(zoom)
        {
            margin = {left: 0, right: 60, top:50, bottom: 20};
        }
        else
        {
            margin = {left: 0, right: 20, top:20, bottom: 20};
        }
        var gridHeight = height - margin.top - margin.bottom;
        var gridWidth = width - margin.left - margin.right;

        const showGrid = true;

        const gridProps = {
            tickStrokeDasharray: 'Solid',
            tickStrokeOpacity: 0.1,
            tickStrokeWidth: 1 
        }

		const yGrid = showGrid ? { 
            innerTickSize: -1 * gridWidth
        } : {};
		const xGrid = showGrid ? { 
            innerTickSize: -1 * gridHeight
        } : {};

        dataVal = initialData;
        // xAccessorVal = d => d.date;
        // xScaleVal = scaleTime();
        // displayxAccessorVal = d => d.date;        


        if(chartType === 'line'){
            calculatedData = initialData;
            chartSeries = <LineSeries yAccessor ={d =>d.open} strokeWidth ={2} stroke="#64b5f6"/>;
        }
        else if(chartType === 'rangeArea')
        {
            calculatedData = initialData;
            chartSeries = <LineSeries yAccessor ={d =>d.open} strokeWidth ={30} stroke="#64b5f6"/>
        }
        else if(chartType === 'jumpLine')
        {
            calculatedData = initialData;
            chartSeries = <ScatterSeries yAccessor ={d =>d.open} marker={SquareMarker} markerProps={{ width : 8 , height : 1 , fill : '#00A0E3' , stroke : '#00A0E3' , strokeWidth : 1}}/>
        }
        else if(chartType === 'column')
        {
           
            calculatedData = initialData;
            chartSeries = <BarSeries yAccessor ={d =>d.open} width={5} stroke={false} fill='#00a0e3'/>
        }
        else if(chartType === 'stick')
        {
            calculatedData = initialData;
            chartSeries = <BarSeries yAccessor ={d =>d.open} width={1} stroke={true} fill='#00a0e3'/>
        }
        else if(chartType === 'candlestick')
        {
            calculatedData = initialData;
            chartSeries = <CandlestickSeries stroke='#ffffff' fill={d => d.close>d.open ? '#00A0E3' : '#EF6C00'} wickStroke={d => d.close>d.open ? '#00A0E3' : '#EF6C00'} opacity = '1'/>
        }
        else if(chartType === 'marker')
        {
            calculatedData = initialData;
            chartSeries = <ScatterSeries yAccessor ={d =>d.open} marker={CircleMarker} markerProps={{r : 4 , fill : '#00A0E3' , stroke : '#00A0E3' , strokeWidth : 0.1}}/>
        }
        else if(chartType === 'ohlc')
        {
            calculatedData = initialData;
            chartSeries = <OHLCSeries stroke={d => d.close>d.open ? '#00A0E3' : '#EF6C00'} clip={true}/>
        }
        else if(chartType === 'kagi')
        {

            const kagiCal = kagi();
            calculatedData = kagiCal(initialData);
            chartSeries = <KagiSeries  strokeWidth={1} stroke={{yang : '#00A0E3' , yin : '#EF6C00'}}/>
        }
        else if(chartType === 'renko')
        {

            const renkoCal = renko();
            calculatedData = renkoCal(initialData);
            chartSeries = <RenkoSeries yAccessor= {d => ({ open: d.open, high: d.high, low: d.low, close: d.close })}  stroke={{up : '#000000' , down : '#000000'}} fill={{up : '#00A0E3' , down : '#EF6C00' , partial : '#000000'}} clip={true}/>
        }
        else if(chartType === 'point')
        {

            const pointCal = pointAndFigure();
            calculatedData = pointCal(initialData);
            chartSeries = <PointAndFigureSeries fill={{up : '#EF6C00' , down : '#81ecec'}} stroke= {{ up: "#EF6C00", down: "#00A0E3" }}/>
        }
        else{
            calculatedData = initialData;
            chartSeries = <AreaSeries yAccessor ={d =>d.open} strokeWidth ={2} stroke="#64b5f6" fill='#00a0e3'/>
        }

        const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
            const {
                data,
                xScale,
                xAccessor,
                displayXAccessor,
            } = xScaleProvider(calculatedData);

        dataVal = data;
        xAccessorVal = xAccessor;
        xScaleVal = xScale;
        displayxAccessorVal = displayXAccessor;


        //check range
        if(range === '1D')
        {
            end = xAccessorVal(dataVal[Math.max(0,dataVal.length - 2)]);
        }
        else if(range === '5D')
        {
            end = xAccessorVal(dataVal[Math.max(0,dataVal.length - 6)]);
        }
        else if(range === '1M')
        {
            let weeks = Math.floor((1*30)/4);
            let days = (1*30) - (weeks*2);
            end = xAccessorVal(dataVal[Math.max(0,dataVal.length - days)]);
        }
        else if(range === '6M')
        {
            let weeks = Math.floor((6*30)/4);
            let days = (6*30) - (weeks*2);
            end = xAccessorVal(dataVal[Math.max(0,dataVal.length - days)]);
        }
        else if(range === 'YTD')
        {
            let weeks = Math.floor((1*30)/4);
            let days = (1*30) - (weeks*2);
            end = xAccessorVal(dataVal[Math.max(0,dataVal.length - days)]);
        }
        else if(range === '1Y')
        {
            let weeks = Math.floor((12*30)/4);
            let days = (12*30) - (weeks*2);
            end = xAccessorVal(dataVal[Math.max(0,dataVal.length - days)]);
        }
        else if(range === '5Y')
        {
            let weeks = Math.floor((60*30)/4);
            let days = (60*30) - (weeks*2);
            end = xAccessorVal(dataVal[Math.max(0,dataVal.length - days)]);
        }
        else
        {
            end = xAccessorVal(dataVal[0]);
        }



        start = xAccessorVal(last(dataVal));
        const xExtents = [start,end];


        return (
            <div>
                <ChartCanvas 
                width={width} 
                height={height} 
                ratio={ratio}
                margin = {margin}
                seriesName="IBM"
                xScale={xScaleVal}
                xAccessor={xAccessorVal}
                displayXAccessor={displayxAccessorVal}
                xExtents={xExtents}
                data={dataVal}
                type={type}
            >   

                <Chart id={1} yExtents={[0,40]}>

                    <XAxis axisAt="bottom" orient="bottom" ticks={5} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10}/>
                    {zoom && <>
                        <YAxis axisAt="right" orient="right" ticks={4} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10} tickFormat={format(".2f")}/>
                        <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} arrowWidth={0} fontFamily="Open Sans, sans-serif" fontSize={12}/>
                        <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%d %b '%y")} fontFamily="Open Sans, sans-serif" fontSize={12}/>
                    </>}
                    {/* <LineSeries yAccessor ={d =>d.open} strokeWidth ={2} stroke="#00a0e3"/> */}
                    {chartSeries}

                </Chart>

                {zoom && <CrossHairCursor />}

            </ChartCanvas>
            </div>
        )
    }
}

StockChart.propTypes = {
    data : PropTypes.array.isRequired,
    width : PropTypes.number.isRequired,
    ratio : PropTypes.number.isRequired,
    type : PropTypes.oneOf(['svg','hybrid']).isRequired
};

StockChart.defaultProps ={
    type : 'svg'
}

StockChart = fitWidth(StockChart);

export default StockChart;
