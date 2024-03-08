/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog'
import { handle } from 'frog/vercel'
import { abi } from '../../contracts/abi'

const app = new Frog({
  basePath: '/api',
})

app.frame('/', (c) => {
  return c.res({
    action: '/finish',
    image: (
      <div
        style={{
          color: 'white',
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          fontSize: 60,
        }}
      >
        Perform a transaction
      </div>
    ),
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ],
  })
})

app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div
        style={{
          color: 'white',
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center',
          fontSize: 60,
        }}
      >
        Transaction ID: {transactionId}
      </div>
    ),
  })
})

app.transaction('/send-ether', (c) => {
  const { inputText = '' } = c

  console.log('inputText', inputText)
  // Send transaction response.
  return c.send({
    // @ts-ignore
    chainId: 'eip155:84532',
    to: '0x5B46c86bCe00647a2a35278a4108Fb563A07a515',
    value: parseEther(inputText),
  })
})

app.transaction('/mint', (c) => {
  const { inputText = '' } = c
  // Contract transaction response.
  return c.contract({
    abi,
    // @ts-ignore
    chainId: 'eip155:84532',
    functionName: 'mint',
    // @ts-ignore
    args: [69420n],
    to: '0x5B46c86bCe00647a2a35278a4108Fb563A07a515',
    value: parseEther(inputText),
  })
})

export const GET = handle(app)
export const POST = handle(app)
