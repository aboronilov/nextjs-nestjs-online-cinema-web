import { FC } from "react"
import parse from "html-react-parser"
import cn from "classnames"

const Description: FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  return (
    <div
      className={cn(className, "text-lg font-light text-white text-opacity-60")}
    >
      {parse(text)}
    </div>
  )
}

export default Description
