import { useEffect } from "react";

type Geocode = {
  lat: number
  lng: number
  showAddress: boolean
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  prefecture: string;
  setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  fullAddress: string
  setFullAddress: React.Dispatch<React.SetStateAction<string>>;
}

const GeocodeAddress: React.FC<Geocode> = ({ lat, lng, showAddress, country, setCountry, prefecture, setPrefecture, city, setCity, fullAddress, setFullAddress }) => {

  useEffect(() => {
    const getAddressFrom = (lat: number, lng: number) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          let cityName = "";
          let prefectureName = "";
          let countryName = "";
          let formattedAddress = "";
          let postalCode = "";

          results[0].address_components.forEach((component) => {
            if (component.types.includes("postal_code")) {
              postalCode = "〒" + component.long_name;
            }
            if (component.types.includes("locality")) {
              cityName = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              prefectureName = component.long_name;
            }
            if (component.types.includes("country")) {
              countryName = component.long_name;
            }
          });

          formattedAddress = results[0].formatted_address
            .replace(`${countryName}、`, "")
            .replace(`${postalCode} `, "")
            .replace(/^[A-Z0-9\+\-]+\s*/, "");

          setPrefecture(prefectureName);
          setCity(cityName);
          setCountry(countryName);
          setFullAddress(formattedAddress)
        } else {
          setPrefecture("");
          setCity("");
          setCountry("");
        }
      });
    };

    getAddressFrom(lat, lng);
  }, [lat, lng]);


  return (
    <div>
      {showAddress && <p><strong>住所:</strong> {fullAddress}</p>}
      {!showAddress && <p>{country} {prefecture}{city} </p>}
    </div>
  );
};

export default GeocodeAddress;
