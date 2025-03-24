import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Wel from './components/Wel';

function App() {
  const [searchVal, setSearchVal] = useState("welcome");
  const [wordInformation, setInformation] = useState(null);
  const [welScreen, setWelScreen] = useState(true);

  const loadData = async () => {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchVal}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      const finalData = data[0];

      // Extract main details
      const sourceUrl = finalData.sourceUrls?.[0] || "";
      const meaningofWord = finalData.meanings || [];
      const { word, phonetic } = finalData;

      // Extract audio safely
      const audio = finalData.phonetics.find(p => p.audio)?.audio || "";

      // Collect antonyms and synonyms
      let antonyms = [];
      let synonyms = [];

      meaningofWord.forEach((meaning) => {
        if (meaning.antonyms) {
          antonyms = antonyms.concat(meaning.antonyms);
        }
        if (meaning.synonyms) {
          synonyms = synonyms.concat(meaning.synonyms);
        }
      });

      // Remove duplicates & handle missing data
      antonyms = antonyms.length ? [...new Set(antonyms)] : ["No antonyms available"];
      synonyms = synonyms.length ? [...new Set(synonyms)] : ["No synonyms available"];

      const gatheredData = { sourceUrl, word, phonetic, meaningofWord, audio, antonyms, synonyms };

      setInformation(gatheredData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setInformation(null);
    }
  };

  const handleWelcomeScreen = () => {
    setWelScreen(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='mainContainer'>
      {welScreen ? (
        <Wel callfn={handleWelcomeScreen} />
      ) : (
        <div>
          <div className='searchBox'>
            <input
              placeholder='Type a word..'
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button onClick={loadData}>Search</button>
          </div>
          {wordInformation ? <Card info={wordInformation} /> : <p>Loading...</p>}
        </div>
      )}
    </div>
  );
}

export default App;
