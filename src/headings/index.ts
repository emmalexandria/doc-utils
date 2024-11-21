import { DefaultHeadingsConfig, HeadingsConfig, type HeadingTransform } from "./config";
import { buildHeadingTree, getHeadings } from "./tree";

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export { slugsStep } from "./slugs"
export { tocStep } from "./toc"
export { autoLinkStep } from "./autolink"

export const processHeadings = (steps: HeadingTransform[], rootConfig: HeadingsConfig = DefaultHeadingsConfig) => {
  const config = { ...DefaultHeadingsConfig, ...rootConfig }

  const headings = getHeadings(config.headings, config.dataAttribute)
  const tree = buildHeadingTree(headings)

  steps.forEach((step) => {
    step(config, tree)
  })
};
