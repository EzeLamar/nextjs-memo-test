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

    // const startedMemoTestIds: string[] = []
    // const completedMemoTestIds: string[] = []
    // gameSessions.forEach(gameSession => {
    //     const memoTestId = gameSession.memoTest.id
    //     if (gameSession.state === 'Started') {
    //         startedMemoTestIds.push(memoTestId)
    //     } else {
    //         completedMemoTestIds.push(memoTestId)
    //     }
    // })

    return (
        <div className="bg-white shadow-md p-8 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
                {games.map(game => (
                    <GameOption key={game.memoTest.id} game={game} />
                ))}
            </div>
        </div>
    )
}

export default GamesLists
