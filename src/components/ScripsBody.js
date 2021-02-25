import React from 'react';
import $ from 'jquery';
import Close from '../assets/icons/close.svg';
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

        // console.log(tempDataArray);

        this.setState({
            chartdata : tempDataArray
        });

    }

    openNews()
    {
        $('.business__news__section').css('transform','translateY(0%)');
        $('.bn__close').addClass('active');
        $('.bn__title').removeClass('active');
    }

    closeNews()
    {
        $('.business__news__section').css('transform','translateY(100%)');
        $('.bn__close').removeClass('active');
        $('.bn__title').addClass('active');
    }

    render()
    {
        return <div className="app__body">

            <div className="business__news__section">
                <div className="business__news__wrapper">
                    <div className="bn__title active" onClick={this.openNews.bind(this)}><p>Business News</p> <span>&#8673;</span></div>
                    <div className="bn__close" onClick={this.closeNews.bind(this)}><img src={Close} alt="x"/></div>
                    <div className="business__news__content">
                        <h1 style={{textAlign : 'center'}}>News Section</h1>
                    </div>
                </div>
            </div>
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
