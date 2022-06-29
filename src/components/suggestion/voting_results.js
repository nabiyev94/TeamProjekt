import {FlatList, StyleSheet, View} from 'react-native'
import {useVote} from "./voting_context_provider";
import {SuggestionTile} from "./suggestion_tile";

export const VotingResults = ({places}) => {
    const {votes, setVotes} = useVote()

    const doVote = (placeId, voteValue) => {
        let updatedVotes;
        if (votes.map(value => value.id).includes(placeId)) {

            updatedVotes = votes.map(value => {
                if (value.id === placeId && voteValue !== value.voted) {
                    return {
                        id: value.id,
                        votes: value.votes + voteValue,
                        voted: voteValue

                    }
                } else {
                    return {
                        id: value.id,
                        votes: value.votes + (-1*voteValue),
                        voted: 0
                    }
                }
            })
        } else {
            updatedVotes = [...votes, {id: placeId, votes: voteValue, voted: voteValue}]
        }
        setVotes(updatedVotes);
    }

        const tile = ({item}) => {
            const voteData = votes.filter(voteItems => voteItems.id === item.id)
            let vote = 0
            if (voteData.length) {
                vote = voteData[0].voted;
            }
            return <SuggestionTile item={item} voteValue={vote} onUpVote={() => doVote(item.id, 1)}
                                   onDownVote={() => doVote(item.id, -1)}></SuggestionTile>
        }

        return (
            <View>
                <FlatList
                    style={styles.flatList}
                    data={places.filter(place =>
                        votes.filter(vote => {
                            if (vote.id === place.id) {
                                if (vote.voted === 1) {
                                    return true;
                                }
                            }
                            return false;
                        }).map(vote => vote.id).includes(place.id)
                    )}
                    renderItem={tile}
                    keyExtractor={item => item.id}
                />
            </View>
        );

};

const styles = StyleSheet.create({
    flatList: {
        backgroundColor: 'transparent',
        margin: 10,
    },
});

