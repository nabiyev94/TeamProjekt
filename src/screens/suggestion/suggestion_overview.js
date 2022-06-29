import {Component} from "react";
import {
    Alert,
    FlatList, LogBox, SafeAreaView,
    StyleSheet, View,
} from "react-native";
import {SuggestionTile} from "../../components/suggestion/suggestion_tile";
import {Button, Text} from "@rneui/base";
import {FilterButton} from "../../components/suggestion/filter_button";
import {masterColors} from "../../components/style/MasterColors";

export class SuggestionOverview extends Component {

    state = {
        places: this.props.places,
        votes: this.props.votes,
        allPlaces: [],
        filter: 0
    }

    vote = (placeId, voteValue) => {
        let updatedVotes;
        if (this.props.votes.map(value => value.id).includes(placeId)) {

            updatedVotes = this.props.votes.map(value => {
                if (value.id === placeId && voteValue !== value.voted) {
                    return {
                        id: value.id,
                        votes: value.votes + voteValue,
                        voted: voteValue

                    }
                } else {
                    return {
                        id: value.id,
                        votes: value.votes + (-1 * voteValue),
                        voted: 0
                    }
                }
            })
        } else {
            updatedVotes = [...this.props.votes, {id: placeId, votes: voteValue, voted: voteValue}]
        }
        this.props.setVotes(updatedVotes);
        this.setState({votes: updatedVotes});
        this.filterBy(this.state.filter, updatedVotes);
    }

    async componentDidMount() {
        let flattenedData = []
        await this.props.api.fetchPlaces().then(result => flattenedData = result
            , reason => Alert.alert(reason.message))
        let filteredPlaces = flattenedData;
        if (Object.keys(this.props.preferences).length) {
            const activities = this.props.preferences.activities;
            filteredPlaces = flattenedData.filter(place => {
                if (place["activities"].length) {
                    const activeActivities = Object.keys(activities).filter(activity => activities[activity])
                    return place.activities.some(act => activeActivities.includes(act));
                }
                return false;
            })
        }

        this.setState(({allPlaces: filteredPlaces}));
        this.filterBy(0, this.props.votes)
    }

    tile = ({item}) => {
        const voteData = this.props.votes.filter(voteItems => voteItems.id === item.id)
        let vote = 0
        if (voteData.length) {
            vote = voteData[0].voted;
        }
        return <SuggestionTile item={item} voteValue={vote} onUpVote={() =>
            this.vote(item.id, 1)
        }
                               onDownVote={() =>
                                   this.vote(item.id, -1)}></SuggestionTile>
    }

    filterBy = (type, votes) => {
        const filteredPlaces = this.state.allPlaces.filter(place => {
            if (type === 0 && votes.length === 0) {
                return true;
            }
            return (type === 0 &&
                    !votes
                        .filter(vote => place.id === vote.id)
                        .map(vote => vote.id).includes(place.id)) ||
                votes.filter(vote => {
                    if (vote.id === place.id) {
                        if (vote.voted === type) {
                            return true;
                        }
                    }
                    return false;
                }).map(vote => vote.id).includes(place.id);
        })

        this.setState({
            places: filteredPlaces
        });
        this.props.setPlaces(filteredPlaces);
        this.setState({filter: type});
    }

    getContent = () => {
        if (this.state.places.length === 0) {
            return <Text h3 style={styles.textSlug}>Nothing here yet...</Text>
        }
        return (<FlatList
            numColumns={1}
            style={styles.flatList}
            data={this.state.places}
            renderItem={this.tile}
            keyExtractor={item => item.coordinates.latitude + item.coordinates.longitude + item.id}
        />)
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor : masterColors.backgroundLight}}>
                <View style={styles.categories}>
                    <View style={styles.button}>
                        <FilterButton isPressed={this.state.filter === 0} style={styles.button} onPress={() => this.filterBy(0, this.props.votes)}>Suggested</FilterButton>
                    </View>
                    <View style={styles.button}>

                        <FilterButton isPressed={this.state.filter === -1} style={styles.button} onPress={() => this.filterBy(-1, this.props.votes)}>Discarded</FilterButton>
                    </View>
                    <View style={styles.button}>
                        <FilterButton isPressed={this.state.filter === 1} style={styles.button} onPress={() => this.filterBy(1, this.props.votes)}>Favorites</FilterButton>
                    </View>
                </View>
                {this.getContent()}
            </SafeAreaView>)
    }
}

const styles = StyleSheet.create({
    flatList: {
        backgroundColor: 'transparent',
        marginHorizontal: 10,
    },
    categories: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: "space-evenly",
        marginHorizontal: 20,
    },
    button: {
        flex: 1
    },
    textSlug: {
        marginTop: 100,
        textAlign: "center"
    }
});
