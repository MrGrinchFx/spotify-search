const MoreInfo = (props) => {
   const name = props.name
   const release_date = props.release_date
   const artists = props.artists
   const popularity = props.popularity
   const duration = props.duration
   
   function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
    return ( 
    <div>
        <p>Album: {name}</p>
        <p>Date: {release_date}</p>
        <p>Artists: {
            artists.map((artist) =>artist.name).join(', ')
        }</p>
        <p>Popularity: {popularity}/100</p>
        <p>Duration: {millisToMinutesAndSeconds(duration)}</p>
    </div> );
}
 
export default MoreInfo;