'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card/Card'

export type MemoTestCard = {
    image: string
    found: boolean
}

type Props = {
    memoTestCards: MemoTestCard[]
    name: string
    sessionId: string
    handleWinGame: () => void
    handleIncreaseRetries: () => void
}

type PairSelected = {
    first: number | null
    second: number | null
}

const MemoTest = ({
    name,
    memoTestCards,
    sessionId,
    handleWinGame,
    handleIncreaseRetries,
}: Props) => {
    const [pairSelected, setPairSelected] = useState<PairSelected>({
        first: null,
        second: null,
    })
    const savedMemoTest = sessionStorage.getItem('session-' + sessionId)
    const [memoTest, setMemoTest] = useState<MemoTestCard[]>(
        savedMemoTest ? JSON.parse(savedMemoTest) : memoTestCards,
    )
    const [missingPairs, setMissingPairs] = useState<number>(
        memoTest.filter(card => !card.found).length / 2,
    )

    useEffect((): void => {
        sessionStorage.setItem('session-' + sessionId, JSON.stringify(memoTest))
    }, [memoTest])

    useEffect((): void => {
        if (pairSelected.second !== null) {
            setTimeout(() => {
                setPairSelected({ first: null, second: null })
            }, 1000)
        }
    }, [pairSelected])

    const UpdateMemoTestCardIndexes = (
        memoTest: MemoTestCard[],
        indexes: number[],
        isFound: boolean,
    ): MemoTestCard[] => {
        return memoTest.reduce(
            (ac: MemoTestCard[], currentCard, currentIndex) => {
                let memoTestCard = currentCard
                if (indexes.includes(currentIndex)) {
                    memoTestCard = {
                        ...memoTestCard,
                        found: isFound,
                    }
                }
                return ac.concat([memoTestCard])
            },
            [],
        )
    }

    const handleSelectCard = (index: number): void => {
        if (pairSelected.first === null) {
            setPairSelected({ ...pairSelected, first: index })
            return
        }

        setPairSelected({ ...pairSelected, second: index })
        handleIncreaseRetries()
        if (memoTest[pairSelected.first].image === memoTest[index].image) {
            const updatedMemoTest = UpdateMemoTestCardIndexes(
                memoTest,
                [pairSelected.first, index],
                true,
            )
            setMemoTest(updatedMemoTest)
            if (missingPairs === 1) {
                sessionStorage.removeItem('session-' + sessionId)
                handleWinGame()
            }
            setMissingPairs(missingPairs - 1)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen font-sans">
            <div className="bg-white shadow-md p-8 max-w-2xl rounded-xl">
                <h1 className="text-3xl font-bold mb-4 text-purple-800 text-center">
                    {name}
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    {memoTest.map((memoTestCard, index) => {
                        return (
                            <Card
                                key={index}
                                image={memoTestCard.image}
                                selected={
                                    memoTestCard.found ||
                                    pairSelected.first === index ||
                                    pairSelected.second === index
                                }
                                index={index}
                                handleSelectCard={handleSelectCard}
                                disabled={
                                    memoTestCard.found ||
                                    pairSelected.first === index ||
                                    pairSelected.second === index
                                }
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MemoTest
