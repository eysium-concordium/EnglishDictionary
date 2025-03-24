import React from 'react';

const About = (props) => {
  return (
    <div 
      className="container my-5 p-4 rounded shadow" 
      style={{ 
        backgroundColor: props.mode === "dark" ? "#1e1e1e" : "#f8f9fa",
        color: props.mode === "dark" ? "white" : "black"
      }}
    >
      <h2 className="text-center mb-4">📖 About Dictionary App</h2>
      <p>
        Welcome to the <strong>English Dictionary App</strong> – your ultimate tool for finding 
        word meanings, synonyms, antonyms, and pronunciations. Whether you are a student, 
        writer, or language enthusiast, this app helps you enhance your vocabulary and 
        improve your English skills.
      </p>
      <h4>🌟 Key Features:</h4>
      <ul>
        <li>🔍 Quick and accurate word definitions</li>
        <li>🗣️ Pronunciations with phonetics</li>
        <li>📚 Synonyms and antonyms for better vocabulary</li>
        <li>⚡ Fast and user-friendly interface</li>
        <li>🌑 Dark mode for comfortable reading</li>
      </ul>
      <p>
        Start exploring words today and improve your English effortlessly! 🚀
      </p>
    </div>
  );
};

export default About;
