'use client'

import Header from '@/app/(app)/Header'
import { useState, useEffect } from 'react'
import Loading from '../Loading'

const Players = () => {
    const [players, setPlayers] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/players`)
            .then(response => response.json())
            .then(players => {
                setPlayers(JSON.stringify(players))
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            <Header title="Players" />
            <div className="py-12">
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                {players}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Players
