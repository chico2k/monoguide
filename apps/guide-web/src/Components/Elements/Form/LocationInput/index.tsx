import { Field } from 'formik';
import React, { useEffect, useState } from 'react';
import FieldWrapper from '../FieldWrapper';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';
import axios from 'axios';

interface IProps {
  name: string;
}
// Our hook
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

// API search function
function searchCharacters(v) {
  return axios
    .get('http://localhost:4000/dev/location', {
      params: {
        value: v,
      },
    })
    .then((r) => r.data)
    .catch((error) => {
      console.error(error);
      return [];
    });
}

const LocationInput: React.FC<IProps> = ({ name }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // State and setter for search results
  const [results, setResults] = useState([]);
  // State for search status (whether there is a pending API request)

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Set isSearching state
        setIsSearching(true);
        // Fire off our API call
        searchCharacters(debouncedSearchTerm).then((results) => {
          // Set back to false since request finished
          setIsSearching(false);
          // Set results state
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );

  // const [getLocation] = useGetLocationMutation();
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [value, setValue] = useState(undefined);

  return (
    <Field name={name} id={name} type='number' data-test='field'>
      {({ form: { setFieldValue, errors, touched } }) => {
        return (
          <FieldWrapper>
            <Label>Location</Label>

            <div className='flex flex-col align-top bg-red-400 h-full'>
              <input
                type={'search'}
                className='w-full p-2 bg-green-100'
                placeholder='Find your Location'
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setValue(e.target.value);
                }}
                value={value}
              />

              {isSearching && <div>Searching ...</div>}

              {results.map((result) => {
                return (
                  !isSearching && (
                    <div key={result.id}>
                      <button
                        type='button'
                        className='px-2 py-1'
                        onClick={() => {
                          setSelected(result.place_name);
                          setFieldValue(name, result);

                          setValue(result.place_name);
                          setResults([]);
                        }}
                      >
                        {result.place_name}
                      </button>
                    </div>
                  )
                );
              })}
            </div>
            <ErrorMessage name={name} errors={errors} touched={touched} />
          </FieldWrapper>
        );
      }}
    </Field>
  );
};

export default LocationInput;
