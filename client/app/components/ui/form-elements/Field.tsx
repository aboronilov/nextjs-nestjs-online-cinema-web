import { forwardRef } from "react"
import { IField } from "./interface/form.interface"
import styles from "./form.module.scss"
import cn from "classnames"

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, style, type = "text", ...rest }, ref) => {
    return (
      <div className={cn(styles.field, styles.common)} style={style}>
        <label>
          <span>{placeholder}</span>
          <input type={type} ref={ref} {...rest} />
        </label>
        {error ? <div className={styles.error}>{error.message}</div> : null}
      </div>
    )
  }
)

Field.displayName = "Field"

export default Field
