import React from "react";

const HorizontalBulletGraph = React.createClass({
  render: function() {
    // Normalize values which exceed scaleMax prop
    let badVal = Math.max(
      Math.min(this.props.badVal, this.props.scaleMax),
      this.props.scaleMin
    ),
      satisfactoryVal = Math.max(
        Math.min(this.props.satisfactoryVal, this.props.scaleMax),
        this.props.scaleMin
      ),
      performanceVal = Math.max(
        Math.min(this.props.performanceVal, this.props.scaleMax),
        this.props.scaleMin
      ),
      symbolMarker = Math.max(
        Math.min(this.props.symbolMarker, this.props.scaleMax),
        this.props.scaleMin
      );

    // Scale tick component props to specified component width prop
    let widthScale =
      this.props.width / (this.props.scaleMax - this.props.scaleMin);

    let widthBadVal = (badVal - this.props.scaleMin) * widthScale;
    let leftSatisfactoryVal = widthBadVal;
    let widthSatisfactoryVal =
      (satisfactoryVal - this.props.scaleMin) * widthScale -
      leftSatisfactoryVal;
    let leftGoodVal = leftSatisfactoryVal + widthSatisfactoryVal;
    let widthGoodVal = this.props.width - leftGoodVal;

    let horizontalBulletGraphStyles = {
      justifyContent: "flex-end"
    };

    let graphStyles = {
      position: "relative"
    };

    let allValStyles = {
      height: this.props.height + "px",
      width: this.props.width
    };

    let goodValStyles = {
      backgroundColor: this.props.goodColor,
      height: this.props.height + "px",
      left: leftGoodVal,
      position: "absolute",
      top: "0",
      width: widthGoodVal,
      zIndex: 1
    };

    let titleStyles = {
      fontSize: "18px",
      lineHeight: this.props.height + "px",
      margin: "0",
      textAlign: "right",
      whiteSpace: "nowrap"
    };

    let textLabelStyles = {
      fontSize: "12px",
      margin: "0",
      textAlign: "right"
    };

    let legendStyles = {
      paddingRight: "10px"
    };
    let satisfactoryValStyles = {
      backgroundColor: this.props.satisfactoryColor,
      height: this.props.height + "px",
      left: leftSatisfactoryVal + "px",
      position: "absolute",
      top: "0",
      width: widthSatisfactoryVal + "px",
      zIndex: 2
    };
    let badValStyles = {
      backgroundColor: this.props.badColor,
      height: this.props.height + "px",
      left: "0",
      position: "absolute",
      top: "0",
      width: widthBadVal + "px",
      zIndex: 3
    };

    let performanceWidth = (performanceVal - this.props.scaleMin) * widthScale;
    let performanceValStyles = {
      backgroundColor: "black",
      opacity: 0.5,
      height: this.props.height / 4 + "px",
      left: "0",
      marginBottom: this.props.height / 3 + "px",
      marginTop: this.props.height / 3 + "px",
      position: "absolute",
      top: "0",
      width: performanceWidth + "px",
      zIndex: 4
    };

    let symbolMarkerWidth = this.props.width * 0.02,
      // Should not exceed boundaries qualitative range boundaries
      symbolMarkerPos =
        (symbolMarker - this.props.scaleMin) * widthScale * 0.99;
    let symbolMarkerStyles = {
      backgroundColor: "black",
      opacity: 0.5,
      left: symbolMarkerPos + "px",
      height: this.props.height * 0.8 + "px",
      marginBottom: this.props.height * 0.1 + "px",
      marginTop: this.props.height * 0.1 + "px",
      position: "absolute",
      top: "0",
      width: symbolMarkerWidth + "px",
      zIndex: 5
    };

    let quantitativeScaleStyles = {
      left: "0",
      position: "absolute",
      top: this.props.height + "px"
    };

    let tickIncrement = (this.props.scaleMax - this.props.scaleMin) / 2;

    let ticks = Array.from({ length: 3 }, (tick, i) => {
      let tickLeft = parseInt(i * tickIncrement * widthScale * 0.996, 10),
        numLeft = tickLeft - 50,
        tickWidth = this.props.width * 0.005;

      return {
        key: i,
        numStyles: {
          fontFamily: "Lato",
          fontSize: "10px",
          left: numLeft + "px",
          paddingLeft: "2px",
          position: "absolute",
          textAlign: "center",
          top: "5px",
          width: "100px"
        },
        tickStyles: {
          backgroundColor: "black",
          height: "5px",
          left: tickLeft + "px",
          position: "absolute",
          textAlign: "center",
          top: "-0px",
          width: tickWidth + "px"
        },
        value: i * tickIncrement + this.props.scaleMin
      };
    });

    if (this.props.isActiveColor) {
      if (this.props.symbolMarker < this.props.badVal) {
        goodValStyles["opacity"] = this.props.opacity;
        satisfactoryValStyles["opacity"] = this.props.opacity;
      } else if (this.props.symbolMarker > this.props.satisfactoryVal) {
        satisfactoryValStyles["opacity"] = this.props.opacity;
        badValStyles["opacity"] = this.props.opacity;
      } else {
        goodValStyles["opacity"] = this.props.opacity;
        badValStyles["opacity"] = this.props.opacity;
      }
    }

    return (
      <div style={horizontalBulletGraphStyles}>

        <div style={legendStyles}>
          <p style={titleStyles}>{this.props.title}</p>
          <p style={textLabelStyles}>{this.props.textLabel}</p>
        </div>

        <div className="Graph" style={graphStyles}>
          <div style={allValStyles} />
          <div style={goodValStyles} />
          {!isNaN(satisfactoryVal) && <div style={satisfactoryValStyles} />}

          {!isNaN(badVal) && <div style={badValStyles} />}

          {!isNaN(performanceVal) && <div style={performanceValStyles} />}

          {!isNaN(symbolMarker) && <div style={symbolMarkerStyles} />}

          <div className="QuantitativeScale" style={quantitativeScaleStyles}>

            {ticks.map(tick => <div key={tick.key} style={tick.tickStyles} />)}

            {ticks.map(tick => (
              <p key={tick.key} style={tick.numStyles}>
                {this.props.unitsPrefix || ""}
                {tick.value.toFixed(0)}
                {this.props.unitsSuffix || ""}
              </p>
            ))}

          </div>
        </div>

      </div>
    );
  }
});

export default HorizontalBulletGraph;
