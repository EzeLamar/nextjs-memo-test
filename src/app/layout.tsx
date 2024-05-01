import '@/app/global.css'

export const metadata = {
    title: 'Laravel',
}
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    )
}

export default RootLayout
