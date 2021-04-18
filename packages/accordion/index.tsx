import React, { useReducer, useRef, useEffect } from "react"
import * as IAccordion from "./types"
import * as AccordionStyle from "./styles"

import AccordionContent from "./AccordionContent"
import AccordionHeaderButton from "./AccordionHeaderButton"

const accordionReducer: React.Reducer<IAccordion.State, IAccordion.Action> = (
  prevState,
  { type, payload: { index } }
) => {
  switch (type) {
    case "clicked": {
      const isShowing = prevState.contentSections[index].isVisible
      if (isShowing) {
        return {
          ...prevState,
          contentSections: prevState.contentSections.map(() => ({
            isVisible: false,
          })),
          focusIndex: index,
          shouldFocus: true,
        }
      } else {
        return {
          ...prevState,
          contentSections: prevState.contentSections.map((item, i) => {
            if (i === index) {
              return {
                isVisible: true,
              }
            } else {
              return {
                isVisible: false,
              }
            }
          }),
          focusIndex: index,
          shouldFocus: true,
        }
      }
    }
    case "focusChange": {
      const accordionLength = prevState.contentSections.length
      const underLength = index < 0
      const overLength = index >= accordionLength
      let returnedIndex = index
      if (underLength) returnedIndex = accordionLength - 1
      if (overLength) returnedIndex = 0
      return {
        ...prevState,
        focusIndex: returnedIndex,
        shouldFocus: true,
      }
    }
    default:
      return prevState
  }
}

export default function Accordion({
  accordionComponents,
  initialDisplayIndex,
}: IAccordion.Props): React.ReactElement | null {
  const focusRefs = useRef(
    accordionComponents.map(
      (): React.RefObject<HTMLButtonElement> => React.createRef()
    )
  )

  const initialSate = {
    contentSections: accordionComponents.map((item, index) => ({
      isVisible: initialDisplayIndex === index,
    })),
    focusIndex: 0,
    shouldFocus: false,
  }

  const [accordionState, accordionDispatch] = useReducer<
    React.Reducer<IAccordion.State, IAccordion.Action>
  >(accordionReducer, initialSate)

  const handleClick: React.EventHandler<React.MouseEvent<
    HTMLButtonElement
  >> = event => {
    const clickedIndex = parseInt(event.currentTarget.dataset.index)
    accordionDispatch({ type: "clicked", payload: { index: clickedIndex } })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = event => {
    const accordionLength = accordionState.contentSections.length
    const { key } = event
    const clickedIndex = parseInt(event.currentTarget.dataset.index)
    switch (key) {
      case " ":
      case "Enter":
        event.preventDefault()
        accordionDispatch({ type: "clicked", payload: { index: clickedIndex } })
        break
      case "ArrowDown":
        event.preventDefault()
        accordionDispatch({
          type: "focusChange",
          payload: { index: clickedIndex + 1 },
        })
        break
      case "ArrowUp":
        event.preventDefault()
        accordionDispatch({
          type: "focusChange",
          payload: { index: clickedIndex - 1 },
        })
        break
      case "Home":
        event.preventDefault()
        accordionDispatch({
          type: "focusChange",
          payload: { index: 0 },
        })
        break
      case "End":
        event.preventDefault()
        accordionDispatch({
          type: "focusChange",
          payload: { index: accordionLength - 1 },
        })
        break
      default:
        break
    }
  }

  const [startAnimating, setStartAnimating] = React.useState(false)

  useEffect(() => {
    setStartAnimating(true)
  })

  // Sets the current focus to the focused item in state
  useEffect(() => {
    if (accordionState.shouldFocus) {
      focusRefs.current[accordionState.focusIndex].current.focus()
    }
  }, [accordionState])

  return (
    <AccordionStyle.group>
      {accordionComponents.map(
        ({ title, component: ContentComponent }, index) => {
          const isVisible = accordionState.contentSections[index].isVisible

          return React.useMemo(
            () => (
              <React.Fragment
                key={`accordion-${Math.round(Math.random() * 100)}-${index}`}
              >
                <AccordionHeaderButton
                  startAnimating={startAnimating}
                  id={index}
                  ref={focusRefs.current[index]}
                  isExpanded={isVisible}
                  headerTitle={title}
                  triggerClick={handleClick}
                  triggerKeyDown={handleKeyDown}
                />
                <AccordionContent
                  accordionContentId={`content-${index}`}
                  accordionHeadingId={`heading-${index}`}
                  isExpanded={isVisible}
                >
                  <ContentComponent />
                </AccordionContent>
              </React.Fragment>
            ),
            [isVisible, focusRefs.current[index]]
          )
        }
      )}
    </AccordionStyle.group>
  )
}
