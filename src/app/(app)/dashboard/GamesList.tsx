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
            <h1 className="text-purple-800 text-lg mb-5 text-center font-bold">
                Games:
            </h1>
            <div className="grid grid-cols-2 gap-4">
                {games.map(game => (
                    <GameOption key={game.memoTest.id} game={game} />
                ))}
            </div>
        </div>
    )
}

export default GamesLists

{
    /* <div className="h-full py-12">
<div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> */
}
