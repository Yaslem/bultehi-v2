"use client"
import './globals.css'
import ReadexPro from './font'
import { Next13ProgressBar } from 'next13-progressbar';
import {Provider, useSelector} from 'react-redux';
import store from '../redux/store'
import { SessionProvider } from "next-auth/react";
import {usePathname} from "next/navigation";
import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import {useState} from "react";
export default function Redux({ children, session, user}) {
    const pathname = usePathname()

    return (
        <html lang="ar">
            <body className={ReadexPro.className + " h-[calc(100vh-85.34px)]"}>
                <Provider store={store}>
                    <Toast />
                    <SessionProvider session={session}>
                        <Next13ProgressBar height="3px" color="#4338ca" options={{ showSpinner: false }}  />
                        <TopHeader />
                        <Header user={user} />
                        <main className={"flex h-full flex-col"}>
                            <section className={"flex-grow"}>
                                {children}
                            </section>
                            <Footer />
                        </main>
                    </SessionProvider>
                </Provider>
            </body>
        </html>
    )

}
