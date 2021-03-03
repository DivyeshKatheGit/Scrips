import { ema, wma, sma, tma , bollingerBand , macd , rsi , atr , stochasticOscillator , forceIndex, elderRay , elderImpulse , sar , change , compare} from "react-stockcharts/lib/indicator";

const sma20 = sma()
        .options({windowSize : 20 , sourcePath: "close"})
        .skipUndefined(true)
        .merge((d,c) => {d.sma20 = c;})
        .accessor(d => d.sma20)
        .stroke('#16a085');

const wma20 = wma()
        .options({windowSize : 20 , sourcePath: "close"})
        .skipUndefined(true)
        .merge((d,c) => {d.wma20 = c;})
        .accessor(d => d.wma20)
        .stroke('#8e44ad');

const ema20 = ema()
        .options({windowSize : 20 , sourcePath: "close"})
        .skipUndefined(true)
        .merge((d,c) => {d.ema20 = c;})
        .accessor(d => d.ema20)
        .stroke('#d35400');

const tma20 = tma()
        .options({windowSize : 20 , sourcePath: "close"})
        .skipUndefined(true)
        .merge((d,c) => {d.tma20 = c;})
        .accessor(d => d.tma20)
        .stroke('#f1c40f');

const bb = bollingerBand()
			.merge((d, c) => {d.bb = c;})
            .accessor(d => d.bb);
            
const macdCalculator = macd()
			.options({
				fast: 10,
				slow: 26,
				signal: 9,
			})
			.merge((d, c) => {d.macd = c;})
            .accessor(d => d.macd);
        
const rsiCalculator = rsi()
			.options({ windowSize: 10 })
			.merge((d, c) => {d.rsi = c;})
            .accessor(d => d.rsi);
            
const atrCalculator = atr()
			.options({ windowSize: 10 })
			.merge((d, c) => {d.atr = c;})
            .accessor(d => d.atr);
            
const slowSTO = stochasticOscillator()
			.options({ windowSize: 10, kWindowSize: 3 })
			.merge((d, c) => {d.slowSTO = c;})
            .accessor(d => d.slowSTO);
            
const fastSTO = stochasticOscillator()
			.options({ windowSize: 10, kWindowSize: 1 })
			.merge((d, c) => {d.fastSTO = c;})
            .accessor(d => d.fastSTO);
            
const fullSTO = stochasticOscillator()
			.options({ windowSize: 10, kWindowSize: 3, dWindowSize: 4 })
			.merge((d, c) => {d.fullSTO = c;})
            .accessor(d => d.fullSTO);
            
const fi = forceIndex()
			.merge((d, c) => {d.fi = c;})
            .accessor(d => d.fi);
            
const fiEMA = ema()
			.id(1)
			.options({ windowSize: 10, sourcePath: "fi" })
			.merge((d, c) => {d.fiEMA13 = c;})
            .accessor(d => d.fiEMA13);

const elder = elderRay();

const elderImpulseCalculator = elderImpulse()
			.macdSource(macdCalculator.accessor())
            .emaSource(ema20.accessor());
            
const defaultSar = sar()
			.options({
                accelerationFactor : 0.02, 
                maxAccelerationFactor : 0.2
			})
			.merge((d, c) => {d.sar = c;})
            .accessor(d => d.sar);
            
const changeCalculator = change();


const compareCalculator = compare()
        .options({
            basePath : 'close',
            mainKeys : ['open','high','low','close'],
            compareKeys : ['close','IBMClose']
        })
        .accessor(d => d.compare)
		.merge((d, c) => { d.compare = c; });


export {sma20,wma20,ema20,tma20,bb,macdCalculator,rsiCalculator,atrCalculator,slowSTO,fastSTO,fullSTO,fi,fiEMA,elder,elderImpulseCalculator,defaultSar,changeCalculator,compareCalculator}