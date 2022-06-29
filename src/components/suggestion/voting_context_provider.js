import {createContext, useContext, useState} from "react";

const VotingContext = createContext({votes: [], setVotes: Function});

export const VotingContextProvider = ({children}) => {

    const [votes, setVotes] = useState([]);

    return <VotingContext.Provider value={{votes: votes, setVotes: setVotes}}>
        {children}
    </VotingContext.Provider>
}

export const useVote = () => useContext(VotingContext);
