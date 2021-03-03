import React from 'react';
import UpperStock from './UpperStock';

export class TopStocks extends React.Component {
    render() {

        const {data} = this.props;

        return (
            <div className="top__stocks">
                <UpperStock Name="BSE SENSEX" Value="51,238.15" data={data}/>
                <UpperStock Name="Nifty 50" Value="15,135.85" data={data}/>
                <UpperStock Name="USD/INR" Value="72.2600" data={data}/>
                <UpperStock Name="Dow" Value="31,961.86" data={data}/>
                
            </div>
        )
    }
}

export default TopStocks;
