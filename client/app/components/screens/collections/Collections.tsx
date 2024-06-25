import { FC } from "react"
import { ICollection } from "./collections.interface"
import Heading from "@/components/ui/heading/Heading"
import styles from "./Collections.module.scss"
import Description from "@/components/ui/heading/Description"
import CollectionItem from "./CollectionItem"

interface ICollectionProps {
  collections: ICollection[]
}

const Collections: FC<ICollectionProps> = ({ collections }) => {
  return (
    <div>
      <Heading title="Collections" className={styles.heading} />
      <Description
        text="In this section you can find movies cooections by genres"
        className={styles.description}
      />
      <section className={styles.collections}>
        {collections.map((item) => (
          <CollectionItem key={item._id} collection={item} />
        ))}
      </section>
    </div>
  )
}

export default Collections
