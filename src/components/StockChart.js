import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import {scaleTime} from 'd3-scale';
import {ChartCanvas,Chart} from 'react-stockcharts';
import {XAxis,YAxis} from 'react-stockcharts/lib/axes';
import {LineSeries,AreaSeries} from 'react-stockcharts/lib/series';
import {fitWidth} from 'react-stockcharts/lib/helper';
import { last } from "react-stockcharts/lib/utils";
import { timeFormat } from 'd3-time-format';

export class StockChart extends React.Component {
    render() {

        const {data : initialData,type,width,height,ratio,range,zoom} = this.props;

        // console.log(this.props);

        let dataVal;
        let xAccessorVal;
        let xScaleVal;
        let displayxAccessorVal;

        // const height = $('.stock__chart').height();

        console.log(height,width);

        let margin;

        if(zoom)
        {
            margin = {left: 0, right: 30, top:20, bottom: 25};
        }
        else
        {
            margin = {left: 0, right: 40, top:20, bottom: 25};
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
        xAccessorVal = d => d.date;
        xScaleVal = scaleTime();
        displayxAccessorVal = d => d.date;

        let start = xAccessorVal(last(dataVal));
        let end;

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

                <Chart id={1} yExtents={d =>d.open}>

                    <XAxis axisAt="bottom" orient="bottom" ticks={5} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10}/>
                    {zoom && <YAxis axisAt="right" orient="right" ticks={4} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10} />}
                    <AreaSeries yAccessor ={d =>d.open} strokeWidth ={2} stroke="#00a0e3" fill="#00a0e3"/>

                </Chart>


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
