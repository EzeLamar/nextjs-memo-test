import { gql } from '@apollo/client'

const SESSION_QUERY = gql`
    query getSession($sessionId: ID!) {
        gameSession(id: $sessionId) {
            memoTest {
                id
                images
                name
            }
            retries
            state
            numberOfPairs
            score
        }
    }
`

const UPDATE_SESSION_MUTATION = gql`
    mutation editGameSession(
        $sessionId: ID!
        $retries: Int
        $state: StateType
    ) {
        updateGameSession(id: $sessionId, retries: $retries, state: $state) {
            numberOfPairs
            retries
            state
            id
        }
    }
`

const CREATE_SESSION_MUTATION = gql`
    mutation createGameSession($userId: ID!, $memoTestId: ID!, $pairs: Int!) {
        createGameSession(
            input: {
                state: STARTED
                retries: 0
                numberOfPairs: $pairs
                player: { connect: $userId }
                memoTest: { connect: $memoTestId }
            }
        ) {
            id
        }
    }
`

export { SESSION_QUERY, UPDATE_SESSION_MUTATION, CREATE_SESSION_MUTATION }
