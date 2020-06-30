import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

import {
  Container,
  TextInput,
  Button,
} from "nes-react";

const IndexPage = () => (
  <Layout>
    <div >
      <SEO title="Home" />
      <h1>Welcome!</h1>
      <p>This is a work in progress.</p>
      <div>
        <TextInput
          label="Join a game"
          placeholder="ABCD"
          value={null}
          // onChange={e => this.setState({ textInput: e.target.value })}
          onChange={e => ({})}
        />
        <Button primary>Join</Button>
        <h3>OR</h3>
        <Button success>Create a game</Button>
      </div>
      {/* <p>Now wait until I do stuff with it...</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </div>
  </Layout>
)

export default IndexPage
