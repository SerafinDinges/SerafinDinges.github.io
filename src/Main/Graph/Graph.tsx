import React from 'react';

import './Graph.css';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type MyProps = { dataWrapper: {
    data: Array<any>,
    labels: any
}, type: String };
type MyState = {};

class Graph extends React.Component<MyProps, MyState> {
    // colors = ["#E0BBE4","#957DAD","#D291BC","#FEC8D8","#FFDFD3"];
    colors = ["#998AD3","#E494D3","#CDF1AF","#87DCC0","#88BBE4"];
    getDecoration() {
        return <React.Fragment>

        </React.Fragment>;
    }
    buildGraph() {
        if (this.props.type === "LineChart") {
            return (
                <LineChart
                    data={this.props.dataWrapper.data}>
                    <CartesianGrid strokeDasharray="5 5" stroke="#eee" />
                    <XAxis dataKey={this.props.dataWrapper.labels.xAxis} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {this.props.dataWrapper.labels.dataKeys.map((key, index) => {
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

