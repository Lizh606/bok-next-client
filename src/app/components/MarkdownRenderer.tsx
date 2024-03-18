import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"

import "highlight.js/styles/atom-one-dark.css"

const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
  )
}

export default Markdown
