import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import Welcome from "../components/welcome"
// import Image from "../components/image"
import SEO from "../components/layout/seo"

// import {
//   Container,
//   TextInput,
//   Button,
// } from "nes-react";

const IndexPage = () => (
  <Layout>
    <div >
      <SEO title="Home" />
      <Welcome />
      {/* <p>Now wait until I do stuff with it...</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      {/* <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
    </div>
  </Layout>
)

export default IndexPage
