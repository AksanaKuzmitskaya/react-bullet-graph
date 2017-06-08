import React, { Component } from "react";
import { render } from "react-dom";

import BulletGraph from "../../src";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>BulletGraph Demo</h1>
        <BulletGraph
          scaleMin={0}
          scaleMax={1000}
          performanceVal={700}
          symbolMarker={450}
          badVal={900 * 0.9}
          satisfactoryVal={900}
          height={15}
          width={150}
          badColor={"#ffb300"}
          satisfactoryColor={"#009755"}
          goodColor={"#d8432e"}
          isActiveColor={true}
          opacity={0.3}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
