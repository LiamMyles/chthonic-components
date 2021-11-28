import * as React from "react"
import VisuallyHidden from "@chthonic/visually-hidden-reach-clone"

let name = "As a div (TS)"

function Example() {
  return <VisuallyHidden as="div">Hidden Message</VisuallyHidden>
}

Example.storyName = name
export { Example }
