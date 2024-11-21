import Slugger from "github-slugger"
import { getHeadings, type HeadingTag } from "./shared"

const slugger = new Slugger()

interface generateSlugsConfig {
  headings: HeadingTag[];
  dataAttribute: string;
}

const defaultSlugsConfig: generateSlugsConfig = {
  headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
  dataAttribute: "data-doc-utils",
}

export const generateSlugs = (userConfig: Partial<generateSlugsConfig>) => {
  const config: generateSlugsConfig = { ...defaultSlugsConfig, ...userConfig }
  const headings = getHeadings(config.headings, config.dataAttribute);

  headings.forEach((heading) => {
    if (!heading.id && heading.textContent) {
      heading.id = slugger.slug(heading.textContent)
    }
  })
}
