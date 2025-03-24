import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Wel from './components/Wel';
import Nav from './components/Nav';
import Alert from './components/Alert';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WordOfTheDay from './components/WordOfTheDay';
import WordSearch from './components/WordSearch';
import FavoritesHistory from "./components/FavoritesHistory";

function App() {
  const [searchVal, setsearchVal] = useState("welcome");
  const [Wordinformation, setinformation] = useState([]);
  const [welScreen, setwelScreen] = useState(true);
  const [mode, setMode] = useState("light");
  const [alert,setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert(
      {
        msg: message,
        type: type
      }
    )
    setTimeout(()=>{
      setAlert(null);
    },1500)
}

  const toggleMode = ()=>{
    if(mode==="light"){
      setMode("dark")
      document.body.style.backgroundColor = "#0D1117";
      showAlert("Dark Mode has been enabled", "success");
    }else{
      setMode("light")
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode has been enabled", "success");
    }
}

  const loadData = async () => {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchVal}`
      const response = await fetch(url);
      const data = await response.json();
      const finalData = data[0];

      // destructure


      const sourceUrl = finalData.sourceUrls[0];
      const meaningofWord = [];
      for (let i = 0; i < finalData.meanings.length; i++) {
        meaningofWord.push(finalData.meanings[i])
      }
      const {audio} = finalData.phonetics[1];
      const { word, phonetic } = finalData;

      const GatheredData = {
        sourceUrl, word, phonetic, meaningofWord,audio
      }

      setinformation(GatheredData);



    } catch (error) {
      console.log(error);

    }
  }

  const setWel = () => {
    setwelScreen(false);
  }

  useEffect(() => {
    loadData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
  <>
  <Router>
  <Nav mode={mode} toggleMode={toggleMode}/>
  <Alert alert={alert}/>
    <div className='mainContainer'>
    <Routes>
      <Route exact path="/" element=
    {
        welScreen ? <Wel callfn={setWel} mode={mode}/> : <div><div className='searchBox'>
          <input  style={{ color: mode === "dark" ? "white" : "black" }} placeholder='Type a word..' value={searchVal} onChange={(e) => { setsearchVal(e.target.value) }}></input>
          <button onClick={loadData}>Search</button>
        </div> <Card info={Wordinformation} mode={mode}/></div>
      
    }/>
    <Route exact path="/about" element={<About mode={mode} />} />
    <Route exact path="/wordoftheday" element={<WordOfTheDay mode={mode} />} />
    <Route exact path="/wordsearch" element={<WordSearch mode={mode} showAlert={showAlert}/>} />
    <Route path="/favorites-history" element={<FavoritesHistory mode={mode} showAlert={showAlert}/>} />
    </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
