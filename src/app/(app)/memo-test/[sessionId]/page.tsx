'use client'

import MemoTest, { MemoTestCard } from '@/components/MemoTest/MemoTest'
import Header from '../../Header'
import { gql, useMutation, useQuery } from '@apollo/client'
import Loading from '../../Loading'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

type Props = {
    params: {
        sessionId: string
    }
}
const MemoTestView = ({ params }: Props) => {
    const router = useRouter()
    const [memoTestCards, setMemoTestCards] = useState<MemoTestCard[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [retries, setRetries] = useState<number>(0)
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
            setRetries(data.gameSession.retries)
            setIsLoading(false)
        },
    })
    const [editSession] = useMutation(UPDATE_SESSION_MUTATION)

    const handleWinGame = () => {
        alert('are you wining son?')

        editSession({
            variables: {
                sessionId: params.sessionId,
                state: 'COMPLETED',
                retries: retries + 1,
            },
        }).then(() => {
            router.push('/score/' + params.sessionId)
        })
    }

    const handleIncreaseRetries = () => {
        const updatedRetry = retries + 1
        editSession({
            variables: { sessionId: params.sessionId, retries: updatedRetry },
        })
        setRetries(updatedRetry)
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
                                    handleWinGame={handleWinGame}
                                    handleIncreaseRetries={
                                        handleIncreaseRetries
                                    }
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
