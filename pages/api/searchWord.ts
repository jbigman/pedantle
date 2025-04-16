import type { NextApiRequest, NextApiResponse } from 'next'

let count = 0
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { w, article } = req.body

  if (!article || !w) {
    return res
      .status(400)
      .json({ error: 'Query parameter is required and must be a string' })
  }

  function evaluateWord(w: string, item: ArticleWord): ArticleWord {
    if (item.score === 1) {
      return item
    }
    if (w.toLowerCase() === item.o.toLowerCase()) {
      count++
      console.log('item.guess', item.guess)
      return {
        id: item.id,
        o: item.o,
        guess: w,
        score: 1,
      }
    }
    return item
  }

  count = 0
  article.title = article.title.map((item: ArticleWord) => {
    return evaluateWord(w, item)
  })
  article.extract = article.extract.map((item: ArticleWord) => {
    return evaluateWord(w, item)
  })

  res.status(200).json({
    count,
    article,
  })
}

export default handler

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
