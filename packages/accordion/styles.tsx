import styled from "styled-components"

export const group = styled.div`
  max-width: 100%;
`
export const button = styled.button`
  background: ${({ theme }): string =>
    theme.colours.dark.background.accentPrimary};
  padding: 1rem;
  width: 100%;
  position: relative;
  color: white;
  &:focus,
  &:hover {
    background: ${({ theme }): string =>
      theme.colours.light.background.accentPrimary};
  }
  border-radius: 1rem;
  border-bottom: solid 1px
    ${({ theme }): string => theme.colours.light.background.accentSecondary};
`

export const icon = styled.span`
  border: solid white;
  border-width: 0 0.5rem 0.5rem 0;
  height: 2rem;
  width: 2rem;
  pointer-events: none;
  position: absolute;
  right: 2em;
  top: 50%;
  ${button}.animate &{
    transition: transform 0.5s ease-in-out;
  }
  //prettier-ignore
  ${button}[aria-expanded="true"] &{
    transform: translateY(-60%) rotate(45deg);
    &.opened {
      transform: translateY(-50%) rotate(-135deg);
    }
  }
  //prettier-ignore
  ${button}[aria-expanded="false"] & {
    transform: translateY(-50%) rotate(-135deg);
    &.closed {
      transform: translateY(-60%) rotate(45deg);
    }
  }
`
export const contentWrapper = styled.div`
  background: ${({ theme }): string =>
    theme.colours.light.background.accentSecondary};
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
`
