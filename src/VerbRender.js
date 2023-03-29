import React from 'react';

const VerbRender = ({verbObj}) => {
    
    const renderData = () => {
        return JSON.stringify(verbObj,undefined, '\t');
    };

    return(
        <div id="verbDataContainer">
            {renderData()}
        </div>
    );
};

export default VerbRender;