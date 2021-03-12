import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis , Tooltip , Legend } from "recharts";
const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 1400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2410
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2300
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 200
    }
  ]

class BusinessChart extends React.PureComponent{
    render(){
        return(
            <>
               <div>
               <LineChart width={420} height={200} data={data}
                    margin={{ top: 0, right: 30, left: 0, bottom: 5 }}>
                    <XAxis dataKey="name" style={{fontSize : '12px'}}/>
                    <YAxis style={{fontSize : '12px'}}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36}/>
                    <Line name="PV" type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line name="UV" type="monotone" dataKey="uv" stroke="#82ca9d" />
                    <Line name="AMT" type="monotone" dataKey="amt" stroke="pink" />
                </LineChart>
               </div>
            </>
        )
    }
}

export {BusinessChart};