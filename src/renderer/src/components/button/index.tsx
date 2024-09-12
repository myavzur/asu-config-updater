import { FC } from 'react'
import { ButtonProps } from './props.interface'

export const Button: FC<ButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={
        'cursor-pointer outline-none bg-none border-2 border-blue-400 flex items-center justify-center rounded-md p-2 hover:bg-blue-400 hover:text-white transition-colors'
      }
    >
      <p>{children}</p>
    </button>
  )
}
