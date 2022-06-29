import {Dimensions, SafeAreaView, StyleSheet, View} from "react-native";
import MapView, {UrlTile} from "react-native-maps";

export const Map = ({places}) => {

    const mapViewMarkers = () => places.map(place =>
        <MapView.Marker
            key={place.coordinates.latitude + place.coordinates.longitude + place.id}
            coordinate={{
                latitude: place.coordinates.latitude,
                longitude: place.coordinates.longitude,
            }} title={place.name}  icon={place.imageUrl}></MapView.Marker>)

    /*
     * Gets initial location to zoom in on or 0,0, if the list is empty
     */
    const getInitialCoordinates = () => {
        let coordinates = {
            latitude: 0,
            longitude: 0,
        }
        if (places.length) {
            coordinates.latitude = places[0].coordinates.latitude;
            coordinates.longitude = places[0].coordinates.longitude;
        }
        return {
            latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            latitudeDelta: 25,
            longitudeDelta: 25,
        }
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     camera={{
                         pitch: 0,
                         heading: 0,
                         altitude: 1000,
                         // Only when using Google Maps
                         zoom: -1000,
                     }}
                     mapType={"none"}
                     initialRegion={getInitialCoordinates()}

            >
                {/* Bypassing the usage of google maps api by rendering tiles
                  *from openstreetmap and thus avoiding having to setup billing
                  *
                  *  https://stackoverflow.com/questions/71061018/react-native-mapview-without-api-key
                  */}
                <UrlTile urlTemplate={"https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"}/>
                {mapViewMarkers()}

            </MapView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        /*        flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',*/
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

{/*camera={{
                center: {
                latitude: 37.78825,
                longitude: -122.4324
            },
                pitch: 0,
                heading: 0,
                altitude: 1000,
                // Only when using Google Maps.
                zoom: -1000
            }*/
}
