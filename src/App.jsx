import { useEffect, useState } from 'react'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [apod, setApod] = useState({});
  // const [ban, setBan] = useState({});


  // const toggleBan = (tag) => {
  //   setBan((prev) => prev.includes(tag) 
  //   ? prev.filter((t) => t !== tag) //unban
  //   : [...prev, tag] // ban
  //   );
  // };


  const callAPI = async () => {
    const getRandDate = new Date(
      1995 + Math.random() * (new Date().getFullYear() - 1995),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );
    const date = getRandDate.toISOString().split("T")[0];

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${ACCESS_KEY}&concept_tags=True&date=${date}`)
    .then((res) => res.json())
    .then((data) => setApod(data))
    .catch((error) => console.error(error));
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <>
      <h1>NASA Image of the Day!</h1>

      {apod && (
        <div className="page-container">
          <h3>{apod.title} - {apod.date}</h3>
          {apod.media_type == "image" ? (
            <img src={apod.url} alt={apod.title} style={{width: "600px"}}></img>
          ) : (
            <iframe
              title="video"
              src={apod.url}
            />
          )}
          <p>{apod.explanation}</p>

          <button onClick={callAPI}>New Image</button>
          {/* <button onClick={ban}>Ban Images from {apod.date}</button> */}
        </div>
      )}
    </>
  );
}

export default App
