import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, InputGroup, FormControl, Button, Card, Row} from 'react-bootstrap'
import MoreInfo from './Pages/Components/songInfo'
import './App.css';
import { useState, useEffect} from 'react'

function App() {
  const CLIENT_ID ='7acfad3cd4c44f36bc670e1d3c6683c5'
  const CLIENT_SECRET='63641ebfa7324ba9bbbc942b706e9800'
  const [ searchInput, setSearchInput] = useState('');
  const [ accessToken, setAccessToken] = useState('');
  const [ albumsList, setAlbumsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [moreInfo, setMoreInfo] = useState([]);
  const [play, setPlay] = useState([])
 
function resetMoreInfo() {
  const newMoreInfo = Array(moreInfo.length).fill(false);
  setMoreInfo(newMoreInfo);
}
function pressPause(index){
  const newStates = Array(play.length).fill(false)
  setPlay(newStates)
}
function pressPlay(index){
    
    const newStates = Array(play.length).fill(false)
    newStates[index] = true
    setPlay(newStates)

}  
function toggleInfo(index){
  setMoreInfo((prevStates) =>{
    const newStates = [...prevStates]
    newStates[index] = !newStates[index]
    return newStates
  })
}  
 
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
  setSearchInput(''); // Clear input field after search
  resetMoreInfo();
try {
var searchParameter = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + accessToken
  }
}

// Obtain artist id
var artistId = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist&market=US`, searchParameter)
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
setAlbumsList(json.tracks);

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

{!errorMsg && 
<Container>
<Row className=' mx-2 row row-cols-4'>
  {albumsList.map( (track, i) =>{
  
    return(
      <Card key = {i} className = {'album-card'}>
        {!moreInfo[i] && 
        <Container> 
          <div className="song">
            <Card.Img src = {track.album.images[0].url} />
            <Card.Body>
              <Card.Title>{track.name}</Card.Title>
            </Card.Body>
          </div>
        
          <Card.Body>
            <div className="more-info-btn">
              <Button onClick={() =>toggleInfo(i)}>More Info</Button>
            </div>
          </Card.Body>
        </Container>
        }
        {moreInfo[i] && 
        <Container> 
          <Card.Body className='more-info'>
          <Card.Title>{track.name}</Card.Title>
            <ul>
              <MoreInfo name = {track.album.name}
                release_date = {track.album.release_date}
                artists = {track.artists}
                popularity = {track.popularity}
                duration = {track.duration_ms}
                />
            </ul>
            {play[i] && <strong> Currently Playing </strong>}
          </Card.Body>
          
          
          <Card.Body>
           <div className="button-controls">
              <div className="more-info-btn">
                  <Button onClick={() =>toggleInfo(i)}>Collapse</Button>
                </div>
                {!play[i] && (
                  <div className='play-btn'>
                    <Button onClick={() =>pressPlay(i)}>Play</Button>  
                  </div>
                )}
                {play[i] && (
                  <div className='play-btn'>
                    <Button onClick={() =>pressPause(i)}>Pause</Button>  
                  </div>
                )}
           </div>
          </Card.Body>
        </Container>}
       
      </Card>
    )
  })}
 

</Row>
</Container>}
{errorMsg && <Container className = 'Error'>
  <strong>{errorMsg}</strong>
</Container>}
</div>
);
}

export default App;
