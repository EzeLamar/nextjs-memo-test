import React from 'react'
import './Card.css'

type Props = {
    image: string
    index: number
    disabled: boolean
    selected: boolean
    handleSelectCard: (index: number) => void
}

const Card = ({
    image,
    index,
    disabled,
    selected,
    handleSelectCard,
}: Props) => {
    return (
        <>
            <button
                disabled={disabled}
                className="card flip-card w-[100px] h-[100px] p-0 relative"
                key={index}
                onClick={() => handleSelectCard(index)}>
                <div
                    className={`flip-card-inner relative w-[100%] h-[100%] bg-green-500 ${
                        !selected ? 'flipped' : ''
                    }`}>
                    <div className="flip-card-front">
                        <img
                            className="card absolute w-[100%] h-[100%] object-cover"
                            src={image}
                            alt={'image-' + index}
                        />
                    </div>
                    <div className="card flip-card-back absolute w-[100%] h-[100%] text-center font-semibold text-xl text-green-900">
                        <p className="relative w-full h-full flex items-center justify-center">
                            {index + 1}
                        </p>
                    </div>
                </div>
            </button>
        </>
    )
}

export default Card
