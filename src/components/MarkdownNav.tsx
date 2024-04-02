//拼接字符串工具
import clsx from "clsx"

export default function MarkdownNav(props: any) {
  switch (props.tagName) {
    case "nav": {
      return (
        <nav {...props.properties}>
          {props.children.map((item: any, index: number) => {
            return <MarkdownNav {...item} key={index} />
          })}
        </nav>
      )
    }
    case "ol": {
      return (
        <ol {...props.properties}>
          {props.children.map((item: any, index: number) => {
            return <MarkdownNav {...item} key={index} />
          })}
        </ol>
      )
    }
    case "li": {
      return (
        <li {...props.properties}>
          {props.children.map((item: any, index: number) => {
            return <MarkdownNav {...item} key={index} />
          })}
        </li>
      )
    }
    case "a": {
      return (
        <a
          {...props.properties}
          className={clsx(
            "block py-1 text-sm font-medium hover:text-[#428dcc] focus:outline-none dark:hover:text-gray-200 focus-visible:text-gray-700 dark:opacity-90 dark:focus-visible:text-gray-200 text-gray-400",
            props.properties.href == "#" + props.idTable &&
              "text-[#428dcc] dark:text-gray-200"
          )}
        >
          {props.children.map((item: any, index: number) => {
            return <MarkdownNav {...item} key={index} />
          })}
        </a>
      )
    }
    default:
      return <>{props.value}</>
  }
}
