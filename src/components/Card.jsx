import React from 'react';
import './cardstyle.css';

const Card = (props) => {
    const { sourceUrl, meaningofWord, word, phonetic, antonyms, synonyms } = props.info;
    const audioUrl = props.info.audio;

    return (
        <div className='cardContainer'>
            <h1 className='mainWord'>{word ? word.toUpperCase() : "Loading..."}</h1>
            <p>{phonetic}</p>

            <p>Pronounce: </p>
            <audio key={Math.random()} controls>
                <source src={audioUrl} type="audio/ogg" />
            </audio>

            {meaningofWord !== undefined ? meaningofWord.map((val, index) => {
                return (
                    <div key={index}>
                        <h2 className='partofSpeech'>{val.partOfSpeech ? val.partOfSpeech.toUpperCase() : "Wait..."} :-</h2>
                        <ul>
                            {val.definitions.map((def, defIndex) => (
                                <li key={defIndex}>{def.definition}</li>
                            ))}
                        </ul>
                    </div>
                );
            }) : console.log("Fetching Meaning...")}

            {/* Antonyms Section */}
            <div>
                <h2 className='partofSpeech'> ANTONYMS:- </h2>
                {antonyms && antonyms.length > 0 ? (
                    <ul>
                        {antonyms.map((ant, index) => (
                            <li key={index}>{ant}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No antonyms available</p>
                )}
            </div>

            {/* Synonyms Section */}
            <div>
                <h2 className='partofSpeech'> SYNONYMS :- </h2>
                {synonyms && synonyms.length > 0 ? (
                    <ul>
                        {synonyms.map((syn, index) => (
                            <li key={index}>{syn}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No synonyms available</p>
                )}
            </div>

            {/* Examples / Uses Section */}
            <div>
                <h2 className='partofSpeech'> EXAMPLES / USES :- </h2>
                {meaningofWord && meaningofWord.some(m => m.definitions.some(d => d.example)) ? (
                    meaningofWord.map((val, index) => (
                        <div key={index}>
                            <ul>
                            {val.definitions.map((def, defIndex) => (
                                def.example ? <li key={defIndex}> {def.example}</li> : null
                            ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No examples available</p>
                )}
            </div>

            {/* More Info */}
            <div className='linkContainer'>
                <a href={sourceUrl}>More Info</a>
                <br /><br />
                <a href="https://about.me/subhranshu">@Subhranhsu {new Date().getFullYear()}</a>
            </div>
        </div>
    );
}

export default Card;
