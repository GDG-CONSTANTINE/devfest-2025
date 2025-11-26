import { Body, Container, Head, Heading, Html, Preview } from "@react-email/components"

function devfest() {
  return (
    <Html>
      <Head />
      <Preview>Hello DevFest</Preview>
      <Body>

        <Container>
          <Heading>Hello DevFest</Heading>
        </Container>
      </Body>
    </Html>
  )
}

export default devfest
