import { getHeadings } from "./shared"

export const autoLinkHeadings = (dataAttribute?: string) => {
  const headings = getHeadings(["h1", "h2", "h3", "h4", "h5", "h6"], dataAttribute)

  headings.forEach((heading) => {
    const linkTag: HTMLAnchorElement = document.createElement('a');
    linkTag.href = `#${heading.id}`
    linkTag.ariaHidden = "true"
    linkTag.tabIndex = -1

    heading.parentNode?.insertBefore(linkTag, heading)
    linkTag.appendChild(heading)
  })
}
