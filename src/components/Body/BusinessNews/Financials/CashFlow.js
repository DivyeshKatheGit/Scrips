import React from 'react';
import {CreateTable} from './CreateTable';

class CashFlow extends React.PureComponent{
    render(){
        return(
            <>
               <div className="container-fluid" style={{background:'',paddingLeft:'35px'}}>
                   <div>
                       <b>CashFlow </b> Detailed
                   </div>
                    <CreateTable type={this.props.type} field={this.props.field} stockcode={this.props.stockcode} />
               </div>
            </>
        )
    }

}

export {CashFlow};