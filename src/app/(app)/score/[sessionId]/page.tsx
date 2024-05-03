'use client'

import { useQuery } from '@apollo/client'
import Header from '../../Header'
import { SESSION_QUERY } from '@/graphql/gameSession'
import Loading from '../../Loading'
import Link from 'next/link'

type Props = {
    params: {
        sessionId: string
    }
}

const ScoreView = ({ params }: Props) => {
    const { data, loading } = useQuery(SESSION_QUERY, {
        fetchPolicy: 'network-only',
        variables: { sessionId: Number(params.sessionId) },
    })
    return (
        <>
            <Header title="Score" />
            <div className="h-full py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="flex justify-center">
                            <div className="bg-white max-w-sm rounded-lg border border-gray-200 px-3 py-3 shadow-md mx-auto">
                                <h1 className="text-3xl font-bold mb-4 text-purple-800 text-center">
                                    {data.gameSession.memoTest.name}
                                </h1>
                                <h2 className="text-lg font-medium mb-2 text-center">
                                    Final score:
                                </h2>
                                <p className="text-3xl font-bold text-center">
                                    {data.gameSession.score}/100
                                </p>
                                <Link
                                    className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded"
                                    href={'/dashboard'}>
                                    Back
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ScoreView
