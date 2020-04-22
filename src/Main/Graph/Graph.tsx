import React from 'react';

import './Graph.css';

import {
    ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type MyProps = {
    dataWrapper: {
        data: Array<any>,
        labels: any,
        metaData: any
    }, type: String
};
type MyState = {
    colorKey: any
};

class Graph extends React.Component<MyProps, MyState> {
    colors = [
        ["#9E0C3C", "#B01135", "#CD1B2D", "#E82322", "#FB291B"], // reds
        ["#B478FF", "#826DE8", "#8592FF", "#6D9AE8", "#78CCFF"], // blues
        ["#5FFF63", "#4AE87A", "#7EE84A", "#52FFB7", "#C7FF52"], // greens
        ["#FF4DF2", "#E83A85", "#BF3AE8", "#9E40FF", "#7440FF"], // purples
        ["#FF8E59", "#E89751", "#FFC265", "#E8BB51", "#FFDE59"], // oranges
        ["#FFEA56", "#E8C443", "#E8E543", "#FFC54A", "#CAFF4A"], // yellows
        ["#998AD3", "#E494D3", "#CDF1AF", "#87DCC0", "#88BBE4"], // unused
        ["#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8", "#FFDFD3"] //unused
    ]
    constructor(props) {
        super(props);
        this.state = {
            colorKey: {
                countries: { "GBR": 0, "USA": 1, "DEU": 2, "AUT": 3, "ITA": 4, "JPN": 5 },
                dataSets: {}
            }
        }
    }
    static getDerivedStateFromProps(props, state) {
        let dataSetHelper = {};
        let counter = 0;
        props.dataWrapper.labels.dataKeys.forEach(key => {
            if (!dataSetHelper[key.substring(3)]) {
                dataSetHelper[key.substring(3)] = counter;
                counter++;
            }
        });
        return ({
            colorKey: {
                countries: state.colorKey.countries,
                dataSets: dataSetHelper
            }
        });
    }

    getColor(key: String) {
        let countryIndex = this.state.colorKey.countries[key.substring(0, 3)];
        let dataSetIndex = this.state.colorKey.dataSets[key.substring(3)];
        return this.colors[countryIndex][dataSetIndex];
    }
    getToolTip(value, name) {
        return [value.toFixed(0), this.props.dataWrapper.metaData[name]];
    }
    getLegend(value, entry) {
        return this.props.dataWrapper.metaData[value];
    }
    buildGraph() {
        if (this.props.type === "LineChart") {
            return (
                <ComposedChart
                    data={this.props.dataWrapper.data}>
                    <CartesianGrid strokeDasharray="5 5" stroke="#eee" />
                    <XAxis dataKey={this.props.dataWrapper.labels.xAxis} />
                    <YAxis />
                    <Tooltip formatter={this.getToolTip.bind(this)} />
                    <Legend formatter={this.getLegend.bind(this)} />
                    {this.props.dataWrapper.labels.dataKeys.map((key) => {
                        return <Line type="monotone" key={key} dataKey={key} stroke={this.getColor(key)} />
                    })}
                </ComposedChart>);
        }
    }
    render() {
        return (
            <div className="Graph">
                <div className="container">
                    <ResponsiveContainer aspect={1.9}>
                        {this.buildGraph()}
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default Graph;

