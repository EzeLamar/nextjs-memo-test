'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql/',
    cache: new InMemoryCache(),
})

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <ApolloProvider client={client}>
                <Navigation user={user} />
                <main>{children}</main>
            </ApolloProvider>
        </div>
    )
}

export default AppLayout
