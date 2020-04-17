import React from 'react';
import './Main.css';
import Graph from "./Graph/Graph";

class Main extends React.Component {
    render() {
        return (
            <div className="Main">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi inventore voluptates accusantium, quam beatae obcaecati ex ab quasi? Nobis earum nulla impedit hic quae, corporis eaque voluptate qui culpa.
                </p>

                <Graph />
            </div>
        );
    }
}

export default Main;

