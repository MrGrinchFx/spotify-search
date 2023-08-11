import {Card, Row, }

const Card = (props) => {
    return ( 
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
                />
            </ul>
          </Card.Body>
          <Card.Body>
           <div className="button-controls">
              <div className="more-info-btn">
                  <Button onClick={() =>toggleInfo(i)}>Collapse</Button>
                </div>
                {play[i] && (
                  <div className='play-btn'>
                    <Button onClick={() =>togglePlay(i)}>Play</Button>  
                  </div>
                )}
                {!play[i] && (
                  <div className='play-btn'>
                    <Button onClick={() =>togglePlay(i)}>Pause</Button>  
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
     );
}
 
export default Card;pr
ops