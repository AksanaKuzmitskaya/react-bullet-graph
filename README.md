# react-bullet-graph

[![npm package][npm-badge]][npm]

Simple bullet chart in react. Based off of [worldviewer/react-bullet-graph](https://github.com/worldviewer/react-bullet-graph).

```bash
npm install --save react-bullet-graph # or yarn add
```

```javascript
var React = require('react');
var BulletGraph = require('react-bullet-graph');

module.exports = function() {
    return <BulletGraph
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
     />;
}
```

[npm-badge]: https://img.shields.io/npm/v/react-bullet-graph.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-bullet-graph
