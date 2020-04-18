import React from 'react';
import './Main.css';
import Graph from "./Graph/Graph";
import API from "../util/API";

type MyProps = {};
type MyState = { sheetData: Array<any>, worldData: Array<any> };

class Main extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props)
        this.state = {
            sheetData: [],
            worldData: []
        }
    }
    componentDidMount() {
        let api = new API();
        api.getSheet("cvd19_cases").then((data) => {
            this.setState({
                sheetData: data
            })
        });
        api.getWorldData().then((data) => {
            console.log("worlddata", data);
            
            this.setState({
                worldData: data
            })
        });
    }
    render() {
        return (
            <div className="Main">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi inventore voluptates accusantium, quam beatae obcaecati ex ab quasi? Nobis earum nulla impedit hic quae, corporis eaque voluptate qui culpa.
                </p>
                <Graph data={this.state.sheetData} keys={["de","en"]} type="LineChart"/>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi inventore voluptates accusantium, quam beatae obcaecati ex ab quasi? Nobis earum nulla impedit hic quae, corporis eaque voluptate qui culpa.
                </p>
                <Graph data={this.state.worldData} keys={["total_cases"]} type="LineChart"/>
            </div>
        );
    }
}

export default Main;

