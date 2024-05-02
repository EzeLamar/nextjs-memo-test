'use client'

import Link from 'next/link'
import { GameType } from './GamesList'

type Prop = {
    game: GameType
}

const GameOption = ({ game }: Prop) => {
    let buttonLabel = 'Start'
    if (game.gameSession) {
        buttonLabel =
            game.gameSession.state === 'Started' ? 'In Progress' : 'Completed'
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    {game.memoTest.name}
                </div>
                {/* <p className="text-gray-700 text-base">Score: 0 Errors: 0</p> */}
            </div>
            <div className="px-6 pt-4 pb-2">
                <Link
                    href={'/memo-test/' + game.memoTest.id}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {buttonLabel}
                </Link>
            </div>
        </div>
    )
}

export default GameOption
