import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Accordion from "@chthonic/accordion"
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

describe("Accordion Component", () => {
  const Test1: React.FC = () => <h1>Test 1 </h1>
  const Test2: React.FC = () => <h1>Test 2 </h1>
  const Test3: React.FC = () => <h1>Test 3 </h1>
  const accordionTestData = [
    { title: "Heading 1", component: Test1 },
    { title: "Heading 2", component: Test2 },
    { title: "Heading 3", component: Test3 },
  ]

  it("should show the headings passed with test data", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Accordion accordionComponents={accordionTestData} />
      </ThemeProvider>
    )
    expect(getByText("Heading 1")).toBeInTheDocument()
    expect(getByText("Heading 2")).toBeInTheDocument()
    expect(getByText("Heading 3")).toBeInTheDocument()
  })
  it("should only show 1 component at a time", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Accordion
          accordionComponents={accordionTestData}
          initialDisplayIndex={0}
        />
      </ThemeProvider>
    )
    expect(getByText("Test 1")).toBeVisible()
    expect(getByText("Test 2")).not.toBeVisible()
    expect(getByText("Test 3")).not.toBeVisible()
    fireEvent.click(getByText("Heading 3"))
    expect(getByText("Test 1")).not.toBeVisible()
    expect(getByText("Test 2")).not.toBeVisible()
    expect(getByText("Test 3")).toBeVisible()
  })
  it("should show content for selected header when header is clicked", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Accordion accordionComponents={accordionTestData} />
      </ThemeProvider>
    )
    fireEvent.click(getByText("Heading 1"))
    expect(getByText("Test 1")).toBeVisible()
    fireEvent.click(getByText("Heading 2"))
    expect(getByText("Test 2")).toBeVisible()
    fireEvent.click(getByText("Heading 3"))
    expect(getByText("Test 3")).toBeVisible()
  })
  it("should contain the 3 different components from the test data", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Accordion accordionComponents={accordionTestData} />
      </ThemeProvider>
    )
    fireEvent.click(getByText("Heading 1"))
    expect(getByText("Test 1")).toBeVisible()
    expect(getByText("Test 2").tagName).toBe("H1")
    fireEvent.click(getByText("Heading 2"))
    expect(getByText("Test 2")).toBeVisible()
    expect(getByText("Test 2").tagName).toBe("H1")
    fireEvent.click(getByText("Heading 3"))
    expect(getByText("Test 3")).toBeVisible()
    expect(getByText("Test 3").tagName).toBe("H1")
  })
  it("should have all headers focusable", async () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Accordion accordionComponents={accordionTestData} />
      </ThemeProvider>
    )
    const button1 = getByText("Heading 1")
    const button2 = getByText("Heading 2")
    const button3 = getByText("Heading 3")
    button1.focus()
    expect(button1).toHaveFocus()
    button2.focus()
    expect(button2).toHaveFocus()
    button3.focus()
    expect(button3).toHaveFocus()
  })
  it("should be able to close header once opened", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Accordion accordionComponents={accordionTestData} />
      </ThemeProvider>
    )
    fireEvent.click(getByText("Heading 1"))
    expect(getByText("Test 1")).toBeVisible()
    fireEvent.click(getByText("Heading 1"))
    expect(getByText("Test 1")).not.toBeVisible()
    fireEvent.click(getByText("Heading 1"))
    expect(getByText("Test 1")).toBeVisible()
  })
  it("shouldn't have focus before first interaction", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Accordion accordionComponents={accordionTestData} />
      </ThemeProvider>
    )
    expect(getByText("Heading 1")).not.toHaveFocus()
    fireEvent.click(getByText("Heading 1"))
    expect(getByText("Heading 1")).toHaveFocus()
  })
  describe("when header is focused", () => {
    it("should expand & hide header with space", () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <Accordion accordionComponents={accordionTestData} />
        </ThemeProvider>
      )
      fireEvent.keyDown(getByText("Heading 1"), { key: " ", keyCode: 32 })
      expect(getByText("Test 1")).toBeVisible()
      expect(getByText("Heading 1")).toHaveFocus()
      fireEvent.keyDown(getByText("Heading 1"), { key: " ", keyCode: 32 })
      expect(getByText("Test 1")).not.toBeVisible()
      expect(getByText("Heading 1")).toHaveFocus()
      fireEvent.keyDown(getByText("Heading 2"), { key: " ", keyCode: 32 })
      expect(getByText("Test 2")).toBeVisible()
      expect(getByText("Heading 2")).toHaveFocus()
      fireEvent.keyDown(getByText("Heading 2"), { key: " ", keyCode: 32 })
      expect(getByText("Test 2")).not.toBeVisible()
      expect(getByText("Heading 2")).toHaveFocus()
    })
    it("should expand and hide header with enter", () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <Accordion accordionComponents={accordionTestData} />
        </ThemeProvider>
      )
      fireEvent.keyDown(getByText("Heading 1"), { key: "Enter", keyCode: 13 })
      expect(getByText("Test 1")).toBeVisible()
      expect(getByText("Heading 1")).toHaveFocus()
      fireEvent.keyDown(getByText("Heading 1"), { key: "Enter", keyCode: 13 })
      expect(getByText("Test 1")).not.toBeVisible()
      expect(getByText("Heading 1")).toHaveFocus()
      fireEvent.keyDown(getByText("Heading 2"), { key: "Enter", keyCode: 13 })
      expect(getByText("Test 2")).toBeVisible()
      expect(getByText("Heading 2")).toHaveFocus()
      fireEvent.keyDown(getByText("Heading 2"), { key: "Enter", keyCode: 13 })
      expect(getByText("Test 2")).not.toBeVisible()
      expect(getByText("Heading 2")).toHaveFocus()
    })
    it("should focus next header with down arrow", () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <Accordion accordionComponents={accordionTestData} />
        </ThemeProvider>
      )
      fireEvent.keyDown(getByText("Heading 1"), {
        key: "ArrowDown",
        keyCode: 40,
      })
      expect(getByText("Heading 2")).toHaveFocus()
      fireEvent.keyDown(getByText("Heading 2"), {
        key: "ArrowDown",
        keyCode: 40,
      })
      expect(getByText("Heading 3")).toHaveFocus()
    })
    it("should focus previous header with up arrow", () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <Accordion accordionComponents={accordionTestData} />
        </ThemeProvider>
      )
      fireEvent.keyDown(getByText("Heading 3"), {
        key: "ArrowUp",
        keyCode: 38,
      })
      expect(getByText("Heading 2")).toHaveFocus()
      fireEvent.keyDown(getByText("Heading 2"), {
        key: "ArrowUp",
        keyCode: 38,
      })
      expect(getByText("Heading 1")).toHaveFocus()
    })
    it("should focus first header with down arrow when on last", () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <Accordion accordionComponents={accordionTestData} />
        </ThemeProvider>
      )
      fireEvent.keyDown(getByText("Heading 3"), {
        key: "ArrowDown",
        keyCode: 40,
      })
      expect(getByText("Heading 1")).toHaveFocus()
    })
    it("should focus last header with up arrow when on first", () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <Accordion accordionComponents={accordionTestData} />
        </ThemeProvider>
      )
      fireEvent.keyDown(getByText("Heading 1"), {
        key: "ArrowUp",
        keyCode: 38,
      })
      expect(getByText("Heading 3")).toHaveFocus()
    })
    it("should focus first header when home is pressed", () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <Accordion accordionComponents={accordionTestData} />
        </ThemeProvider>
      )
      fireEvent.keyDown(getByText("Heading 2"), {
        key: "Home",
        keyCode: 36,
      })
      expect(getByText("Heading 1")).toHaveFocus()
    })
    it("should focus last header when end is pressed", () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <Accordion accordionComponents={accordionTestData} />
        </ThemeProvider>
      )
      fireEvent.keyDown(getByText("Heading 2"), {
        key: "End",
        keyCode: 35,
      })
      expect(getByText("Heading 3")).toHaveFocus()
    })
  })
})
