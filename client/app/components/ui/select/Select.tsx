import { FC } from "react"
import makeAnimated from "react-select/animated"
import { IOption, ISelect } from "./select.interface"
import { OnChangeValue } from "react-select"
import styles from "./Select.module.scss"
import formStyles from "@/ui/form-elements/form.module.scss"
import ReactSelect from "react-select"

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = (props) => {
  const { field, options, placeholder, error, isLoading, isMulti } = props

  const onChange = (newValue: OnChangeValue<IOption, boolean> | unknown) => {
    field.onChange(
      isMulti
        ? (newValue as IOption[]).map((item) => item.value)
        : (newValue as IOption).label
    )
  }

  const getValue = () => {
    if (field.value) {
      return isMulti
        ? options.filter((item) => field.value.indexOf(item.value) >= 0)
        : options.find((item) => item.value === field.value)
    } else {
      return isMulti ? [] : ""
    }
  }
  return (
    <div className={styles.selectContainer}>
      <label>
        <span>{placeholder}</span>
        <ReactSelect
          classNamePrefix="custom-select"
          options={options}
          value={getValue()}
          isMulti={isMulti}
          onChange={onChange}
          components={animatedComponents}
          isLoading={isLoading}
        />
      </label>
      {error && <div className={formStyles.error}>{error.message}</div>}
    </div>
  )
}

export default Select
