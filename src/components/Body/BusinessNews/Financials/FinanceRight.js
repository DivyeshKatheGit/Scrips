import React from 'react';
import {CreditRatings} from './CreditRatings';
import {BusinessChart} from './BusinessChart';

class FinanceRight extends React.PureComponent{
    render(){
        return(
            <>
                 <div className="credit__ratings" style={{position:'fixed',height:'160px',overflow:'scroll',overflowX:'hidden',scrollBehavior:'smooth',fontSize : '14px'}}>
                   <CreditRatings />
                </div>
                <div className="business__chart" style={{position:'fixed',top:'250px',right : '0px',height:'50%',overflowY:'scroll',scrollBehavior:'smooth'}}>
                    <BusinessChart />
                    <BusinessChart />
                    <BusinessChart />
                </div>

            </>
        )
    }
}

export {FinanceRight}