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
import { last ,toObject } from "react-stockcharts/lib/utils";
import { timeFormat } from 'd3-time-format';
import { TrendLine,EquidistantChannel,StandardDeviationChannel ,FibonacciRetracement ,GannFan} from "react-stockcharts/lib/interactive";
import {saveInteractiveNodes, getInteractiveNodes} from "../../exports/InteractiveUtils";
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from "react-stockcharts/lib/coordinates";
import {sma20,wma20,ema20,tma20,bb,macdCalculator,rsiCalculator,atrCalculator,slowSTO,fastSTO,fullSTO,fi,fiEMA,elder,elderImpulseCalculator,defaultSar,changeCalculator,compareCalculator} from '../../exports/MathematicalIndicators';
import {TrendLineAppearance,EquidistantChannelAppearance,StandardDeviationChannelAppearance,FibRetAppearance,GannFanAppearance} from '../../exports/InteractiveAppearance';

export class StockChart extends React.Component {


    constructor(props)
    {
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
        this.getInteractiveNodes = getInteractiveNodes.bind(this);
        this.saveCanvasNode = this.saveCanvasNode.bind(this);
        this.onDrawCompleteChart = this.onDrawCompleteChart.bind(this);

        this.state = {
            enableTrendLine : false,
            enableChannel : false,
            enableSDChannel : false,
            enableFibRet : false,
            enableGannFan : false,
            trends : [],
            channel : [],
            SDchannel : [],
            FibRet : [],
            GannFan : []
        };
    }

    saveCanvasNode(node) {
		this.canvasNode = node;
    }
    
    componentDidMount() {
        document.addEventListener("keyup", this.onKeyPress);        
    }
    
    componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyPress);
    }
    
    handleSelection(interactives) {
		const state = toObject(interactives, each => {
			return [
                'trends',
				each.objects,
			];
		});
        this.setState(state);
        // console.log(this.state);
    }

    onDrawCompleteChart(trends)
    {
        console.log(trends);
        console.log(this.props.interactiveType);
        if(this.props.interactiveType === 'line')
        {
            this.setState({
                enableTrendLine: false,
                trends : trends
            });
        }
        else if(this.props.interactiveType === 'channel')
        {
            this.setState({
                enableChannel: false,
                channel : trends
            });
        }
        else if(this.props.interactiveType === 'SDchannel')
        {
            this.setState({
                enableSDChannel: false,
                SDchannel : trends
            });
        }
        else if(this.props.interactiveType === 'FibRet')
        {
            this.setState({
                enableFibRet: false,
                FibRet : trends
            });
        }
        else if(this.props.interactiveType === 'GannFan')
        {
            this.setState({
                enableGannFan: false,
                GannFan : trends
            });
        }
        console.log('Drawing Done....',this.state);
    }

    onKeyPress(e) {
		const keyCode = e.which;
		console.log(keyCode);
		switch (keyCode) {
		case 46: { // DEL

			const trends = this.state.trends
                .filter(each => !each.selected);
            
            const channel = this.state.channel
                .filter(each => !each.selected);
        
            const SDchannel = this.state.SDchannel
                .filter(each => !each.selected);
                
            const FibRet = this.state.FibRet
                .filter(each => !each.selected);
            
            const GannFan = this.state.GannFan
				.filter(each => !each.selected);

			this.canvasNode.cancelDrag();
			this.setState({
                trends,
                channel,
                SDchannel,
                FibRet,
                GannFan
            });
			break;
		}
        case 27: { // ESC
            
            // console.log(this.TrendLine_1);
			// this.node_1.terminate();
			// this.node_3.terminate();
			this.canvasNode.cancelDrag();
			this.setState({
                enableTrendLine: false,
                enableChannel : false,
                enableSDChannel : false,
                enableFibRet : false,
                enableGannFan : false
			});
			break;
		}
		case 68:   // D - Draw trendline
        case 69: { // E - Enable trendline

            console.log(this.props);
            
            if(this.props.interactiveType === 'line')
            {
                this.setState({
                    enableTrendLine: true,
                    enableChannel : false,
                    enableSDChannel : false,
                    enableFibRet : false,
                    enableGannFan : false
                });
            }
            else if(this.props.interactiveType === 'channel')
            {
                this.setState({
                    enableTrendLine: false,
                    enableChannel : true,
                    enableSDChannel : false,
                    enableFibRet : false,
                    enableGannFan : false
                });
            }
            else if(this.props.interactiveType === 'SDchannel')
            {
                this.setState({
                    enableTrendLine: false,
                    enableChannel : false,
                    enableSDChannel : true,
                    enableFibRet : false,
                    enableGannFan : false
                });
            }
            else if(this.props.interactiveType === 'FibRet')
            {
                this.setState({
                    enableTrendLine: false,
                    enableChannel : false,
                    enableSDChannel : false,
                    enableFibRet : true,
                    enableGannFan : false
                });
            }
            else if(this.props.interactiveType === 'GannFan')
            {
                this.setState({
                    enableTrendLine: false,
                    enableChannel : false,
                    enableSDChannel : false,
                    enableFibRet : false,
                    enableGannFan : true
                });
            }
            else
            {
                this.setState({
                    enableTrendLine: false,
                    enableChannel : false,
                    enableSDChannel : false,
                    enableFibRet : false,
                    enableGannFan : false
                });
            }
			
			break;
        }
        default : {
            break;
        }
	    }
    }

    getIndicatorData(indicator,initialData)
    {
        let tempData,indicatorSeries,chartIndicatorY;

        if(indicator === 'SMA')
        {
            tempData = sma20(initialData);
            chartIndicatorY = (d) =>[d.open,d.close];
            indicatorSeries =  <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()} strokeWidth ={2}/>;
        }
        else if(indicator === 'WMA')
        {
            tempData = wma20(initialData);
            chartIndicatorY = (d) =>[d.open,d.close];
            indicatorSeries =  <LineSeries yAccessor={wma20.accessor()} stroke={wma20.stroke()} strokeWidth ={2}/>;
        }
        else if(indicator === 'EMA')
        {
            tempData = ema20(initialData);
            chartIndicatorY = (d) =>[d.open,d.close];
            indicatorSeries =  <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} strokeWidth ={2}/>;
        }
        else if(indicator === 'TMA')
        {
            tempData = tma20(initialData);
            chartIndicatorY = (d) =>[d.open,d.close];
            indicatorSeries =  <LineSeries yAccessor={tma20.accessor()} stroke={tma20.stroke()} strokeWidth ={2}/>;
        }
        else if(indicator === 'BB')
        {
            tempData = bb(initialData);
            chartIndicatorY = (d) =>[d.open,d.close];
            indicatorSeries =  <BollingerSeries yAccessor={d => d.bb} stroke={{top : '#c0392b' , middle : '#2c3e50' , bottom : '#c0392b'}} fill="#e67e22" opacity={0.5} />;
        }
        else if(indicator === 'MACD')
        {
            tempData = macdCalculator(initialData);
            chartIndicatorY = macdCalculator.accessor();
            indicatorSeries = <MACDSeries yAccessor={d => d.macd} stroke={{macd : '#ff7675' , signal : '#00b894'}} fill={{divergence : '#3498db'}} width={3} zeroLineOpacity={0.8} widthRatio={1}/>;
        }
        else if(indicator === 'RSI')
        {
            tempData = rsiCalculator(initialData);
            chartIndicatorY = [0,100];
            indicatorSeries = <RSISeries yAccessor={d => d.rsi} stroke={{line: "#000000" , top: "#000000" , middle: "#000000", bottom: "#000000", outsideThreshold: "#ff7675", insideThreshold: "#00b894"}} strokeWidth={{outsideThreshold : 2 , insideThreshold : 2 , top: 0.7, middle: 0.7, bottom: 0.7}}/>
        }
        else if(indicator === 'ATR')
        {
            tempData = atrCalculator(initialData);
            chartIndicatorY = atrCalculator.accessor();
            indicatorSeries = <LineSeries yAccessor={atrCalculator.accessor()} stroke='#2ecc71' strokeWidth={2}/>
        }
        else if(indicator === 'SOSlow')
        {
            tempData = slowSTO(initialData);
            chartIndicatorY = [0,100];
            indicatorSeries = <StochasticSeries yAccessor={d => d.slowSTO} stroke={{top : '#000000' , middle : '#000000' , bottom : '#000000' , dLine : '#e67e22' , kLine : '#1abc9c'}} refLineOpacity={0.7}/>;
        }
        else if(indicator === 'SOFast')
        {
            tempData = fastSTO(initialData);
            chartIndicatorY = [0,100];
            indicatorSeries = <StochasticSeries yAccessor={d => d.fastSTO} stroke={{top : '#000000' , middle : '#000000' , bottom : '#000000' , dLine : '#e67e22' , kLine : '#1abc9c'}} refLineOpacity={0.7}/>
        }
        else if(indicator === 'SOFull')
        {
            tempData = fullSTO(initialData);
            chartIndicatorY = [0,100];
            indicatorSeries = <StochasticSeries yAccessor={d => d.fullSTO} stroke={{top : '#000000' , middle : '#000000' , bottom : '#000000' , dLine : '#e67e22' , kLine : '#1abc9c'}} refLineOpacity={0.7}/>
        }
        else if(indicator === 'FI')
        {
            tempData = fiEMA(fi(initialData));
            chartIndicatorY = fi.accessor();
            indicatorSeries = <>
                <AreaSeries baseAt={scale => scale(0)} yAccessor={fiEMA.accessor()} fill='#e67e22' stroke='#e74c3c' />
                <StraightLine yValue={0} />
            </>
        }
        else if(indicator === 'ERI')
        {
            tempData = elder(initialData);  
            chartIndicatorY = [0,elder.accessor()];
            indicatorSeries = <ElderRaySeries yAccessor={elder.accessor()} bullPowerFill='#00b894' bearPowerFill='#ff7675' opacity={1} widthRatio={0.1}/>
        }
        else if(indicator === 'ERIBull')
        {
            tempData = elder(initialData); 
            chartIndicatorY = [0,d => elder.accessor()(d) && elder.accessor()(d).bullPower];
            indicatorSeries = <>
                <BarSeries yAccessor={d => elder.accessor()(d) && elder.accessor()(d).bullPower} baseAt={(xScale, yScale, d) => yScale(0)} fill="#00b894" width={3} opacity={1} />
                <StraightLine yValue={0} />
            </> 
        }
        else if(indicator === 'ERIBear')
        {
            tempData = elder(initialData); 
            chartIndicatorY = [0, d => elder.accessor()(d) && elder.accessor()(d).bearPower];
            indicatorSeries = <>
                <BarSeries yAccessor={d => elder.accessor()(d) && elder.accessor()(d).bullPower} baseAt={(xScale, yScale, d) => yScale(0)} fill="#ff7675" width={3} opacity={1} />
                <StraightLine yValue={0} />
            </> 
        }
        else if(indicator === 'ERIMP')
        {
            tempData = elderImpulseCalculator(macdCalculator(ema20(initialData))); 
            chartIndicatorY = macdCalculator.accessor();
            indicatorSeries = <MACDSeries yAccessor={d => d.macd} stroke={{macd : '#ff7675' , signal : '#00b894'}} fill={{divergence : '#3498db'}} width={3} zeroLineOpacity={0.8} widthRatio={1}/>
        }
        else if(indicator === 'PSAR')
        {
            tempData = defaultSar(initialData); 
            indicatorSeries = <SARSeries yAccessor={d => d.sar} fill={{
                falling: "#4682B4",
                rising: "#15EC2E",
            }}/>;
        }
        else if(indicator === 'vlmp')
        {
            tempData = ema20(initialData);
            chartIndicatorY = [d => [d.high, d.low]];
            indicatorSeries = <VolumeProfileSeries fill='#000000'/>;
        }

        return [tempData,indicatorSeries,chartIndicatorY];
    }

    getChartType(chartType,initialData)
    {

        let calculatedData,chartSeries;
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

        return [calculatedData,chartSeries];
    }

    getChartHeight(height,zoom,TotalCharts)
    {
        if(zoom)
        {
            return (height/TotalCharts)-((70+((TotalCharts-1)*10))/(TotalCharts));
        }
        else
        {
            return height;
        }
    }

    render() {

        const {data : initialData ,type,width,height,ratio,range,zoom,chartType,TotalCharts,IndicatorChartTypeArray,trendLineType} = this.props;

        // console.log(this.props);
        let dataVal;
        let xAccessorVal;
        let xScaleVal;
        let displayxAccessorVal;
        let calculatedData;
        let chartSeries;
        let start,end;
        let IndicatorsArray = [];


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

        [calculatedData,chartSeries] = this.getChartType(chartType,initialData);
        IndicatorChartTypeArray.map((i,index)=>{
            IndicatorsArray.push(this.getIndicatorData(i,initialData));
        });

        console.log(IndicatorsArray);

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
                ref={this.saveCanvasNode}
                width={width} 
                height={height} 
                ratio={ratio}
                margin = {margin}
                seriesName="IBM"
                postCalculator={compareCalculator}
                xScale={xScaleVal}
                xAccessor={xAccessorVal}
                displayXAccessor={displayxAccessorVal}
                xExtents={xExtents}
                data={dataVal}
                type={type}
            >   

                <Chart id={1} yExtents={[0,40]} height={this.getChartHeight(height,zoom,TotalCharts)}>

                    {/* <LineSeries yAccessor={d => d.compare}/>
					<LineSeries yAccessor={d => d.compare.close} stroke="#ff7f0e" />
					<LineSeries yAccessor={d => d.compare.IBMClose} stroke="#2ca02c"/>
                    <YAxis axisAt="right" orient="right" ticks={4} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10} tickFormat={format(".2f")}/>
                    <XAxis axisAt="bottom" orient="bottom" ticks={5} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10} showTicks={false} outerTickSize={0}/> */}
                    
                    {zoom && <>
                        {TotalCharts === 1 ? 
                            <>
                                <XAxis axisAt="bottom" orient="bottom" ticks={5} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10}/>
                                <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%d %b '%y")} fontFamily="Open Sans, sans-serif" fontSize={12}/>
                            </> :
                            <>
                                <XAxis axisAt="bottom" orient="bottom" ticks={5} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10} showTicks={false} outerTickSize={0}/>
                            </>
                        }
                        
                        <YAxis axisAt="right" orient="right" ticks={4} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10} tickFormat={format(".2f")}/>
                        <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} arrowWidth={0} fontFamily="Open Sans, sans-serif" fontSize={12}/>
                        
                    </>}
                    {chartSeries}

                    <TrendLine
						    ref={this.saveInteractiveNodes("Trendline", 1)}
						    enabled={this.state.enableTrendLine}
						    type={trendLineType}
						    snap={false}
						    snapTo={d => [d.high, d.low]}
						    onStart={() => console.log("START")}
						    onComplete={this.onDrawCompleteChart}
						    trends={this.state.trends}
                            currentPositionStroke='#f1c40f'
                            currentPositionStrokeWidth={4}
                            currentPositionRadius={5}
                            appearance={TrendLineAppearance}
                            hoverText={{
                                text : 'Select'
                            }}
					    />

                        <EquidistantChannel
                            ref={this.saveInteractiveNodes("EquidistantChannel", 1)}
                            enabled={this.state.enableChannel}
                            onStart={() => console.log("START")}
                            onComplete={this.onDrawCompleteChart}
                            channels={this.state.channel}
                            currentPositionStroke='#f1c40f'
                            currentPositionStrokeWidth={4}
                            currentPositionRadius={5}
                            appearance={EquidistantChannelAppearance}
                            hoverText={{
                                text : 'Select',
                                bgHeight: 'auto',
                                bgWidth: 'auto'
                            }}
					    />

                        <StandardDeviationChannel
                            ref={this.saveInteractiveNodes("StandardDeviationChannel", 1)}
                            enabled={this.state.enableSDChannel}
                            onStart={() => console.log("START")}
                            onComplete={this.onDrawCompleteChart}
                            channels={this.state.SDchannel}
                            currentPositionStroke='#f1c40f'
                            currentPositionStrokeWidth={4}
                            currentPositionRadius={5}
                            appearance={StandardDeviationChannelAppearance}
                        />

                        <FibonacciRetracement
                            ref={this.saveInteractiveNodes("FibonacciRetracement", 1)}
                            enabled={this.state.enableFibRet}
                            retracements={this.state.FibRet}
                            onComplete={this.onDrawCompleteChart}
                            currentPositionStroke='#f1c40f'
                            currentPositionStrokeWidth={4}
                            currentPositionRadius={5}
                            appearance= {FibRetAppearance}
                        />

                        <GannFan
                            ref={this.saveInteractiveNodes("GannFan", 1)}
                            enabled={this.state.enableGannFan}
                            onStart={() => console.log("START")}
                            onComplete={this.onDrawCompleteChart}
                            fans={this.state.GannFan}
                            currentPositionStroke='#f1c40f'
                            currentPositionStrokeWidth={4}
                            currentPositionRadius={5}
                            appearance= {GannFanAppearance}
                        />

                </Chart>

                {zoom && 
                    IndicatorsArray.map((i,index) => {
                        let series = i[1];
                        let yExtents = i[2];
                        let chartHeight = this.getChartHeight(height,zoom,TotalCharts);
                        let originHeight = (chartHeight*(index+1)) + (index+1)*10;
                        console.log(chartHeight,originHeight);
                        return <Chart class="my__chart" id={(index+2)} yExtents={yExtents} height={chartHeight} origin={(w,h)=>[0,originHeight]}>
                            {index === (IndicatorsArray.length-1) ? 
                                <>
                                    <XAxis axisAt="bottom" orient="bottom" ticks={5} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10}/>
                                    <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%d %b '%y")} fontFamily="Open Sans, sans-serif" fontSize={12}/>
                                </> : 
                                <>
                                    <XAxis axisAt="bottom" orient="bottom" ticks={5} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10} showTicks={false} outerTickSize={0}/>
                                </>
                                
                            }   
                            <YAxis axisAt="right" orient="right" ticks={4} tickStroke='#888888' stroke='#c8c8c8' fontWeight={600} fontFamily="Open Sans, sans-serif" fontSize={10} tickFormat={format(".2f")}/>
                            <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} arrowWidth={0} fontFamily="Open Sans, sans-serif" fontSize={12}/>
                            {series}
                            
                        </Chart>
                    })
                }

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
