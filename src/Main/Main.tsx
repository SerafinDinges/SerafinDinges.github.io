import React from 'react';
import './Main.css';
import Graph from "./Graph/Graph";
import API from "../util/API";

type MyProps = {};
type MyState = { data: Array<any> };

class Main extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        let api = new API();
        api.getSheet("cvd19_cases").then((data) => {
            this.setState({
                data: data
            })
        });
    }
    render() {
        return (
            <div className="Main">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi inventore voluptates accusantium, quam beatae obcaecati ex ab quasi? Nobis earum nulla impedit hic quae, corporis eaque voluptate qui culpa.
                </p>
                <Graph data={this.state.data} />
            </div>
        );
    }
}

export default Main;

