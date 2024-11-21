import { ProgramUpdateLevel } from "typescript";
import { type HeadingTag, getHeadings, buildHeadingTree } from "./shared/headingtree"
import Slugger from "github-slugger"


interface LevelClasses {
  list: string;
  item: string;
  link: string;
}

export interface HeadingNode {
  element: HTMLHeadingElement,
  level: number,
  children: HeadingNode[]
}

/**
 * Defines options for TOC generation
 */
interface TocConfig {
  /** Container element. Pass either an HTML element object or a query selector string */
  container: HTMLElement | string;
  /** Data attribute to include headers based on */
  dataAttribute: string;
  /** Whether or not the TOC will be placed inside a <nav> */
  navRoot: boolean;
  /** Whether or not the generated lists are ordered or unordered */
  ordered: boolean;
  rootClasses: string;
  classes: {
    default: LevelClasses
    [key: number]: LevelClasses;

  }
}

export const defaultTocConfig: TocConfig = {
  dataAttribute: "data-doc-utils='true'",
  container: '#tocContainer',
  navRoot: true,
  ordered: true,
  rootClasses: "toc-root",
  classes: {
    default: {
      list: 'toc-list',
      link: 'toc-link',
      item: 'toc-item'
    },
  }
}

/**
 * Generates a table of contents based on the presence of a data attribute  
 * @param {HeadingTag} [headings] Heading levels to include
 * @param {TocConfig} [userConfig=defaultTocConfig] Options for generating the table of contents
*/
export const generateToc = (headings: HeadingTag[] = ["h1", "h2", "h3"], userConfig: Partial<TocConfig> = defaultTocConfig) => {
  const config: TocConfig = { ...defaultTocConfig, ...userConfig }

  const getRoot = (root: HTMLElement | string): HTMLElement => {
    if (root instanceof HTMLElement) {
      return root
    } else {
      return document.querySelector(root) as HTMLElement
    }

  }

  const headingElements = getHeadings(headings, config.dataAttribute)
  const tocContainer = getRoot(config.container)

  if (headingElements.length == 0) {
    return
  }

  const tree: HeadingNode[] = buildHeadingTree(headingElements)
  const toc: HTMLOListElement = generateTocHtml(tree, config);

  if (!config.navRoot) {
    tocContainer.appendChild(toc)
  } else {
    const nav = document.createElement('nav')
    nav.appendChild(toc)
    tocContainer.appendChild(nav)
  }
}

const generateTocHtml = (nodes: HeadingNode[], config: TocConfig): HTMLOListElement => {
  const list = document.createElement("ol");
  if (nodes.length > 0) {
    const rootClasses = getClassesForLevel(nodes[0].level, config)
    list.classList.add(rootClasses.list)
  }


  nodes.forEach((node) => {
    const classes = getClassesForLevel(node.level, config)
    const listItem = document.createElement('li');
    listItem.classList.add(classes.item)
    const link = document.createElement("a");
    link.classList.add(classes.link)

    link.href = `#${node.element.id}`;
    link.textContent = node.element.textContent;
    listItem.appendChild(link)

    if (node.children.length > 0) {
      const childList = generateTocHtml(node.children, config);
      childList.classList.add(classes.list);
      listItem.appendChild(childList)
    }

    list.appendChild(listItem);
  })

  return list;
}

const getClassesForLevel = (level: number, config: TocConfig): LevelClasses => {
  if (config.classes[level]) {
    return config.classes[level]
  } else {
    return config.classes["default"]
  }
}



