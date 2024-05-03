'use client'

import MemoTest, { MemoTestCard } from '@/components/MemoTest/MemoTest'
import Header from '../../Header'
import { useMutation, useQuery } from '@apollo/client'
import Loading from '../../Loading'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SESSION_QUERY, UPDATE_SESSION_MUTATION } from '@/graphql/gameSession'

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
        editSession({
            variables: {
                sessionId: params.sessionId,
                state: 'COMPLETED',
                retries: retries + 1,
            },
        }).then(result => {
            router.push('/score/' + result.data.updateGameSession.id)
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
            <div className="h-full py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <MemoTest
                            memoTestCards={memoTestCards}
                            name={data.gameSession.memoTest.name}
                            sessionId={params.sessionId}
                            handleWinGame={handleWinGame}
                            handleIncreaseRetries={handleIncreaseRetries}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default MemoTestView
