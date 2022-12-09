import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';

export const CreatedMeme = () => {

  const [copied,setCopied] = useState(false);

  //To navigate by URL
  const navigate = useNavigate();

  //To get URL
  const location = useLocation();

  //Get URL param
  const url = new URLSearchParams(location.search).get('url');

  //To clipboard
  const clipboard = useClipboard();

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  }

  return (
    <div className='container'>
      <div className="buttons">
        <button onClick={() => navigate('/')} className='button'>Create More Memes</button>
        <button onClick={copyLink} className='button button__small button__gray'>{copied ? 'Link copied!' : 'Copy link!'}</button>
      </div>
      {url && <img src={url} alt='Created Meme' className='meme'/>}
    </div>
  )
}