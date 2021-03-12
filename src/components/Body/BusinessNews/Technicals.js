import React from 'react';
import { Row, Col, InputNumber, Slider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import AI_ML_GENIE_LOGO from "../../../assets/icons/AIML.png";

function EarningValuation(props) {
    function Nu(a) { return Number(a) }
    function Cre({ title, value, max, min }) {
        value = Nu(value); 
        max = Nu(max) || value + 100; 
        min = Nu(min) || 0;
        const [val, setValue] = React.useState(value);
        return (
            <>
                <Row style={{ marginTop: 3, marginRight: 0, paddingRight: 0 , paddingLeft : '10px' }}>
                    {title && <p style={{ padding: 6 }}>{title}</p>}
                    <Col md={14} sm={20} xs={13}>
                        <div style={{ padding: 2 }}>
                            <Slider
                                progress
                                min={min}
                                max={max}
                                value={val}
                                onChange={value => { setValue(Nu(value)) }}
                            />
                        </div>
                    </Col>
                    <Col md={2} sm={2} xs={7} style={{ width: 100 }}>
                        <InputNumber
                            min={min}
                            max={max}
                            value={val}
                            onChange={value => { setValue(Nu(value)) }}
                            size="xs"
                            placeholder="xs"
                        />
                    </Col>
                </Row>
            </>
        )
    }
    let d = props.data
    if (d.length && typeof d == 'object') {
        return (
            <>
                <h5 style={{ fontWeight: 'bold', padding: 10 }}>Earnings Valuation</h5>
                {
                    d.map((e, i) => {
                        if (typeof e == 'object' && !Array.isArray(e)) {
                            return <Cre key={i + Math.random()} {...e} />
                        } else return null
                    })
                }
                <div style={{ padding: '20px 0 0 0',fontSize:'14px' }}>
                    The above values have been set according to our estimates.<br />
                    You may set them as necessary according to your views.
                </div>
            </>
        )
    }
    return null
}

function PriceUpAndLoBounds(props) {
    const Slid = ({ text, price }) => {
        return (
            <>
                <div className="row pt-2 pb-3">
                    {
                        text.map((e, i) => {
                            return (
                                <>
                                    <div className="col" key={i + e + Math.random()}>
                                        {e}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="row">
                    {
                        text.map((e, i) => {
                            let p = price[i],
                                t = typeof p
                            return (
                                <>
                                    <div className={`col text-left align-self-end`} key={i + Math.random() * 6} style={{padding : '0px'}}>
                                        <div style={{ marginBottom: 20 * i , fontSize : '14px' , fontWeight : 700}} className="text-left">
                                            {t === 'object' && p[1]}
                                            <div style={{ height: !i ? 20 : 30 * i}} className="PriceUpAndLoBounds"></div>
                                            {t !== 'object' ? p : p[0]}
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </>
        )
    }
    if (props.data) {
        return (
            <>
                <Row>
                    <Col md={13} lg={16}>
                        <h6>Price Upper and Lower Bounds</h6>
                        <div className="container">
                            <Slid {...props.data} />
                        </div>
                    </Col>
                    <Col md={8} lg={8} >
                        <h6>Valuation Confidence</h6>
                        <div className="pt-4" style={{ marginLeft: 70, height: 330 }}>
                            <Slider
                                min={0}
                                step={10}
                                max={100}
                                graduated
                                vertical
                                progress
                                renderMark={mark => !mark ? "High" : mark === 100 ? "Low" : null}
                            />
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
    return null
}





class CustomSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.active - 1 || 0,
        };
    }
    render() {
        const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            printText = this.props.printText || ['Strong Sell', 'Sell', 'Neutral', 'Buy', 'Strong Buy'],
            steps = printText.length,
            { value } = this.state;
        return (
            <div className="pt-4">
                <div style={{ width: this.props.width || 300, marginLeft: 20 }}>
                    <Slider
                        min={0}
                        max={steps - 1}
                        value={value}
                        className="custom-slider-Technical"
                        // handleStyle={{
                        //     backgroundColor: '#2196f3',
                        //     color: '#fff',
                        //     fontSize: 12,
                        //     width: 32,
                        //     height: 22
                        // }}
                        graduated
                        tooltip={false}
                        // handleTitle={labels[value]}
                        renderMark={n =>
                            <span key={n + Math.random() + 5} style={{ fontWeight: n === value ? "bold" : 'normal' , fontSize : '14px' }}>{printText[n]}</span>
                        }
                        onChange={v => { this.setState({ value: v }) }}
                    />
                </div>
            </div>
        );
    }
}

class TechnicalsSecondSection extends React.PureComponent {
    constructor(props) {
        super(props);
        this.firstSec = this.firstSec.bind(this)
        this.secSec = this.secSec.bind(this)
    }
    firstSec() {
        return (
            <>
                <div className="pb-5">
                    <h6>Short Term Technical View</h6>
                    <CustomSlider />
                </div>
                <div className="pb-5">
                    <h6>Long Term Technical View</h6>
                    <CustomSlider />
                </div>
                <div className="pb-5">
                    <h6>Relative Strength Index (RSI)</h6>
                    <CustomSlider printText={["Sell", "Buy"]} active={1} width={100} />
                </div>
                <div className="pb-5">
                    <h6>Moving Average Convergence Divergence (MACD)</h6>
                    <CustomSlider printText={["Sell", "Buy"]} active={1} width={100} />
                </div>
            </>
        )
    }

    secSec() {
        return (
            <>
                <div className="p-3 mt-4 border rounded" style={{fontSize : '14px'}}>
                    <p>  5 Day MA is&nbsp;
                <b> lower than </b>
                20 Day MA.
            </p>
                    <p>
                        10 Day MA is&nbsp;
                <b> lower than </b>
                20 Day MA
            </p>
                </div>
                <div className="p-3 mt-4 border rounded" style={{fontSize : '14px'}}>
                    <p>  5 Day MA is&nbsp;
                <b> lower than </b>
                20 Day MA.
            </p>
                    <p>
                        10 Day MA is&nbsp;
                <b> lower than </b>
                20 Day MA
            </p>
                </div>
            </>
        )
    }
    render() {
        return (
            <>
                <div>
                    <div className="row">
                        <div className="col-5 mr-5 ">
                            {this.firstSec()}
                        </div>

                        <div className="col-2">
                            {this.secSec()}
                        </div>

                        <div className="col-5 align-self-start ">
                            <div>
                                <div className="pb-4 text-center">
                                    <h6>Overall Technical View</h6>
                                    <div className="p-3">
                                        <CustomSlider />
                                    </div>
                                    <div className="mt-2 p-2">
                                        <p className='border rounded w-75 p-1' style={{ marginLeft: 50 , fontSize : '14px' }} >
                                            This indicator is based on the results of the
                                            four indicators on the left hand side.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="container pt-5">
                                <div className="row justify-content-center text-center">
                                    <div className="col-8 h5" style={{ fontWeight: 'bold' }}>
                                        AI & ML Genie
                                    </div>
                                </div>
                                <div className="row pt-3">
                                    <div className="col-4 p-0 m-0">
                                        <img src={AI_ML_GENIE_LOGO} width={150} className="img-fluid" alt="AI_ML_GENIE_LOGO" />
                                    </div>
                                    <div className="col text-center p-0 m-0" style={{ fontSize: 20 }}>
                                        <div>
                                            Price Target<br />
                                                for<br />
                                            <b>10 Days</b><br />
                                                is
                                            </div>
                                        <h2 style={{ fontWeight: 'bold' }}>Rs. 1,325</h2>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}





const data_EarningValuation = [
    {
        title: 'Net Profit Growth',
        value: 78,
        max: 80,
        min: 70
    },
    {
        title: 'Earnings per Share Growth',
        value: 60,
        max: 100,
        min: 0
    }, {
        title: 'ROE',
        value: 50,
        max: 100,
        min: 0
    }, {
        title: 'Earnings multiple- Higher Bound',
        value: 40,
        max: 100,
        min: 0
    }, {
        title: 'Earnings multiple- Lower Bound',
        value: 30,
        max: 100,
        min: 0
    }, {
        title: 'Interest Rate/ Discount Factor',
        value: 20,
        max: 100,
        min: 0
    },

]

const data_PriceUpAndLoBounds = {
    text: ['T', 'T+1', 'T+2', 'T+3', 'T+4', 'T+5'],
    price: [100.32, [100.32, 100.32], [100.32, 100.32], [100.32, 100.32], [100.32, 100.32], [100.32, 100.32]] //[ BOTTOM , TOP ]
}

const data_ValuationMethodology = [
    "Cumulative growth of TTM net profit is calculated based on past 3 years growth rate.",
    "TTM ROE is taken into consideration for calculation of earnings multiple higher bounds and lower bounds.",
    "Based on market history, 1x ROE and 2x ROE is taken as earnings multiple higher and lower bounds.",
    "Current repo rate from the RBI is taken as proxy for the discount factor.",
]

class Technicals extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            EarningValuation: data_EarningValuation,
            PriceUpAndLoBounds: data_PriceUpAndLoBounds,
            ValuationMethodology: data_ValuationMethodology
        }
    }
    render() {
        return (
            <>
                <Row style={{paddingLeft:'35px'}}>
                    <Col md={10}>
                        <EarningValuation data={this.state.EarningValuation} />
                    </Col>
                    <Col md={10} lg={14}>
                        <PriceUpAndLoBounds data={this.state.PriceUpAndLoBounds} />
                        <div className="container mt-4 p-3" style={{ border: '1px solid black', borderRadius: 10 , marginLeft : 0 , width : '90%'}}>
                            <p style={{fontSize : '16px' , fontWeight : 700}}>Valuation Methodology</p>
                            <div style={{fontSize : '12px' , fontWeight : 500}}>
                                {(this.state.ValuationMethodology || []).map((e, i) => <div key={i + 9 + Math.random()}>{i + 1}.&nbsp;{e}</div>)}
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* TechnicalsSecondSection */}
                <div style={{padding : '40px 0 20px 45px'}}>
                    <TechnicalsSecondSection />
                </div>

            </>
        )
    }
}


export { Technicals }
