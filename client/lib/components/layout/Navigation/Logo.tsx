import Image from "next/image"
import Link from "next/link"
import React, { FC } from "react"

import logoImage from "@/assets/images/logo.svg"

const Logo: FC = () => {
  return (
    <Link href="/" legacyBehavior>
      <a>
        <Image
          src={logoImage}
          width={247}
          height={34}
          alt="logo"
          draggable={false}
        />
      </a>
    </Link>
  )
}

export default Logo