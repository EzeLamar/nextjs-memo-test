import { gql } from '@apollo/client'

const MEMO_TESTS_QUERY = gql`
    query getMemotests($userId: ID!) {
        memoTests {
            id
            images
            name
        }
        user(id: $userId) {
            gameSessions {
                id
                numberOfPairs
                retries
                state
                memoTest {
                    id
                }
            }
        }
    }
`

export { MEMO_TESTS_QUERY }
