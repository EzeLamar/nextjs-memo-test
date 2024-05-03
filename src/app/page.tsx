'client side'

import Header from './(app)/Header'
import Link from 'next/link'

const Home = () => {
    return (
        <>
            <Header title="Home" />
            <div className="relative flex items-top justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-pink-200 sm:items-center sm:pt-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center">
                        <div className="bg-white max-w-sm rounded-lg border border-gray-200 px-3 py-3 shadow-md mx-auto">
                            <h1 className="text-3xl font-bold mb-4 text-purple-800 text-center">
                                Memo Test
                            </h1>
                            <Link
                                className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded"
                                href={'/dashboard'}>
                                Start
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
