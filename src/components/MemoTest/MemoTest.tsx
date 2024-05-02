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
    handleUpdateSession: () => void
}

const MemoTest = ({
    name,
    memoTestCards,
    sessionId,
    handleUpdateSession,
}: Props) => {
    const [indexFirstSelected, setIndexFirstSelected] = useState<number | null>(
        null,
    )
    const savedMemoTest = sessionStorage.getItem('session-' + sessionId)
    const [memoTest, setMemoTest] = useState<MemoTestCard[]>(
        savedMemoTest ? JSON.parse(savedMemoTest) : memoTestCards,
    )
    const [unfoundPairs, setUnfoundPairs] = useState<number>(
        memoTest.filter(card => !card.found).length / 2,
    )

    useEffect((): void => {
        sessionStorage.setItem('session-' + sessionId, JSON.stringify(memoTest))
    }, [memoTest])

    const handleSelectCard = (index: number): void => {
        if (indexFirstSelected === null) {
            setIndexFirstSelected(index)
            return
        }
        //TODO increment retries + 1

        if (memoTest[indexFirstSelected].image === memoTest[index].image) {
            const updatedMemoTest = memoTest.reduce(
                (ac: MemoTestCard[], currentCard, currentIndex) => {
                    let memoTestCard = currentCard
                    if (
                        currentIndex === indexFirstSelected ||
                        currentIndex === index
                    ) {
                        memoTestCard = {
                            ...memoTestCard,
                            found: true,
                        }
                    }
                    return ac.concat([memoTestCard])
                },
                [],
            )
            setMemoTest(updatedMemoTest)

            //TODO increment score

            //TODO if all cards found then execute mutation of graphql to update
            if (unfoundPairs === 1) {
                handleUpdateSession()
            }

            setUnfoundPairs(unfoundPairs - 1)
            setIndexFirstSelected(null)
            return
        }
        setIndexFirstSelected(null)
    }

    return (
        <div className="bg-gradient-to-br from-yellow-200 to-pink-200 flex justify-center items-center h-screen font-sans">
            <div className="bg-white shadow-md p-8 max-w-2xl rounded-xl">
                <h1 className="text-3xl font-bold mb-4 text-purple-800 text-center">
                    {name}
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    {memoTest.map((memoTestCard, index) => {
                        return (
                            <Card
                                key={index}
                                memoTestCard={memoTestCard}
                                index={index}
                                indexFirstSelected={indexFirstSelected}
                                handleSelectCard={handleSelectCard}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MemoTest
