import './App.css';
import React from "react";

import {useExamples} from "./hooks/examples.tsx";

import {IDialogApiDef, InitDialogMemoizeBounds, baseDialogOptions} from "react-dialogger";

InitDialogMemoizeBounds();

baseDialogOptions({
    snackbar: {
        busyMessage: 'Suleyman'
    },
    base:{
        actions: {
            initialIntents:{
                positive: {
                    color: "error",
                    variant: "contained"
                },
                neutral: {
                    color: "red",
                    variant: 'text'
                }
            }
        }
    }
})

function App() {

    const apiRef  = React.useRef<IDialogApiDef|null>(null);

    const examples = useExamples();
    return (
        <div className="App">
            <button onClick={event => {
                examples.basic.openDialog(apiRef);
            }}>Basic Example</button>
        </div>
    );
}

export default App;
