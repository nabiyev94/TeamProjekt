import {PlacesApiContext} from "./places_api_context";
import {useVote, VotingContext} from "./voting_context_provider";
import {SuggestionOverview} from "../../screens/suggestion/suggestion_overview";
import {PreferencesContext} from "../setup/preferences_context";
import {useContext, useEffect, useState} from "react";
import {Alert} from "react-native";

export const SuggestionOverviewWrapper = ({places, setPlaces}) => {
    const {votes, setVotes} = useVote();

    return <PlacesApiContext.Consumer>{(placesApi) => (
            <PreferencesContext.Consumer>{preferencesContext => (
                <SuggestionOverview
                    api={placesApi}
                    votes={votes}
                    setVotes={setVotes}
                    preferences={preferencesContext.preferences}
                    setPlaces={setPlaces}
                    places={places}
                >
                    )}</SuggestionOverview>
            )}</PreferencesContext.Consumer>
    )}</PlacesApiContext.Consumer>
}
