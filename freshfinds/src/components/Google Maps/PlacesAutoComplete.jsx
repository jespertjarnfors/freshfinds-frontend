/* eslint-disable react/prop-types */

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// PlacesAutocomplete component
const PlacesAutocomplete = ({ onAddressChange, onSelect }) => {
  // usePlacesAutocomplete provides the API to interact with Google Places Autocomplete service
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  // handleSelect is triggered when a user selects an address from the dropdown
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    // getGeocode and getLatLng are used to fetch the coordinates of the selected address
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    onSelect({ lat, lng });
  };

  // The component renders an input field and a list of suggestions
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onAddressChange(e.target.value);
        }}
        disabled={!ready}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Search an address"
      />
      {status === "OK" && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
          {data.map(({ place_id, description }) => (
            <div
              key={place_id}
              onClick={() => handleSelect(description)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesAutocomplete;