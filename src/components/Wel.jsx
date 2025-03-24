import React, { useState, useEffect } from 'react';

const Wel = (props) => {
    const [wordOfTheDay, setWordOfTheDay] = useState(null);
    const [loading, setLoading] = useState(true);

    const fallbackWord = "serendipity"; // Backup word
    const fallbackDefinition = "The occurrence of events by chance in a happy or beneficial way.";

    useEffect(() => {
        const fetchWordOfTheDay = async () => {
            try {
                // Step 1: Get a random word
                const randomWordRes = await fetch("https://random-word-api.herokuapp.com/word");
                if (!randomWordRes.ok) throw new Error("Random word API failed");

                const randomWordData = await randomWordRes.json();
                const randomWord = randomWordData[0];

                // Step 2: Fetch dictionary details
                const wordDetailsRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
                if (!wordDetailsRes.ok) throw new Error("Dictionary API failed");

                const wordDetailsData = await wordDetailsRes.json();
                const wordInfo = wordDetailsData[0];

                // Step 3: Extract data
                const word = wordInfo.word || fallbackWord;
                const phonetic = wordInfo.phonetic || "";
                const meaning = wordInfo.meanings[0]?.definitions[0]?.definition || fallbackDefinition;
                const audio = wordInfo.phonetics.find(p => p.audio)?.audio || "";

                setWordOfTheDay({ word, phonetic, meaning, audio });
            } catch (error) {
                console.error("Error fetching word of the day:", error);

                // Fallback word setup
                setWordOfTheDay({
                    word: fallbackWord,
                    phonetic: "",
                    meaning: fallbackDefinition,
                    audio: ""
                });
            } finally {
                setLoading(false);
            }
        };

        fetchWordOfTheDay();
    }, []);

    return (
        <div className='welscreen'>
            <center>
                <h1>&#128218; Dictionary App</h1>
                <img className='searchgif' src="/englishdictionary/searchimage.gif" alt="search img" />

                {/* Display Word of the Day */}
                <div className="word-of-the-day">
                    <h2>📖 Word of the Day</h2>
                    {loading ? <p>Loading...</p> : (
                        <>
                            <h3>{wordOfTheDay.word.toUpperCase()} {wordOfTheDay.phonetic}</h3>
                            <p>{wordOfTheDay.meaning}</p>
                            {wordOfTheDay.audio && (
                                <audio controls>
                                    <source src={wordOfTheDay.audio} type="audio/ogg" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                        </>
                    )}
                </div>

                <button onClick={props.callfn}>Search A Word</button>
            </center>
        </div>
    );
}

export default Wel;
