import React from 'react';

class CreditRatings extends React.PureComponent{
    render(){
        return(
            <>
               <div>
                    <div><b>Credit ratings</b></div>
                   <div>
                        <div><a href="/">Bajaj Finance Limited:Ratings Reaffirmed</a></div>
                        <small className="text-secondary">5 Feb from crisil</small>
                   </div>
                   <div>
                        <div><a href="/">Bajaj Finance Limited: 'CRISIL AAA/Stable' assigned to NCD </a></div>
                        <small className="text-secondary">1 Dec 2020 from crisil</small>
                   </div>
                   <div>
                        <div><a href="/">Bajaj Finance Ltd.: Ratings reaffirmed; [ICRA]AAA(Stable)</a></div>
                   </div>
                   <div>
                        <div><a href="/">withdrawn on Rs. 1,120.00-crore NCD programme and Rs. 165.00-crore </a></div>
                   </div>
                   <div>
                        <div><a href="/">subordinated debt programme </a></div>
                        <small className="text-secondary">1 Oct 2020 from icra</small>
                   </div><div>
                        <div><a href="/">subordinated debt programme </a></div>
                        <small className="text-secondary">1 Oct 2020 from icra</small>
                   </div><div>
                        <div><a href="/">subordinated debt programme </a></div>
                        <small className="text-secondary">1 Oct 2020 from icra</small>
                   </div><div>
                        <div><a href="/">subordinated debt programme </a></div>
                        <small className="text-secondary">1 Oct 2020 from icra</small>
                   </div>
               </div>
            </>
        )
    }
}

export {CreditRatings}