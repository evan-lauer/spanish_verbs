import React from 'react';
import { useState } from 'react';
import Conjugator from './Conjugator';
import VerbRender from './VerbRender';
import InputForm from './InputForm';
const App = () => {
    
    const [verbObj, setVerbObj] = useState({});
    const [infinitiveVerb, setInfinitiveVerb ] = useState('');

    // For each tense for each given mood, we have an array of six bits, corresponding
    // to the six possible verb subjects. A 1 represents that the user would like to see
    // that subject be conjugated. A 0 represents that the user doesn't want to see it.
    // An array (or an entire tense or mood) might all be 0s, in which case we want to hide 
    // the entire section.
    //
    // This is just a sample form response.
    // TODO: Create form for InputForm component
    const formResponse = {
        "Indicativo": {
            "presente": [1,1,1,1,1,1,1],
            "imperfecto": [1,1,1,1,1,1,1],
            "pretérito": [1,1,1,1,1,1,1],
            "futuro": [1,1,1,1,1,1,1],
            "condicional": [1,1,1,1,1,1,1]
        },
        "Formas compuestas comunes": {
            "pretérito perfecto": [1,1,1,1,1,1,1],
            "pluscuamperfecto": [1,1,1,1,1,1,1],
            "futuro perfecto": [1,1,1,1,1,1,1],
            "condicional perfecto": [1,1,1,1,1,1,1]
        },
        "test hidden tense": {},
        "Subjuntivo": {
            "presente": [1,1,1,1,1,1,1],
            "imperfecto": [1,1,1,1,1,1,1],
            "futuro": [1,1,1,1,1,1,1]
        },
        "Tiempos compuestos del subjuntivo": {
            "pretérito perfecto": [1,1,1,1,1,1,1],
            "pluscuamperfecto": [1,1,1,1,1,1,1],
            // "futuro perfecto": [1,1,1,1,1,1,1] This is omitted from our conjugations.
        },
        "Imperativo": {
            "afirmativo": [0,1,1,1,1,1,1],
            "negativo": [0,1,1,1,1,1,1]
        }
    };

    return(
        <div id="appContainer">
            <InputForm
                infinitiveVerb={infinitiveVerb}
                setInfinitiveVerb={setInfinitiveVerb}
            />
            <Conjugator
                verbObj = {verbObj}
                setVerbObj = {setVerbObj}
                infinitiveVerb={infinitiveVerb}
            />
            <VerbRender
                verbObj = {verbObj}
                formResponse = {formResponse}
            />
        </div>

    );
};


export default App;