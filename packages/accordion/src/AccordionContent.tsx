import React from "react"
import * as IAccordion from "./types"
import * as AccordionStyle from "./styles"

const AccordionContent: React.FunctionComponent<IAccordion.ContentProps> = ({
  children,
  accordionContentId,
  accordionHeadingId,
  isExpanded,
}) => {
  return (
    <AccordionStyle.contentWrapper
      id={accordionContentId}
      role="region"
      aria-labelledby={accordionHeadingId}
      hidden={!isExpanded}
    >
      {children}
    </AccordionStyle.contentWrapper>
  )
}

export default AccordionContent
