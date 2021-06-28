import { AwesomeDebouncePromise } from 'awesome-debounce-promise'
import { useAsync } from 'react-async-hook'
import { useConstant } from 'use-constant'
import { RestaurantContext } from '../context/RestaurantsContext';
const { useContext } = require("react");



// Generic reusable hook
const useDebouncedSearch = (searchFunction) => {

    const { searchText, setSearchText } = useContext(RestaurantContext)
    // Handle the input text state
    // const [inputText, setInputText] = useState('');
  
    // Debounce the original search async function
    const debouncedSearchFunction = useConstant(() =>
      AwesomeDebouncePromise(searchFunction, 1000)
    );
  
    // The async callback is run each time the text changes,
    // but as the search function is debounced, it does not
    // fire a new request on each keystroke
    const searchResults = useAsync(
      async () => {
        if (searchText.length === 0) {
          return [];
        } else {
          return debouncedSearchFunction(searchText);
        }
      },
      [debouncedSearchFunction, searchText]
    );
  
    // Return everything needed for the hook consumer
    return {
      searchText,
      setSearchText,
      searchResults,
    };
  };

export default useDebouncedSearch