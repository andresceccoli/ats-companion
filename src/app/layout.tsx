'use client'

// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button, DarkThemeToggle, Flowbite, Navbar, ThemeModeScript } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useItineraryStore from "./route/itinerary-store";
import { useShallow } from "zustand/shallow";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const { clearStore } = useItineraryStore(useShallow(state => ({ clearStore: state.clear, startCity: state.startCity })));

  const onNewRoute = useCallback(() => {
    clearStore();
    router.push('/route/new');
  }, [clearStore, router]);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <ThemeModeScript />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" /> */}
        <style>
        @import url(&quot;https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap&quot;);
        </style>
      </head>
      <body>
        <Flowbite>
          <div className="bg-blue-900 dark:bg-gray-900 flex flex-col">
            <main className="flex justify-center">  
              <section className="mx-0 md:mx-20 flex-1 bg-white dark:bg-gray-800 min-h-screen">
                <Navbar fluid rounded className="px-4">
                  <Navbar.Brand href="/">
                    <span className="text-2xl font-bold">American</span><span className="text-2xl">Companion</span>
                  </Navbar.Brand>
                  <div className="flex md:order-2 gap-2">
                    <DarkThemeToggle />
                    <Button onClick={onNewRoute}>New Route</Button>
                  </div>
                </Navbar>
                <div className="px-4 py-3">
                  {children}
                </div>
              </section>
            </main>
          </div>
        </Flowbite>
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js" async></script>
      </body>
    </html>
  );
}
