import React from "react"

import Accordion from "@chthonic/accordion"

export default {
  title: "Chthonic/Accordion",
  component: Accordion,
}

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

const Template = () => (
  <Accordion
    accordionComponents={[
      { title: "Past", component: ProjectsPast },
      { title: "Present", component: ProjectsPresent },
      { title: "Future", component: ProjectsFuture },
    ]}
  />
)

export const Primary = Template.bind({})
