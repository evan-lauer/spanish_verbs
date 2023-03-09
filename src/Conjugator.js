import { useEffect } from 'react';
import axios from 'axios';


// Expects the verb to be in infinitive form
const Conjugator = ({ infinitiveVerb }) => {
    useEffect(() => {

        const url = `https://www.wordreference.com/conj/esverbs.aspx?v=` + infinitiveVerb;

        var page;
        axios(url)
            .then((response) => {
                page = response.data;

                // Matches the divs containing the conjugations for each mood
                const moodTables = page.match(new RegExp("<div class=['|\"]aa['|\"]>.*?</div>", "gs"));

                const verbObject = {};

                moodTables.forEach((moodTableString) => {
                    // Match the name of the mood, grab the first match
                    var moodName = moodTableString.match(new RegExp("<h4>.*?</h4>"))[0];

                    // Cut away the header 4 HTML
                    moodName = moodName.replace('<h4>', '').replace('</h4>', '');

                    // If the mood is already in the verbObject, then we skip this iteration
                    // (This is because there's an antiquated version of Indicative,
                    // and we want to skip it.)
                    if (verbObject[moodName]) {
                        return;
                    }
                    verbObject[moodName] = {
                        "htmlString": moodTableString
                    };
                });

                Object.entries(verbObject).forEach((entry) => {
                    const [mood, value] = entry;
                    var moodTableString = value.htmlString;
                    var tenseTables = moodTableString.match(new RegExp("<table class=['|\"]neoConj( active)?['|\"]>.*?</table>", "gs"));
                    if (tenseTables) {
                        tenseTables.forEach((tenseTableString) => {
                            // Find the first table header (which in this case will contain the verb tense name)
                            var tenseNameTemp = tenseTableString.match(new RegExp("<th.*?</th>", "gs"))[0];
                            // Within the table header, we need to match either a string
                            // between the end of a span and the start of an <em> tag, or 
                            // between the end of a span and the start of another span.
                            // This depends on whether the tense has a tool tip.
                            var tenseNameArr = tenseNameTemp.match(new RegExp("</span>.*?<em"));
                            if (!tenseNameArr) {
                                tenseNameArr = tenseNameTemp.match(new RegExp("</span>.*?<span"));
                            }
                            var tenseName;
                            // Grab the first element in the match
                            if (tenseNameArr) {
                                tenseName = tenseNameArr[0];
                            }
                            // As before, cut away the extra HTML
                            tenseName = tenseName.replace("</span>", "").replace("<em", "").replace("<span", "");

                            // At this point, it's possible that we cut away the HTML and are left with an empty string.
                            // This happens when the verb tense is antiquated (due to the HTML formatting) so we'll just 
                            // return early (which, in a forEach, just skips the current iteration.)
                            if (tenseName === "") return;
                            
                            verbObject[mood][tenseName] = {
                                "htmlString" : tenseTableString
                            };
                            delete verbObject[mood]["htmlString"];

                        });
                    }
                });

                Object.entries(verbObject).forEach((moodEntry) => {
                    // For each mood:
                    const [mood, moodValue] = moodEntry;
                    Object.entries(moodValue).forEach((tenseList) => {
                        // For each tense:
                        const [tense, tenseVal] = tenseList;
                        var tenseTableString = tenseVal.htmlString;
                        // Matching the table rows which contain the subject and conjugations.
                        var conjugationsTemp = tenseTableString.match(new RegExp("<tr><th scope=['|\"]row['|\"]>.*?</td></tr>", "gs"));
                        // Since we know the order of the subjects (yo, tu, el/ella/usted, etc..., we 
                        // only need the conjugations). So we make an array in our verb object:
                        verbObject[mood][tense] = [];
                        // And for each subject, we:
                        conjugationsTemp.forEach((conjugationString) => {
                            // Grab the conjugation
                            var conjugation = conjugationString.match(new RegExp("<td>.*?</td>"))[0];
                            // Prune the string a bit (remove bold and italics)
                            conjugation = conjugation.replaceAll("<td>", "").replaceAll("</td>","").replaceAll("<b>","").replaceAll("</b>","");
                            conjugation = conjugation.replaceAll("<i>","").replaceAll("</i>","");
                            //console.log(tense + " " + conjugation);
                            // Then push the cleaned conj to the verbObject
                            verbObject[mood][tense].push(conjugation);
                            // And delete the HTML string
                            delete verbObject[mood][tense]["htmlString"];
                        });
                    });
                });
                //console.log(verbObject);
            })
            .catch((err) => {
                console.log(err.message);
            });



    }, []);

    return (
        <div id="content"></div>
    );
};

export default Conjugator;
