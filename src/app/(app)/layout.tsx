'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql/',
    cache: new InMemoryCache(),
})

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: null,
    })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-pink-200">
            <ApolloProvider client={client}>
                <Navigation user={user} />
                <main>{children}</main>
            </ApolloProvider>
        </div>
    )
}

export default AppLayout
