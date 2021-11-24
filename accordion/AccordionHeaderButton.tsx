import React, { useEffect } from "react"
import * as IAccordion from "./types"
import * as AccordionStyle from "./styles"

const AccordionHeaderButton = React.forwardRef(
  (
    {
      id,
      startAnimating,
      headerTitle,
      isExpanded,
      triggerClick,
      triggerKeyDown,
    }: IAccordion.HeaderButtonProps,
    forwardedRef: React.RefObject<HTMLButtonElement>
  ) => {
    const [animateExpanded, setAnimateExpanded] = React.useState<
      boolean | undefined
    >()

    useEffect(() => {
      if (isExpanded) {
        setAnimateExpanded(true)
      } else {
        setAnimateExpanded(false)
      }
    }, [isExpanded])

    let iconClass = ""
    if (typeof animateExpanded === "boolean") {
      iconClass = `${animateExpanded ? "opened" : "closed"}`
    }

    return (
      <h3 style={{ margin: 0 }}>
        <AccordionStyle.button
          aria-expanded={isExpanded}
          aria-controls={`content-${id}`}
          id={`heading-${id}`}
          type="button"
          onClick={triggerClick}
          onKeyDown={triggerKeyDown}
          data-index={id}
          ref={forwardedRef}
          className={startAnimating && "animate"}
        >
          {headerTitle}
          <AccordionStyle.icon className={iconClass} />
        </AccordionStyle.button>
      </h3>
    )
  }
)

AccordionHeaderButton.displayName = "AccordionHeaderButton"

export default AccordionHeaderButton
