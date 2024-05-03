'use client'

import Loading from '../Loading'
import { useQuery } from '@apollo/client'
import Header from '../Header'
import { useAuth } from '@/hooks/auth'
import GamesLists from './GamesList'
import { MEMO_TESTS_QUERY } from '@/graphql/memoTest'

const Dashboard = () => {
    const { user } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: null,
    })
    const { data, loading, error } = useQuery(MEMO_TESTS_QUERY, {
        fetchPolicy: 'network-only',
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
                        <GamesLists
                            memoTests={data.memoTests}
                            gameSessions={data.user.gameSessions}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashboard
