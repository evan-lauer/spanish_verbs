import React from 'react';

const VerbRender = ({verbObj, formResponse}) => {

    const subjects = ["yo", "tú", "él, ella, usted", "nosotros, nosotras", "vosotros, vosotras", "ellos, ellas, ustedes", "vos"];
    
    const renderTense = (moodName, tenseName, i) => {
        var tenseArr = formResponse[moodName][tenseName];
        if (JSON.stringify(tenseArr) === "[]" || JSON.stringify(tenseArr) === "[0,0,0,0,0,0,0]")
        { // This skips any tenses that the user doesn't want to display
            return;
        }
        var displayedVerbs = {};
        for (var ind = 0; ind < tenseArr.length; ind++)
        {
            if (tenseArr[ind] === 1)
            {
                displayedVerbs[subjects[ind]] = verbObj[moodName][tenseName][ind];
            }
        }
        console.log(JSON.stringify(displayedVerbs));
        return (
            <table className="conjTable" key={i}>
                <h5>{tenseName}</h5>
                {Object.keys(displayedVerbs).map((subj, i) => (
                    <p>{subj + ": " + displayedVerbs[subj]}</p>
                ))}
            </table>
        );
    };

    const renderMood = (moodName, i) => {
        if (JSON.stringify(verbObj) === "{}")
        {
            return;
        }
        var moodObj = formResponse[moodName];
        if (JSON.stringify(moodObj) === "{}") 
        { // This skips moods that the user doesn't want to see
            return;
        }
        var moodSlug = moodName.toLowerCase().replace(' ','-');
        
        console.log(verbObj);
        return(
            <div className="moodDiv" id={moodSlug} key={i}>
                <h4>{moodName}</h4>
                {Object.keys(moodObj).map((tenseName, j) => (
                    renderTense(moodName, tenseName, j)
                ))}
            </div>
        );
    };

    const renderData = () => {
        console.log(JSON.stringify(verbObj));
        return JSON.stringify(verbObj,undefined, '\t');
    };

    return(
        <div id="verbDataContainer">
            {
                Object.keys(formResponse).map((mood, i) => (
                renderMood(mood, i)
            ))}
        </div>
    );
};

export default VerbRender;