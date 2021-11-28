import "@testing-library/jest-dom/extend-expect"
import "jest-axe/extend-expect"
import { axe, toHaveNoViolations } from "jest-axe"
import { act } from "react-dom/test-utils"

expect.extend({
  /**
   * Wrapper for axe's `expect.toHaveNoViolations` to simplify individual test
   * implementation for most cases.
   *
   * @param received
   */
  async toHaveNoAxeViolations(received: Element) {
    const check = toHaveNoViolations.toHaveNoViolations.bind(this)
    let axeResults: any
    await act(async () => {
      axeResults = await axe(received)
    })
    return check(axeResults!)
  },
})
