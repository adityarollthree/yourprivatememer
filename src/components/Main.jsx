import { useState, useEffect } from "react";
export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function handleChange(event) {
    const { value, name } = event.currentTarget;

    setMeme((prevVal) => ({ ...prevVal, [name]: value }));
  }
  function getMemeImage() {
    const rand = Math.floor(Math.random() * allMemes.length);
    const randImg = allMemes[rand].url;
    setMeme((prevVal) => ({
      ...prevVal,
      imageUrl: randImg,
    }));
  }
  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            onChange={handleChange}
            type="text"
            placeholder="One does not simply"
            name="topText"
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            onChange={handleChange}
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            value={meme.bottomText}
          />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
