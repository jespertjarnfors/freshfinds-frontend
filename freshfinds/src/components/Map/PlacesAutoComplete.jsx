import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlacesAutocomplete = ({ onAddressChange, onSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    onSelect({ lat, lng });
  };

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