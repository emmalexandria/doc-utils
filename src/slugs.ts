import Slugger from "github-slugger"
import { getHeadings } from "./shared"

const slugger = new Slugger()

interface generateSlugsConfig {
  dataAttribute?: string;
}

const defaultSlugsConfig: generateSlugsConfig = {
  dataAttribute: "data-doc-utils",
}

export const generateSlugs = (userConfig: Partial<generateSlugsConfig>) => {
  const config: generateSlugsConfig = { ...defaultSlugsConfig, ...userConfig }
  const headings = getHeadings(["h1", "h2", "h3", "h4", "h5", "h6"], config.dataAttribute);

  headings.forEach((heading) => {
    if (!heading.id && heading.textContent) {
      heading.id = slugger.slug(heading.textContent)
    }
  })
}
