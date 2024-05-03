'use client'

import MemoTest, { MemoTestCard } from '@/components/MemoTest/MemoTest'
import Header from '../../Header'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../Loading'
import { useState } from 'react'

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
        }
    }
`

type Props = {
    params: {
        sessionId: string
    }
}
const MemoTestView = ({ params }: Props) => {
    const [memoTestCards, setMemoTestCards] = useState<MemoTestCard[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { data } = useQuery(SESSION_QUERY, {
        variables: { sessionId: Number(params.sessionId) },
        onCompleted: () => {
            setMemoTestCards(
                data.gameSession.memoTest.images.map((image: string) => {
                    return {
                        image: image,
                        found: false,
                    }
                }),
            )
            setIsLoading(false)
        },
    })

    const handleUpdateSession = () => {
        alert('are you wining son?')
    }

    return (
        <>
            <Header title="Memo Test" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <MemoTest
                                    memoTestCards={memoTestCards}
                                    name={data.gameSession.memoTest.name}
                                    sessionId={params.sessionId}
                                    handleUpdateSession={handleUpdateSession}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemoTestView
