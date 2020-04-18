import React from 'react';

import './Graph.css';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type MyProps = { data: Array<any>, type: String, keys: Array<String> };
type MyState = {};

class Graph extends React.Component<MyProps, MyState> {
    colors = ["#E0BBE4","#957DAD","#D291BC","#FEC8D8","#FFDFD3"];
    getDecoration() {
        return <React.Fragment>

        </React.Fragment>;
    }
    buildGraph() {
        if (this.props.type === "LineChart") {
            return (
                <LineChart
                    data={this.props.data}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {this.props.keys.map((key, index) => {
                        console.log(key);
                        return <Line type="monotone" key={key} dataKey={key} stroke={this.colors[index]} />
                    })}
                </LineChart>);
        }
    }
    render() {
        return (
            <div className="Graph">
                <div className="container">
                    <ResponsiveContainer aspect={1.6}>
                        {this.buildGraph()}
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default Graph;

