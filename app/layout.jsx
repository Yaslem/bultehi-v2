
import './globals.css'

import dynamic from 'next/dynamic'
import Redux from "./Redux";
import useCurrentUser from "../controllers/CurrentUser";
import {getItems} from "../controllers/Cart";

// const Header = dynamic(() => import('./components/Header'), { ssr: false })
// const HeaderTop = dynamic(() => import('./components/HeaderTop'), { ssr: false })
// const Footer = dynamic(() => import('./components/Footer'), { ssr: false })

export const metadata = {
  title: {
    template: `%s | ${process.env.SITE_TITLE}`,
    default: `${process.env.SITE_TITLE}`,
  },
  description: `${process.env.SITE_DESC}`,
}

export default async function RootLayout({children}) {
  const user = await useCurrentUser()
  const { status, data: items } = await getItems()
  return (
    <Redux itemsFromServer={items} user={user}>
      {children}
    </Redux>
  )
}
