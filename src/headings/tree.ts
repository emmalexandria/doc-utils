import { HeadingTag } from "."

export interface HeadingNode {
  element: HTMLHeadingElement,
  level: number,
  children: HeadingNode[]
}

export const getHeadings = (headings: HeadingTag[], attribute?: string) => {
  const headingQueries: string[] = headings.map((tag) => {
    if (attribute) {
      return `${tag}[${attribute}]`
    } else {
      return `${tag}`
    }
  })
  return Array.from(document.querySelectorAll(headingQueries.join(','))).map((el) => {
    return el as HTMLHeadingElement
  })
}

export const buildHeadingTree = (headings: HTMLHeadingElement[]) => {
  const root: HeadingNode[] = [];
  const stack: HeadingNode[] = [];

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]);
    const node: HeadingNode = {
      element: heading,
      level,
      children: []
    }

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    if (stack.length == 0) {
      root.push(node)
    } else {
      stack[stack.length - 1].children.push(node)
    }

    stack.push(node)
  })

  return root
}

