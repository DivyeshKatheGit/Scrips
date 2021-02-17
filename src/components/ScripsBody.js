import React from 'react'
import CashPosition from './CashPosition';
import ChartContainer from './ChartContainer';
import KeyStatistics from './KeyStatistics';
import { timeParse } from "d3-time-format";
import DataArray from '../data/MSFT';

class ScripsBody extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            chartdata : []
        }
    }

    componentDidMount()
    {
        this.loadData();
    }

    async loadData()
    {

        console.log('load');
        let tempDataArray = [];
        const parseDate = timeParse('%Y-%m-%d');
        DataArray.forEach(d =>{
            let dobj = {
                date : parseDate(d[0]),
                open : parseFloat(d[1]),
                high : parseFloat(d[2]),
                low : parseFloat(d[3]),
                close : parseFloat(d[4]),
                volume : parseInt(d[5])
            }

            tempDataArray.push(dobj);

        });

        console.log(tempDataArray);

        this.setState({
            chartdata : tempDataArray
        });

    }
    render()
    {
        return <div className="app__body">
            <div className="app__body__left">
                <ChartContainer data={this.state.chartdata}/>
                <KeyStatistics />
            </div>
            <div className="app__body__right">
                <CashPosition />
            </div>
        </div>
    }
}

export default ScripsBody;
