import React from 'react';
import { useState } from 'react';
import Conjugator from './Conjugator';
import VerbRender from './VerbRender';
import InputForm from './InputForm';
const App = () => {
    
    const [verbObj, setVerbObj] = useState({});
    const [infinitiveVerb, setInfinitiveVerb ] = useState('');

    

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
            />
        </div>

    );
};


export default App;