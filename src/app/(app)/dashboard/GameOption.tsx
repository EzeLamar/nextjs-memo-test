'use client'

import { GameType } from './GamesList'
import { useMutation } from '@apollo/client'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { CREATE_SESSION_MUTATION } from '@/graphql/gameSession'

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
            if (game.gameSession.state === 'COMPLETED') {
                router.push('/score/' + game.gameSession?.id)
                return
            }
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
        <div className="flex justify-center">
            <div className="bg-white max-w-sm rounded-lg border border-gray-200 px-3 py-3 shadow-md mx-auto">
                <h1 className="text-purple-800 text-lg mb-2 text-center font-bold">
                    {game.memoTest.name}
                </h1>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded"
                        onClick={handleSelectGame}>
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameOption
