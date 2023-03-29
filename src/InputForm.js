import React from 'react';
import { useState } from 'react';

const InputForm = ( {infinitiveVerb, setInfinitiveVerb} ) => {

    const [verbInputValue, setVerbInputValue] = useState("");

    // Set the passed prop to the current form value when enter is clicked
    const keyPressHandler = (event) => {
        if (event.key === "Enter")
        {
            setInfinitiveVerb(verbInputValue);
        }
    }

    return(
        <div id="inputContainer">
            <input 
                className='verbInput'
                placeholder='Type an infinitive verb!'
                onChange={(e)=>setVerbInputValue(e.target.value)}
                value={verbInputValue}
                onKeyDown={(e)=>keyPressHandler(e)}
            />
        </div>
    );
};

export default InputForm;