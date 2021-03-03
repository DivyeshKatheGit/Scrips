import React from 'react';
import $ from 'jquery';
import UpperStockChart from './UpperStockChart';

export class UpperStock extends React.Component {

    constructor(props)
    {
        super(props);
        this.setInitialSize = this.setInitialSize.bind(this);
        this.state = {
            chartWidth : 0,
            chartHeight : 0
        }
    }

    componentDidMount()
    {
        this.setInitialSize();
    }

    setInitialSize()
    {
        let wd = $('.upper__stock__info').width();
        let ht = $('.upper__stock__info').height();
        this.setState({
            chartWidth : wd,
            chartHeight : ht
        });
    }

    render() {

        const {Name,Value,data} = this.props;
        return (
            <div className="upper__stock">
                <div className="upper__stock__info">
                    <p className="upper__stock__name">{Name}</p>
                    <p className="upper__stock__value">{Value}</p>
                    <p className="upper__stock__change">+456.46 <span>(+0.90%)</span></p>
                </div>
                <div className="upper__stock__chart">
                    <UpperStockChart 
                        data={data} 
                        width={this.state.chartWidth} 
                        height={this.state.chartHeight} 
                    />
                </div>
            </div>
        )
    }
}

export default UpperStock;
