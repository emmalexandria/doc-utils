import { DefaultHeadingsConfig, HeadingsConfig, type HeadingTransform } from "./config";
import { buildHeadingTree, getHeadings } from "./tree";

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export { slugs } from "./slugs"
export { toc } from "./toc"
export { autoLink } from "./autolink"
export { enumerate } from './enumerate'


export const processHeadings = (steps: HeadingTransform[], rootConfig: HeadingsConfig = DefaultHeadingsConfig) => {
  const config = { ...DefaultHeadingsConfig, ...rootConfig }
  const markerElement: HTMLDivElement = document.createElement('div')
  markerElement.id = "processHeadingsHasRun"
  markerElement.ariaHidden = "true"

  const markerElementResult = document.body.querySelector(`#${markerElement.id}`)
  if (markerElementResult != null) {
    return
  }

  const headings = getHeadings(config.headings, config.dataAttribute)
  const tree = buildHeadingTree(headings)

  steps.forEach((step) => {
    step(config, tree)
  })

  document.body.appendChild(markerElement)

};
