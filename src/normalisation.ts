import { buildHeadingTree, getHeadings, type HeadingNode } from "./shared"

export const normaliseHeadings = (dataAttribute?: string) => {
  const headings = getHeadings(["h1", "h2", "h3", "h4", "h5", "h6"], dataAttribute)
  const tree = buildHeadingTree(headings)

  tree.forEach((node) => {
    if (node.level > 1) {
      node.level = 1
    }
  })
}

export const normaliseChildren = (level: number, children: HeadingNode[]) => {

}
