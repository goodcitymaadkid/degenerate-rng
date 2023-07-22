"use client";

import { Button, Input, Checkbox } from "antd";
import React, { useState, useEffect } from "react";

export default function RngComponent() {
  const { TextArea } = Input;
  const rngInitialState = {
    interval: false,
    intervalLength: "5",
  };

  const [{ interval, intervalLength }, setRngState] = useState(rngInitialState);
  const [generatedNumber, setGeneratedNumber] = useState("Random");

  const generate = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;

    setGeneratedNumber(newNumber.toString());
    return newNumber;
  };

  const handleCheckboxChange = (val: any) => {
    setRngState((state) => ({ ...state, interval: !interval }));
    if (!interval) {
      generate(); // Generate a number when the checkbox is checked
    }
  };

  useEffect(() => {
    if (interval) {
      if (parseFloat(intervalLength) === 0)
        return setGeneratedNumber("You cannot have a 0 second interval");
      if (isNaN(parseFloat(intervalLength)))
        return setGeneratedNumber("Not A Number");
      const daNumber = parseFloat(intervalLength);

      const intervalBALLS = setInterval(() => {
        generate();
      }, daNumber * 1000);
      return () => clearInterval(intervalBALLS);
    }
  });

  return (
    <div style={{ width: "300px" }}>
      <div>
        <Checkbox
          defaultChecked={false}
          onChange={handleCheckboxChange} // Use the updated event handler
        >
          Use Interval
        </Checkbox>

        <TextArea
          onChange={(val: any) => {
            val = val.target.value;

            setRngState((state) => ({ ...state, intervalLength: val }));
          }}
          value={intervalLength !== "" ? intervalLength : ""}
          className="poop"
          placeholder="Amount of Time in Seconds to Regenerate"
          rows={1}
          autoSize={true}
          showCount={true}
          maxLength={10}
        />

        <Button onClick={generate}> deGenerate </Button>

        <h1
          style={{
            color: "red",
            padding: "3px",
            fontFamily: "Roboto",
            fontSize: "2rem",
          }}
        >
          {generatedNumber}
        </h1>
      </div>
    </div>
  );
}
