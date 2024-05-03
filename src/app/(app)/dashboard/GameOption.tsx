'use client'

import { GameType } from './GamesList'
import { gql, useMutation } from '@apollo/client'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'

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

type Prop = {
    game: GameType
}

const GameOption = ({ game }: Prop) => {
    const router = useRouter()
    const { user } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: null,
    })
    const [addSession] = useMutation(CREATE_SESSION_MUTATION)

    const handleSelectGame = () => {
        if (game.gameSession) {
            router.push('/memo-test/' + game.gameSession?.id)
            return
        }

        addSession({
            variables: {
                userId: user.id,
                memoTestId: game.memoTest.id,
                pairs: game.memoTest.images.length / 2,
            },
        }).then(result => {
            router.push('/memo-test/' + result.data.createGameSession.id)
        })
    }

    let buttonLabel = 'Start'
    if (game.gameSession) {
        buttonLabel =
            game.gameSession.state === 'STARTED' ? 'In Progress' : 'Completed'
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    {game.memoTest.name}
                </div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSelectGame}>
                    {buttonLabel}
                </button>
            </div>
        </div>
    )
}

export default GameOption
