import { ImageResponse } from 'next/og'
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const hasText = searchParams.has('text')
  const text = hasText ? searchParams.get('text')?.slice(0, 100) : ''

  const imageData = await fetch(
    new URL('./meme-kevin.jpg', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const fontData = await fetch(
    new URL('../../../assets/Oswald-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* @ts-ignore */}
        <img width="630" height="630" alt="meme" src={imageData} />
        <p
          style={{
            position: 'absolute',
            margin: 0,
            paddingBottom: 20,
            color: '#ffffff',
            lineHeight: 1,
            fontSize: 60,
            fontFamily: '"Oswald Bold"',
            textAlign: 'center',
            textTransform: 'uppercase',
            textShadow:
              '4px 4px 3px #000, -4px 4px 3px #000, -4px -4px 0 #000, 4px -4px 0 #000',
          }}
        >
          {text}
        </p>
      </div>
    ),
    {
      width: 630,
      height: 630,
      fonts: [
        {
          name: 'Oswald Bold',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}
