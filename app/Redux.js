"use client"
import './globals.css'
import ReadexPro from './font'
import { Next13ProgressBar } from 'next13-progressbar';
import {Provider, useSelector} from 'react-redux';
import store from '../redux/store'
import { SessionProvider } from "next-auth/react";
import {usePathname} from "next/navigation";
import HeaderTop from "./components/HeaderTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import {useState} from "react";
import Global from "./global";
export default function Redux({ children, session, user, itemsFromServer}) {
    const pathname = usePathname()

    return (
        <html lang="ar">
            <body className={ReadexPro.className + " h-[calc(100vh-85.34px)]"}>
                <Provider store={store}>
                    {/*<Toast />*/}
                    <SessionProvider session={session}>
                        <Next13ProgressBar height="3px" color="#4338ca" options={{ showSpinner: false }}  />
                        <div className={"bg-white"}>
                            <HeaderTop />
                            <Header itemsFromServer={itemsFromServer} user={user} />
                        </div>
                        <main className={"flex h-full flex-col"}>
                            <section className={"flex-grow bg-stone-50"}>
                                {children}
                            </section>
                            <Footer />
                        </main>
                        <Global />
                    </SessionProvider>
                </Provider>
            </body>
        </html>
    )

}
