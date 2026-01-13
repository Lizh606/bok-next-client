export type StrapiWebhookPayload<T> = {
  event: string
  createdAt: string
  model: string // e.g. "article"
  entry: T
}

export type StrapiArticleEntry = {
  id: number
  documentId: string
  title: string
  content: string
  tag?: string
  sort?: string
  date?: string
  description?: string
  locale?: string
  publishedAt?: string
}
