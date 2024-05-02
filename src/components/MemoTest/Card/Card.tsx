import React from 'react'
import './Card.css'
import { MemoTestCard } from '../MemoTest'

type Props = {
    memoTestCard: MemoTestCard
    index: number
    indexFirstSelected: number | null
    handleSelectCard: (index: number) => void
}

const Card = ({
    memoTestCard,
    index,
    indexFirstSelected,
    handleSelectCard,
}: Props) => {
    return (
        <button
            disabled={memoTestCard.found || indexFirstSelected === index}
            className="card w-[100px] h-[100px] bg-green-300 p-0 relative"
            key={index}
            onClick={() => handleSelectCard(index)}>
            <div className="w-full h-full flex items-center justify-center">
                {memoTestCard.found || indexFirstSelected === index ? (
                    <img
                        className="relative h-full w-full object-cover"
                        src={memoTestCard.image}
                        alt=""
                    />
                ) : (
                    <p className="relative text-center font-semibold text-xl text-green-900">
                        {index + 1}
                    </p>
                )}
            </div>
        </button>
    )
}

export default Card
