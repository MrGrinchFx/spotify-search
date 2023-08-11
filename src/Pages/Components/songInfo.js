const MoreInfo = (props) => {
   const name = props.name
   const release_date = props.release_date
   const artists = props.artists
   const popularity = props.popularity
   
    return ( 
    <div>
        <p>Album: {name}</p>
        <p>Date: {release_date}</p>
        <p>Artists: {
            artists.map((artist) =>artist.name).join(', ')
        }</p>
        <p>Popularity: {popularity}/100</p>
    </div> );
}
 
export default MoreInfo;