import {Component} from "react";
import {Places} from "./places_list";
import {Alert} from "react-native";

export class PlacesApi extends Component {
    constructor(props) {
        super(props);
    }


   /* fetchPlaces = () => {
        return Places;
    }*/

    fetchPlaces = () => {
        return new Promise((resolve, reject) => {
            let flattenedData = []
            Places.forEach(dataItem => flattenedData = flattenedData.concat(dataItem.data))

            resolve(flattenedData.map(place => {
                    return {
                        id: place.id,
                        imageUrl: place.pictures[0],
                        name: place.name,
                        duration: place.duration,
                        description: place.shortDescription,
                        price: {
                            amount: parseFloat(place.price.amount),
                            currency: place.price.currencyCode,
                        },
                        coordinates: {
                            latitude: parseFloat(place.geoCode.latitude),
                            longitude: parseFloat(place.geoCode.longitude)
                        },
                        activities: place.activities !== undefined ? place.activities : [],
                        travelModes: place.travelModes !== undefined ? place.travelModes : []
                    }
                }))
            }
        )
    }
}
