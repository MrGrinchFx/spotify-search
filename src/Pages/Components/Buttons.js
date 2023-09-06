import {Button} from 'react-bootstrap'

const SearchModeButton = ({searchMode, setSearchMode}) => {
    
    
    return ( 
      {searchMode[recommendation] == true ? <Button>Recommended Search</Button>}
     );
}

export default SearchModeButton;