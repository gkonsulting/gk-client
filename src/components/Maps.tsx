import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Marker } from "@react-google-maps/api";
const containerStyle = {
    width: "580px",
    height: "400px",
    top: "10px",
};

const center = {
    lat: 63.446827,
    lng: 10.421906,
};

export default function Maps(props: any) {
    let lat = 10;
    let lng = 10;
    Geocode.setApiKey("AIzaSyAy2gqXOlsU3LETsRJRxP3JdtMwcmQpil4");
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
        <LoadScript googleMapsApiKey="AIzaSyAy2gqXOlsU3LETsRJRxP3JdtMwcmQpil4">
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
