import React from 'react';
import PropTypes from 'prop-types';
import {ChartCanvas,Chart} from 'react-stockcharts';
import {AreaSeries,LineSeries} from 'react-stockcharts/lib/series';
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {fitWidth} from 'react-stockcharts/lib/helper';
import { last } from "react-stockcharts/lib/utils";


export class UpperStockChart extends React.Component {

    render() {

        const { data : initialData, type, width, height , ratio } = this.props;


        let dataVal;
        let xAccessorVal;
        let xScaleVal;
        let displayxAccessorVal;
        let start,end;



        const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
            const {
                data,
                xScale,
                xAccessor,
                displayXAccessor,
            } = xScaleProvider(initialData);
        
        dataVal = data;
        xAccessorVal = xAccessor;
        xScaleVal = xScale;
        displayxAccessorVal = displayXAccessor;

        start = xAccessorVal(last(dataVal));
        let weeks = Math.floor((6*30)/4);
        let days = (6*30) - (weeks*2);
        end = xAccessorVal(dataVal[Math.max(0,dataVal.length - days)]);
        const xExtents = [start,end];


        return (
            <ChartCanvas 
                ratio={ratio} 
                width={width} 
                height={height}
				margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
				seriesName="MSFT"
				data={dataVal} 
                type={type}
				xAccessor={xAccessorVal}
                displayXAccessor={displayxAccessorVal}
				xScale={xScaleVal}
				xExtents={xExtents}
			>
				<Chart id={0} yExtents={d=> d.open}>
                    <defs>
						<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
							<stop offset="0%" stopColor="#ffffff" stopOpacity={1.0} />
							<stop offset="70%" stopColor="#26A69A" stopOpacity={1.0} />
						</linearGradient>
					</defs>
					<AreaSeries yAccessor={d => d.close} strokeWidth={2} stroke="#258B81" fill="url(#MyGradient)"/>
				</Chart>
			</ChartCanvas>
        )
    }
}

UpperStockChart.propTypes = {
    data : PropTypes.array.isRequired,
    width : PropTypes.number.isRequired,
    ratio : PropTypes.number.isRequired,
    type : PropTypes.oneOf(['svg','hybrid']).isRequired
};

UpperStockChart.defaultProps ={
    type : 'svg'
}

UpperStockChart = fitWidth(UpperStockChart);

export default UpperStockChart;
