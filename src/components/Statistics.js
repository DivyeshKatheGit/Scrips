import React from 'react'

export class Statistics extends React.Component {
    render() {

        const {name,value} = this.props;

        return (
            <div className="statistics">
                <p className="ks__name">{name}</p>
                <p className="ks__value">{value}</p>
            </div>
        )
    }
}

export default Statistics;
