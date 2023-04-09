import React from 'react';

const VerbRender = ({verbObj, formResponse}) => {
    
    const renderData = () => {
        return JSON.stringify(verbObj,undefined, '\t');
    };

    return(
        <div id="verbDataContainer">
            {Object.keys(verbObj).map((mood, i) => (
                <p key={mood}>{mood}
                {Object.keys(verbObj[mood]).map((tense, j) => (
                    <p key={mood+tense}>
                        {JSON.stringify(verbObj[mood][tense],undefined,'\t')}
                    </p>
                ))}
                </p>
            ))}
        </div>
    );
};

export default VerbRender;