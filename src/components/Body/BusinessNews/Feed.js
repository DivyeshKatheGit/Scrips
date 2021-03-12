import React from 'react';
import logo from "../../../assets/icons/AIML.png";

function CreateBox(props) {
    return (
        <>
            <div className="border rounded mt-3 p-2" style={{ boxShadow: '0 0 2px' }}>
                {props.data}
            </div>
        </>
    )
}


function News(props) {
    const [elem, showEle] = React.useState(null)
    if (props.data) {
        return (
            <>
                {
                    (props.data || []).map((e, i) => {
                        let l = e.content.length, textL = e.textLength || 300, g = l > textL, t = g && e.content.slice(0, textL)
                        return (
                            <div key={i + Math.random() + 5} className='row pb-5'>
                                <small className="text-secondary">{e.time}</small>
                                <h5 style={{ fontWeight: 'bold' }}>{e.heading}</h5>
                                <div onClick={(d) => {
                                    props.onClick === 'function' && props.onClick(e.content, d);
                                    showEle(i === elem ? null : i)
                                    console.log("eshso = ", i)
                                }}>
                                    {elem === i ? <p>{e.content}</p> : <p>{t}{g && " ..."}</p>}
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    return null
}

const data_News = [
    {
        time: "Reuters 2 hours ago",
        heading: "Ahead of Market: 12 things that will decide stock action on Monday",
        content: `NEW DELHI: Nifty formed a Spinning Top on the daily chart and a Shooting Star on the weekly scale on Friday as the headline equity index returned to green after two consecutive red candles on a weekly basis. Going ahead, 15,000-15,050 will be the immediate hurdle zone to watch out for. Once that gets taken out, the index will be set to test the swing high of 15,273. On the other hand, 14,860-14,800 will act as a crucial support zone for the index, said Gaurav Ratnaparkhi, Senior Technic`,
        textLength: 100, //optional default 300
        onClick: () => { } //optional
    },
    {
        time: "Reuters 2 hours ago",
        heading: "Ahead of Market: 12 things that will decide stock action on Monday",
        content: `NEW DELHI: Nifty formed a Spinning Top on the daily chart and a Shooting Star on the weekly scale on Friday as the headline equity index returned to green after two consecutive red candles on a weekly basis. Going ahead, 15,000-15,050 will be the immediate hurdle zone to watch out for. Once that gets taken out, the index will be set to test the swing high of 15,273. On the other hand, 14,860-14,800 will act as a crucial support zone for the index, said Gaurav Ratnaparkhi, Senior Technic`,
        onClick: () => { }
    },
    {
        time: "Reuters 2 hours ago",
        heading: "Ahead of Market: 12 things that will decide stock action on Monday",
        content: `NEW DELHI: Nifty formed a Spinning Top on the daily chart and a Shooting Star on the weekly scale on Friday as the headline equity index returned to green after two consecutive red candles on a weekly basis. Going ahead, 15,000-15,050 will be the immediate hurdle zone to watch out for. Once that gets taken out, the index will be set to test the swing high of 15,273. On the other hand, 14,860-14,800 will act as a crucial support zone for the index, said Gaurav Ratnaparkhi, Senior Technic`,
    },
    {
        time: "Reuters 2 hours ago",
        heading: "Ahead of Market: 12 things that will decide stock action on Monday",
        content: `NEW DELHI: Nifty formed a Spinning Top on the daily chart and a Shooting Star on the weekly scale on Friday as the headline equity index returned to green after two consecutive red candles on a weekly basis. Going ahead, 15,000-15,050 will be the immediate hurdle zone to watch out for. Once that gets taken out, the index will be set to test the swing high of 15,273. On the other hand, 14,860-14,800 will act as a crucial support zone for the index, said Gaurav Ratnaparkhi, Senior Technic`,
    },
]


function CrFeeds(props) {
    if (props.data) {
        let len = props.data.length
        return (
            <>
                {
                    (props.data || []).map((e, i) => {
                        return (
                            <div className="row pb-3" key={i + Math.random() + 8}>
                                {
                                    e.logo && <div className="col-2">
                                        <img src={e.logo} alt={e.logoAlt || 'Logo' + i} width={30} />
                                    </div>
                                }

                                <div className="col-10">
                                    <div className="row">
                                        <div className="col">
                                            <div className="text-truncate" style={{ maxWidth: 180, fontWeight: 'bold' }}>{e.heading} </div>
                                        </div>
                                        <div className="col-2">
                                            {e.time && <span>{e.time}</span>}
                                        </div>
                                    </div>

                                    <p>
                                        {e.content}
                                    </p>
                                    {e.img && <img src={e.img} alt={e.imgAlt || "img" + i} height={120} />}
                                    <div className="row">
                                        <div className="col-3">
                                            <small>comment</small>
                                        </div>
                                        <div className="col-3">
                                            <small>share</small>
                                        </div>
                                        <div className="col-3">
                                            <small>like</small>
                                        </div>
                                        <div className="col-3">
                                            <small>more</small>
                                        </div>
                                    </div>
                                </div>
                                {len !== i + 1 && <div className="w-100"><hr /></div>}


                            </div>
                        )
                    })
                }
            </>
        )

    }
    return null
}

const data_Feeds = [
    {
        time: '1d',
        heading: 'Stock Market For Beginners .How can Beginners Start Investing',
        content: `Stock Market For Beginners How can Beginners Start Investing in Share Market | Hindi |Rich vs Poor
        Basics of Stock Market.. How can beginners start investing in Share market.
        One-stop for all your investments.`,
        img: logo,
        imgAlt: '',
        logo: logo,
        logoAlt: 'my logo'
    },
    {
        time: '1d',
        heading: 'Stock Market For Beginners .How can Beginners Start Investing',
        content: `Stock Market For Beginners How can Beginners Start Investing in Share Market | Hindi |Rich vs Poor
        Basics of Stock Market.. How can beginners start investing in Share market.
        One-stop for all your investments.`,
        img: logo,
        imgAlt: '',
        logo: logo,
        logoAlt: 'my logo'
    },
]

class Feed extends React.PureComponent {
    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h6>Twitter Feed </h6>
                            <CreateBox data={<CrFeeds data={data_Feeds} />} />
                        </div>
                        <div className="col">
                            <h6>Facebook Feed </h6>
                            <CreateBox data={<CrFeeds data={data_Feeds} />} />
                        </div>
                        <div className="col-5">
                            <h6>News </h6>
                            <CreateBox data={<News data={data_News} />} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export { Feed }
