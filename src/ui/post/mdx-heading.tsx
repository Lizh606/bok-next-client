import React from "react"

interface HeadingProps {
  id?: string
  level: 1 | 2 | 3 | 4 | 5
  children?: React.ReactNode
}

const MdxHeading: React.FC<HeadingProps> = ({ id, level, children }) => {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5"

  return (
    <Tag>
      {id && <div id={id} className="invisible relative -top-24"></div>}
      <a href={id ? `#${id}` : undefined} id={id ? `#${id}` : undefined}>
        {children}
      </a>
    </Tag>
  )
}

export default MdxHeading
