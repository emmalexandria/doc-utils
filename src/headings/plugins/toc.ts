import { HeadingNode } from '../index.js';
import { Plugin, PluginDefinition } from "../../plugins.js"

export interface LevelClasses {
  list: string;
  item: string;
  link: string;
}

/**
 * Defines options for TOC generation
 */
export interface TocConfig {
  /** Container element. Pass either an HTML element object or a query selector string */
  container: HTMLElement | string;
  /** Whether or not the TOC will be placed inside a <nav> */
  navRoot: boolean;
  /** Whether or not the generated lists are ordered or unordered */
  ordered: boolean;
  classes: {
    root: string;
    default: LevelClasses;
    [key: number]: LevelClasses;
  };
}



export const toc: Plugin<TocConfig, HeadingNode[]> = (userConfig): PluginDefinition<HeadingNode[]> => {
  const defaultConfig: TocConfig = {
    container: '#tocContainer',
    navRoot: true,
    ordered: true,
    classes: {
      root: 'toc-root',
      default: {
        list: 'toc-list',
        link: 'toc-link',
        item: 'toc-item',
      },
    },
  };

  const config = { ...defaultConfig, ...userConfig }

  return (transformResult) => {
    const getRoot = (root: Element | string): Element => {
      if (root instanceof Element) {
        return root;
      } else {
        return document.querySelector(root) as Element;
      }
    };

    const root = getRoot(config.container)
    console.log(root)
    const toc = generateTocHtml(transformResult, config)

    if (!config.navRoot) {
      root.appendChild(toc);
      root.classList.add(config.classes.root)
    } else {
      const nav = document.createElement('nav');
      nav.appendChild(toc);
      nav.classList.add(config.classes.root)
      root.appendChild(nav);
    }

  }
}


const generateTocHtml = (
  nodes: HeadingNode[],
  config: TocConfig,
): HTMLOListElement => {
  const list = document.createElement('ol');
  if (nodes.length > 0) {
    const rootClasses = getClassesForLevel(nodes[0].level, config);
    list.classList.add(rootClasses.list);
  }

  nodes.forEach((node) => {
    const classes = getClassesForLevel(node.level, config);
    const listItem = document.createElement('li');
    listItem.classList.add(classes.item);
    const link = document.createElement('a');
    link.classList.add(classes.link);

    link.href = `#${node.element.id}`;
    link.textContent = node.element.textContent;
    listItem.appendChild(link);

    if (node.children.length > 0) {
      const childList = generateTocHtml(node.children, config);
      childList.classList.add(classes.list);
      listItem.appendChild(childList);
    }

    list.appendChild(listItem);
  });

  return list;
};

const getClassesForLevel = (level: number, config: TocConfig): LevelClasses => {
  if (config.classes[level]) {
    return config.classes[level];
  } else {
    return config.classes['default'];
  }
};

