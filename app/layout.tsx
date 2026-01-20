import { type Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Starfield from 'react-starfield'


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My Portfolio',
}

/******************************************************************************************************/
/*                                                                                                    */
/*                                        MANGO DATABASE                                              */
/*                                                                                                    */
/* mongodb+srv://adamdechamp_db_usedr:5wRX8JfxnlQVkLH1@cluster0.klgl4zc.mongodb.net/?appName=Cluster0 */
/*                                                                                                    */
/*                                                                                                    */
/******************************************************************************************************/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div>
              <div>
                {children}
                <Starfield
                  starCount={3000}
                  starColor={[255 , 255, 255]}
                  speedFactor={0.05}
                  backgroundColor="black"
                />
              </div>
          <div className="App">
          </div>
          </div>
        </body>
      </html>
  )
}
