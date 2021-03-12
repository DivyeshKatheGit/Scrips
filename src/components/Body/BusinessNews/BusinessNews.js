import React from 'react';
import { QuoteNav } from './QuoteNav';
import { Overview } from './Overview';
import { Financials } from './Financials/Financials';
import { FinanceRight } from './Financials/FinanceRight';
import { Technicals } from "./Technicals";
import { Feed } from "./Feed";

class BusinessNews extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            field: 'overview'
        }
    }

    render() {
        var field = this.state.field
        console.log('type = ', field)
        return (
            <>
                <div className="business__container" style={{ paddingLeft: 0 }}>
                        <div className="business__news__menu">
                            <QuoteNav onClick={(i, e) => this.setState({ field: e.target.dataset.field?.toLowerCase()?.replace(/ /g, '') })} activeClassName="active-nav-0">
                                <div active={field === 'overview'} data-field="overview">Overview</div>
                                <div active={field === 'financials'} data-field="financials">Financials</div>
                                <div data-field="valuation">Valuation</div>
                                <div active={field === 'technicals'} data-field="technicals">Technicals<span style={{fontSize:"12px"}}> (AI & ML)</span></div>
                                <div data-field="feed">Feed</div>
                            </QuoteNav>
                        </div>

                        <div className="business__news__box">
                            {field === 'overview' && <Overview />}
                            {field === 'financials' && <>
                                <div className="row">
                                    <div className="col-sm-7">
                                        <Financials />
                                    </div>
                                    <div className="col-sm-5">
                                        <div>
                                            <FinanceRight />
                                        </div>
                                    </div>
                                </div>

                            </>}
                            {/* {field === 'valuation' && <Valuation />} */}
                            {field === 'technicals' && <Technicals />}
                            {field === 'feed' && <Feed />}
                        </div>

                </div>
            </>
        )
    }
}

export { BusinessNews }