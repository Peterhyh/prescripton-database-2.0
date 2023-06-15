import usePlacesAutocomplete, {
    getGeocode,
    getZipCode
} from "use-places-autocomplete";

import useOnclickOutside from "react-cool-onclickoutside";
import { useDispatch } from 'react-redux';
import { updateStreet } from '../slice/newPatientSlice';
import { useState } from 'react';

const PlacesAutocomplete = ({ street }) => {

    const [zipCode, setZipCode] = useState('');

    const dispatch = useDispatch();

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"

        dispatch(updateStreet(description.replace(/USA/, '') + zipCode));
        setValue(description, false);
        clearSuggestions();
        setValue('');


    };

    const renderSuggestions = () =>
        data.map((suggestion, i) => {
            getGeocode({ address: suggestion.description })
                .then((results) => {
                    const resultZipCode = getZipCode(results[0], false);
                    setZipCode(resultZipCode);
                });
            return (
                <td key={i} onClick={handleSelect(suggestion)}>
                    {/* {suggestion.description.replace(/USA/, '')}{zipCode} */}
                    {suggestion.description.replace(/, USA/, '')}
                </td>
            )
        });

    return (
        <div ref={ref} className={street.length === 0 ? 'placesAutocomplete' : 'hide'}>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                required={street.length === 0 ? true : false}
            />
            <span>Street</span>
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" &&
                <table>
                    <tr className='placesAutocompleteResults'>{renderSuggestions()}</tr>
                </table>
            }
        </div>
    );
};

export default PlacesAutocomplete;