import React from 'react'
export interface Props {
  accordionComponents: Array<{
    title: string
    component: React.ComponentType
  }>
  initialDisplayIndex?: number
}
export interface State {
  contentSections: Array<{
    isVisible: boolean
  }>
  focusIndex: number
  shouldFocus: boolean
}
export interface Action {
  type: "clicked" | "focusChange"
  payload?: { index: number }
}

export interface HeaderButtonProps {
  id: number
  startAnimating: boolean
  headerTitle: string
  isExpanded: boolean
  triggerClick: React.EventHandler<any>
  triggerKeyDown: React.EventHandler<any>
}

export interface ContentProps {
  accordionContentId: string
  accordionHeadingId: string
  isExpanded: boolean
}
