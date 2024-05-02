'use client'

import Loading from '../Loading'
import { useQuery, gql } from '@apollo/client'
import Header from '../Header'
import { useAuth } from '@/hooks/auth'
import GamesLists from './GamesList'

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

const Dashboard = () => {
    const { user } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: null,
    })
    const { data, loading, error } = useQuery(MEMO_TESTS_QUERY, {
        variables: { userId: user.id },
    })

    if (error) {
        return <pre>{error.message}</pre>
    }

    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <GamesLists
                                memoTests={data.memoTests}
                                gameSessions={data.user.gameSessions}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashboard
