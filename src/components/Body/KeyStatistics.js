import React from 'react';
import Statistics from './Statistics';

export class KeyStatistics extends React.Component {
    render() {
        return (
            <div className="key__statistics">
                <div className="ks__title">
                    <p>Key Statistics</p>
                </div>
                <div className="ks__container">
                    <div className="ks__container__half">
                        <div className="ks__slot">
                            <Statistics name="Previous Close" value="1,583.75"/>
                            <Statistics name="Open" value="1,582.00"/>
                            <Statistics name="Day's Range" value="1,564.20 - 1,597.80"/>
                            <Statistics name="52-week range" value="738.75 - 1,631.65"/>
                        </div>
                        <div className="ks__slot">
                            <Statistics name="Volume" value="57,91,642"/>
                            <Statistics name="Avg. volume" value="10,487,012"/>
                            <Statistics name="Bid" value="1,571.05"/>
                            <Statistics name="Ask" value="1,571.95"/>
                        </div>
                        <div className="ks__slot">
                            <Statistics name="Volume" value="57,91,642"/>
                            <Statistics name="Avg. volume" value="10,487,012"/>
                            <Statistics name="Bid" value="1,571.05"/>
                            <Statistics name="Ask" value="1,571.95"/>
                        </div>
                    </div>
                    <div className="ks__container__full">
                        <div className="ks__slot">
                            <Statistics name="Previous Close" value="1,583.75"/>
                            <Statistics name="Open" value="1,582.00"/>  
                        </div>
                        <div className="ks__slot">
                            <Statistics name="Day's Range" value="1,564.20 - 1,597.80"/>
                            <Statistics name="52-week range" value="738.75 - 1,631.65"/>
                        </div>
                        <div className="ks__slot">
                            <Statistics name="Volume" value="57,91,642"/>
                            <Statistics name="Avg. volume" value="10,487,012"/>  
                        </div>
                        <div className="ks__slot">
                            <Statistics name="Bid" value="1,571.05"/>
                            <Statistics name="Ask" value="1,571.95"/>
                        </div>
                        <div className="ks__slot">
                            <Statistics name="Volume" value="57,91,642"/>
                            <Statistics name="Avg. volume" value="10,487,012"/>   
                        </div>
                        <div className="ks__slot">
                            <Statistics name="Bid" value="1,571.05"/>
                            <Statistics name="Ask" value="1,571.95"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default KeyStatistics;
