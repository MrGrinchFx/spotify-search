import { Container, Card, Button, Row } from 'react-bootstrap';
import useSongContext from '../../Hooks/useSongContext';
import MoreInfo from './songInfo';

function SongCard({ tracksList }) {
  const {
    moreInfo,
    play,
    pressPause,
    pressPlay,
    toggleInfo
  } = useSongContext();

  return (
    <Container>
      <Row className=' mx-2 row row-cols-4'>
        {tracksList.map((track, i) => (
          <Card key={i} className={'album-card'}>
            {/* Front Page Section */}
            {!moreInfo[i] && (
              <Container>
                <div className="song">
                  <Card.Img src={track.album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{track.name}</Card.Title>
                  </Card.Body>
                </div>

                <Card.Body>
                  <div className="more-info-btn">
                    <Button onClick={() => toggleInfo(i)}>More Info</Button>
                  </div>
                </Card.Body>
              </Container>
            )}

            {/* More Info Section */}
            {moreInfo[i] && (
              <Container>
                <Card.Body className="more-info">
                  <Card.Title>{track.name}</Card.Title>
                  <ul>
                    <MoreInfo
                      name={track.album.name}
                      release_date={track.album.release_date}
                      artists={track.artists}
                      popularity={track.popularity}
                      duration={track.duration_ms}
                    />
                  </ul>
                  {play[i] && <strong> Currently Playing </strong>}
                </Card.Body>

                {/* Controller buttons */}
                <Card.Body>
                  <div className="button-controls">
                    <div className="more-info-btn">
                      <Button onClick={() => toggleInfo(i)}>Collapse</Button>
                    </div>
                    {!play[i] && (
                      <div className="play-btn">
                        <Button onClick={() => pressPlay(i)}>Play</Button>
                      </div>
                    )}
                    {play[i] && (
                      <div className="play-btn">
                        <Button onClick={() => pressPause(i)}>Pause</Button>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Container>
            )}
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default SongCard;