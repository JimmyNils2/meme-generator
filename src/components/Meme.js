import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Meme = () => {

  //To Meme List
  const [memes, setMemes] = useState([]);

  //To current meme
  const [memeIndex, setMemeIndex] = useState(0);

  //To captions
  const[captions, setCaptions] = useState([]);

  //To navigate by URL
  const navigate = useNavigate();

  //Rando meme list
  const randomList = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  //Get memes from API
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json()
        .then(res => {
          const memes = res.data.memes
          randomList(memes);
          setMemes(memes);
        }));
  }, []);

  //Dynamic inputs
  useEffect(() => {
    //Check if memes is emptym then create a new array, with lenght = box_countm and finally fill with ''
    if(memes.length){
      setCaptions(Array(memes[memeIndex].box_count).fill(''));
    }
  }, [memeIndex, memes]);

  //Caption updates test
  // useEffect(() => {
  //   console.log(captions)
  // });

  //Update captions
  const updateCaption = (e,index) => {
    //Get text value
    const text = e.target.value || '';

    //Update the specific caption
    setCaptions(
      captions.map((caption,i) =>{
        if(index === i){
          return text;
        }else{
          return caption;
        }
      })
    );
  };

  //Create meme
  const createMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();

    //Set credentials
    formData.append('username','jimmynils2');
    formData.append('password','myPass123');
    formData.append('template_id', currentMeme.id);

    //Set meme captions
    captions.forEach((caption,index) => formData.append(`boxes[${index}][text]`,caption));

    fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData
    }).then(res => {
      res.json().then(res => {
        navigate(`createdMeme?url=${res.data.url}`);
      });
    });
  };

  //Check meme index
  const checkMemeIndex = () => {
    if (memeIndex === 0){
      document.querySelector('.prev').disabled = true;
    } else {
      setMemeIndex(memeIndex - 1);
    }
  }

  return (
    memes.length ?
      <div className="container">
        <div className="buttons">
          <button className="button" onClick={createMeme}>Create Meme</button>
              <button className="button button__small button__gray" onClick={checkMemeIndex}>Previous</button>
              <button className="button button__small button__gray" onClick={() => setMemeIndex(memeIndex + 1)}>Next</button>
        </div>
        <div className="captions">
          {
            captions.map((caption, index) => {
              return(
                <input onChange={(e) => updateCaption(e,index)} key={index} placeholder={`add caption ${index+1}`}/>
              )
            })
          }
        </div>
        <img src={memes[memeIndex].url} alt={memes[memeIndex].name} className='meme'/>
      </div>
      : <>There's not memes</>
  )
}