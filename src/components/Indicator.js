import React from 'react';

export class Indicator extends React.Component {
    render() {

        const {name} = this.props;

        return (
            <div className="Indicator__option__block">
                <p>{name}</p>
                <div>
                    <button>Add Indicator</button>
                    <span>?</span>
                </div>
            </div>
        )
    }
}

export default Indicator;
