import * as React from "react"
import Accordion from "@chthonic/accordion"

const ProjectsPast: React.FC = () => (
  <>
    <h4>What I have tinkered with</h4>
    <p>
      During University I got to play with 3D, script writing, animation, flash,
      and web projects
    </p>
    <p>For my thesis I created an AR game in Unity which was a lot of fun.</p>
    <p>
      In the years since university I have created all sorts of little things, a
      few that stand out are, Hexout, Steam Filter and Playing With Hexagons.
    </p>
    <p>All of which you can see on my projects page.</p>
    <p>
      I actually finished playing with Hexagons v3, haven&apos;t and ended up
      writing about it.
    </p>
  </>
)
const ProjectsPresent: React.FC = () => (
  <>
    <h4>What tinkering I&apos;m doing now</h4>
    <p>
      The key thing that keeps my tinkering focus is this website, as I write
      this I&apos;m actually refining the site to launch it. But that
      doesn&apos;t mean the work is finished on it. I still have so many little
      tweaks I want to make.
    </p>
    <p>
      I&apos;m also working on a presentation about accessibility which should
      hopefully be finished sooner rather than later.
    </p>
  </>
)
const ProjectsFuture: React.FC = () => (
  <>
    <h4>What tinkering might happen?</h4>
    <p>
      Always wanted to make a cool web game, and I have a passion for unique UX
      that I would like to explore more.
    </p>
  </>
)

import { ThemeProvider, DefaultTheme } from "styled-components"

const colours = {
  background: {
    secondary: "#ddd9e8",
    primary: "#fcfcff",
    accentPrimary: "#9C38FF",
    accentSecondary: "#faf6ff",
  },
  text: {
    link: {
      display: "#6a00d5", //#005964 "#B200FF" #930077
      focus: "#930077", //#6a00d5 "#00FFB2"
      active: "black",
    },
    body: "black",
    heading: "black",
  },
}

const theme: DefaultTheme = {
  colours: {
    light: {
      ...colours,
    },
    dark: {
      ...colours,
      background: {
        secondary: "#feb67f",
        primary: "#f7fdff",
        accentPrimary: "#6a00d5",
        accentSecondary: "#faf6ff",
      },
    },
  },
  spacing: {
    large: "1.5rem",
    medium: "1rem",
    small: "0.5rem",
  },
}

function Example() {
  return (
    <ThemeProvider theme={theme}>
      <Accordion
        accordionComponents={[
          { title: "Past", component: ProjectsPast },
          { title: "Present", component: ProjectsPresent },
          { title: "Future", component: ProjectsFuture },
        ]}
      />
    </ThemeProvider>
  )
}

let name = "Basic (TS)"

Example.storyName = name
export { Example }
