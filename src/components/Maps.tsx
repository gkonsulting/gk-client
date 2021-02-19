import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Marker } from "@react-google-maps/api";
const containerStyle = {
    width: "580px",
    height: "400px",
    top: "10px",
};

export default function Maps(props: any) {
    let lat = 10;
    let lng = 10;
    const apiKey = process.env.NEXT_GOOGLE_API_KEY!
    Geocode.setApiKey(apiKey);
    Geocode.fromAddress(props.address).then(
        (response: any) => {
            console.log(response);

            lat = response.results[0].geometry.location["lat"];
            lng = response.results[0].geometry.location["lng"];
            console.log(lat, lng);
        },
        (error: any) => {
            console.error(error);
        }
    );
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{
                    lat: 63.410639,
                    lng: 10.3983317,
                }}
                zoom={15}
            >
                <Marker
                    position={{ lat: 63.410639, lng: 10.3983317 }}
                    label={props.address}
                />
                {/* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    );
}

//export default React.memo(Maps);
