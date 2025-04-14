export default interface WikipediaArticleDto {
  title: string
  extract: string
}

export interface WikipediaRandomParseResponse {
  parse: {
    title: string
    pageid: number
    text: {
      '*': string // Full HTML content of the article
    }
    lang?: string
    displaytitle?: string
    categories?: Array<{
      ns: number
      title: string
      hidden?: string
    }>
    sections?: Array<{
      toclevel: number
      level: string
      line: string
      number: string
      index: string
      anchor: string
    }>
    // Other optional fields available depending on additional `prop=...` values
  }
}
