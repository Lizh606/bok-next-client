import MarkdownNav from "@/components/MarkdownNav"
import Markdown from "@/components/MarkdownRenderer"
import { getAllPosts, getPostBySlug } from "@/lib/posts"

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

function getPost(params: Props["params"]) {
  const post = getPostBySlug(params.slug)
  return { post }
}

export const dynamicParams = false

export function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({ slug: post.slug }))
}

export default function Post({ params }: Props) {
  const { post } = getPost(params)
  const props = {
    type: "element",
    tagName: "nav",
    properties: {
      className: "toc"
    },
    children: [
      {
        type: "element",
        tagName: "ol",
        properties: {
          className: "toc-level toc-level-1"
        },
        children: [
          {
            type: "element",
            tagName: "li",
            data: {
              hookArgs: [
                {
                  type: "element",
                  tagName: "h2",
                  properties: {},
                  children: [
                    {
                      type: "text",
                      value: "Vue3编译宏",
                      position: {
                        start: {
                          line: 2,
                          column: 4,
                          offset: 4
                        },
                        end: {
                          line: 2,
                          column: 11,
                          offset: 11
                        }
                      }
                    }
                  ],
                  position: {
                    start: {
                      line: 2,
                      column: 1,
                      offset: 1
                    },
                    end: {
                      line: 2,
                      column: 11,
                      offset: 11
                    }
                  }
                }
              ]
            },
            properties: {
              className: "toc-item toc-item-h2"
            },
            children: [
              {
                type: "element",
                tagName: "a",
                properties: {
                  className: "toc-link toc-link-h2",
                  href: "#"
                },
                children: [
                  {
                    type: "text",
                    value: "Vue3编译宏"
                  }
                ]
              },
              {
                type: "element",
                tagName: "ol",
                properties: {
                  className: "toc-level toc-level-2"
                },
                children: [
                  {
                    type: "element",
                    tagName: "li",
                    data: {
                      hookArgs: [
                        {
                          type: "element",
                          tagName: "h3",
                          properties: {},
                          children: [
                            {
                              type: "text",
                              value: "defineProps",
                              position: {
                                start: {
                                  line: 4,
                                  column: 5,
                                  offset: 17
                                },
                                end: {
                                  line: 4,
                                  column: 16,
                                  offset: 28
                                }
                              }
                            }
                          ],
                          position: {
                            start: {
                              line: 4,
                              column: 1,
                              offset: 13
                            },
                            end: {
                              line: 4,
                              column: 16,
                              offset: 28
                            }
                          }
                        }
                      ]
                    },
                    properties: {
                      className: "toc-item toc-item-h3"
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "a",
                        properties: {
                          className: "toc-link toc-link-h3",
                          href: "#"
                        },
                        children: [
                          {
                            type: "text",
                            value: "defineProps"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: "element",
                    tagName: "li",
                    data: {
                      hookArgs: [
                        {
                          type: "element",
                          tagName: "h3",
                          properties: {},
                          children: [
                            {
                              type: "text",
                              value: "defineEmits",
                              position: {
                                start: {
                                  line: 74,
                                  column: 5,
                                  offset: 875
                                },
                                end: {
                                  line: 74,
                                  column: 16,
                                  offset: 886
                                }
                              }
                            }
                          ],
                          position: {
                            start: {
                              line: 74,
                              column: 1,
                              offset: 871
                            },
                            end: {
                              line: 74,
                              column: 16,
                              offset: 886
                            }
                          }
                        }
                      ]
                    },
                    properties: {
                      className: "toc-item toc-item-h3"
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "a",
                        properties: {
                          className: "toc-link toc-link-h3",
                          href: "#"
                        },
                        children: [
                          {
                            type: "text",
                            value: "defineEmits"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: "element",
                    tagName: "li",
                    data: {
                      hookArgs: [
                        {
                          type: "element",
                          tagName: "h3",
                          properties: {},
                          children: [
                            {
                              type: "text",
                              value: "defineExpose",
                              position: {
                                start: {
                                  line: 93,
                                  column: 5,
                                  offset: 1151
                                },
                                end: {
                                  line: 93,
                                  column: 17,
                                  offset: 1163
                                }
                              }
                            }
                          ],
                          position: {
                            start: {
                              line: 93,
                              column: 1,
                              offset: 1147
                            },
                            end: {
                              line: 93,
                              column: 17,
                              offset: 1163
                            }
                          }
                        }
                      ]
                    },
                    properties: {
                      className: "toc-item toc-item-h3"
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "a",
                        properties: {
                          className: "toc-link toc-link-h3",
                          href: "#"
                        },
                        children: [
                          {
                            type: "text",
                            value: "defineExpose"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: "element",
                    tagName: "li",
                    data: {
                      hookArgs: [
                        {
                          type: "element",
                          tagName: "h3",
                          properties: {},
                          children: [
                            {
                              type: "text",
                              value: "defineSlots",
                              position: {
                                start: {
                                  line: 103,
                                  column: 5,
                                  offset: 1216
                                },
                                end: {
                                  line: 103,
                                  column: 16,
                                  offset: 1227
                                }
                              }
                            }
                          ],
                          position: {
                            start: {
                              line: 103,
                              column: 1,
                              offset: 1212
                            },
                            end: {
                              line: 103,
                              column: 16,
                              offset: 1227
                            }
                          }
                        }
                      ]
                    },
                    properties: {
                      className: "toc-item toc-item-h3"
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "a",
                        properties: {
                          className: "toc-link toc-link-h3",
                          href: "#"
                        },
                        children: [
                          {
                            type: "text",
                            value: "defineSlots"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: "element",
                    tagName: "li",
                    data: {
                      hookArgs: [
                        {
                          type: "element",
                          tagName: "h3",
                          properties: {},
                          children: [
                            {
                              type: "text",
                              value: "defineOptions",
                              position: {
                                start: {
                                  line: 156,
                                  column: 5,
                                  offset: 2015
                                },
                                end: {
                                  line: 156,
                                  column: 18,
                                  offset: 2028
                                }
                              }
                            }
                          ],
                          position: {
                            start: {
                              line: 156,
                              column: 1,
                              offset: 2011
                            },
                            end: {
                              line: 156,
                              column: 18,
                              offset: 2028
                            }
                          }
                        }
                      ]
                    },
                    properties: {
                      className: "toc-item toc-item-h3"
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "a",
                        properties: {
                          className: "toc-link toc-link-h3",
                          href: "#"
                        },
                        children: [
                          {
                            type: "text",
                            value: "defineOptions"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: "element",
                    tagName: "li",
                    data: {
                      hookArgs: [
                        {
                          type: "element",
                          tagName: "h3",
                          properties: {},
                          children: [
                            {
                              type: "text",
                              value: "defineModel",
                              position: {
                                start: {
                                  line: 169,
                                  column: 5,
                                  offset: 2216
                                },
                                end: {
                                  line: 169,
                                  column: 16,
                                  offset: 2227
                                }
                              }
                            }
                          ],
                          position: {
                            start: {
                              line: 169,
                              column: 1,
                              offset: 2212
                            },
                            end: {
                              line: 169,
                              column: 16,
                              offset: 2227
                            }
                          }
                        }
                      ]
                    },
                    properties: {
                      className: "toc-item toc-item-h3"
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "a",
                        properties: {
                          className: "toc-link toc-link-h3",
                          href: "#"
                        },
                        children: [
                          {
                            type: "text",
                            value: "defineModel"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  return (
    <div className="flex h-full max-w-7xl m-auto mt-20">
      <div className="w-1/5">
        <MarkdownNav {...props}></MarkdownNav>
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl">{post.meta.title}</h1>
        <time className="text-gray-600">{post.meta?.date.toString()}</time>
        <Markdown content={post.content} />
        {/* <Code code={post.content}></Code> */}
      </div>
    </div>
  )
}
