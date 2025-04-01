import './App.css';
import React from "react";

import './styles.css';
import {useExamples} from "./hooks/examples.tsx";

function App() {

    const examples = useExamples();

    return (
        <div className="App">
            <button onClick={event => {

                examples.basic.openDialog();

            }}>Basic Example</button>
            <button onClick={event => {

                examples.updateValues.openDialog();

            }}>Example with Updated Values</button>
            <button onClick={event => {

                examples.withSlot.openDialog();

            }}>Example with Slot</button>

            <button onClick={event => {

                examples.withListener.openDialog();

            }}>Example with Listener</button>

            <button onClick={event => {

                examples.withUseEffect.openDialog();

            }}>useEffect & DialogRef instead of .show callback </button>

        </div>
    );
}

export default App;
