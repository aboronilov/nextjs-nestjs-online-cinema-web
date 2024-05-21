import { FC } from "react"
import { IButton } from "./interface/form.interface"
import cn from "classnames"
import styles from "./form.module.scss"

const Button: FC<IButton> = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={cn(styles.button, className)}>
      {children}
    </button>
  )
}
export default Button
