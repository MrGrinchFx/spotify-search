import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, InputGroup, FormControl, Button} from 'react-bootstrap'

import './App.css';
import { useState, useEffect} from 'react'
import useSongContext from './Hooks/useSongContext'
import SongCard from './Pages/Components/SongCard'

function App() {
  const {
    resetMoreInfo,
    resetPlaying,
  } = useSongContext()
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const CLIENT_SECRET=process.env.REACT_APP_CLIENT_SECRET
  const [ searchInput, setSearchInput] = useState('');
  const [ accessToken, setAccessToken] = useState('');
  const [ tracksList, setTracksList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchMode, setSearchMode] = useState({recommendation : false , top_tracks : false}); // Variable to keep track of which search Mode to commence.
 
 
  useEffect(() =>{

    var parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch( 'https://accounts.spotify.com/api/token', parameters)
    .then(result =>result.json())
    .then(json => {setAccessToken(json.access_token);})
  },[])

//Search Artists Function
async function search() {
  setSearchInput('')
  resetMoreInfo();
  resetPlaying();
try {
var searchParameter = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + accessToken
  }
}

// Obtain artist id
var artistId = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist&market=US&limit=1`, searchParameter)
  .then(result => {
    if (result.ok){
      return result.json()
    }
    else{
      throw new Error('Please Insert a Real Artist Name')
    }})
  .then(json => {
    
    if (json.artists.items.length === 0){
      throw new Error('Artist not Found')
    }
    else {
      console.log(json)
      return json.artists.items[0].id
    }
  })
  

// Obtain Top Tracks
const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, searchParameter);
if (!response.ok) {
  throw new Error('Error fetching albums'); // Throw an error if the response is not OK
}

const json = await response.json();
if (json.tracks.length === 0){
  throw new Error('This Artist has no Tracks')
}
setTracksList(json.tracks);

setErrorMsg('')
} catch (error) {
    console.error('An error occurred:', error.message);
    // Set an error state to display a message to the user
    setErrorMsg('An error occurred while searching for the artist or albums: ' + error.message);
  }
}
return (
<div className="search">
<Container>
    <InputGroup className={errorMsg ? 'mb-3 has-error' : 'mb-3 has-success'} size='lg'>
        <FormControl
          placeholder='Search For Artist'
          type='input'
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              search();
            }
          }}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          value={searchInput} // Add this line to bind input value to state
          className={errorMsg ? 'is-invalid' : ''} // Apply input error styling if needed
        />
        <Button onClick={() => {
          search();
          
        }}>Search</Button>
    </InputGroup>
</Container>

{!errorMsg && <SongCard tracksList = {tracksList} />}

{errorMsg && <Container className = 'Error'>
  <strong>{errorMsg}</strong>
</Container>}
</div>
);
}

export default App;
