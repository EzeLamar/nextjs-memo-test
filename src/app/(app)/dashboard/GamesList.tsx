'use client'

import { useEffect, useState } from 'react'
import GameOption from './GameOption'

type MemoTestType = {
    id: string
    images: string[]
    name: string
}

type SessionType = {
    id: string
    memoTest: {
        id: string
    }
    state: string
    numberOfPairs: number
    retries: number
}

export type GameType = {
    memoTest: MemoTestType
    gameSession: SessionType | null
}

type Props = {
    memoTests: MemoTestType[]
    gameSessions: SessionType[]
}

const GamesLists = ({ memoTests, gameSessions }: Props) => {
    const [games, setGames] = useState<GameType[]>([])

    useEffect((): void => {
        const levels = memoTests.map(memoTest => {
            const gameSession = gameSessions.find(
                gameSession => gameSession.memoTest.id === memoTest.id,
            )

            return {
                memoTest,
                gameSession: gameSession ?? null,
            }
        })
        setGames(levels)

        return
    }, [])

    return (
        <div className="h-full py-6 p-12 max-w">
            <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-4">
                {memoTests.length === 0 ? (
                    <div className="text-purple-800 text-lg mb-2 text-center font-bold">
                        Memo Tests not found..
                    </div>
                ) : (
                    games.map(game => (
                        <GameOption key={game.memoTest.id} game={game} />
                    ))
                )}
            </div>
        </div>
    )
}

export default GamesLists
