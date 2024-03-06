/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { pinata } from 'frog/hubs'
import { handle } from 'frog/vercel'

const app = new Frog({
  basePath: '/api',
  hub: pinata(),
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  return c.res({
    action: '/picker',
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/site-preview.jpg`,
    intents: [<Button value="A">A</Button>, <Button value="B">B</Button>],
  })
})

app.frame('/picker', (c) => {
  const { buttonValue, verified } = c

  if (verified) {
    if (buttonValue === 'A') {
      return c.res({
        action: '/meme/a',
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/a`,
        intents: [
          <TextInput placeholder="Text" />,
          <Button value="generate">Generate</Button>,
        ],
      })
    }

    return c.res({
      action: '/meme/b',
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/b`,
      imageAspectRatio: '1:1',
      intents: [
        <TextInput placeholder="Text" />,
        <Button value="generate">Generate</Button>,
      ],
    })
  }

  return c.res({
    action: '/',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Invalid User
      </div>
    ),
    intents: [<Button>Try Again 🔄</Button>],
  })
})

app.frame('/meme/:id', (c) => {
  const id = c.req.param('id')

  const { frameData, verified } = c
  const { inputText = '' } = frameData || {}

  if (verified) {
    const newSearchParams = new URLSearchParams({
      text: inputText,
    })

    if (id === 'a') {
      return c.res({
        action: '/',
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/a?${newSearchParams}`,
        intents: [<Button>Start Over 🔄</Button>],
      })
    }

    return c.res({
      action: '/',
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/b?${newSearchParams}`,
      imageAspectRatio: '1:1',
      intents: [<Button>Start Over 🔄</Button>],
    })
  }

  return c.res({
    action: '/',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Invalid User
      </div>
    ),
    intents: [<Button>Try Again 🔄</Button>],
  })
})

export const GET = handle(app)
export const POST = handle(app)
