import { FC } from 'react'
import { LayoutProps } from './props.interface'

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <main className="w-[1280px] mx-auto py-6">{children}</main>
}
