export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export { autoLink, AutoLinkConfig, toc, TocConfig, slugs, SlugsPlugin, enumerate, EnumerateConfig } from './plugins/index.js'

import { ConfigDefault } from '../config.js';
import { type TransformFunc, Transform, TransformDefinition } from '../plugins.js';

export interface HeadingTransformConfig {
  headings: HeadingTag[],
  dataAttribute: string,
}

export const DefaultHeadingTransformConfig: HeadingTransformConfig = {
  headings: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  dataAttribute: 'data-doc-utils=true'
}

export const HeadingTransform: TransformDefinition<HeadingTransformConfig, HeadingNode[]> =
  (userConfig?: Partial<HeadingTransformConfig>) => {
    const config = new ConfigDefault(DefaultHeadingTransformConfig, userConfig)
    const transform = new Transform(headingTreeTransform, config)
    return transform
  }

export const headingTreeTransform: TransformFunc<HeadingTransformConfig, HeadingNode[]> = (config: HeadingTransformConfig) => {
  return (userConfig: Partial<HeadingTransformConfig>): HeadingNode[] => {
    const defaultConfig: HeadingTransformConfig = {
      headings: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      dataAttribute: `data-doc-utils${"=true"}`
    }

    const config = { ...defaultConfig, ...userConfig }

    const headings = getHeadings(config.headings, config.dataAttribute)
    return buildHeadingTree(headings)
  }
}

export interface HeadingNode {
  element: HTMLHeadingElement
  level: number,
  children: HeadingNode[]
}

export const getHeadings = (headings: HeadingTag[], attribute?: string) => {
  const headingQueries: string[] = headings.map((tag) => {
    if (attribute) {
      return `${tag}[${attribute}]`;
    } else {
      return `${tag}`;
    }
  });
  return Array.from(document.querySelectorAll(headingQueries.join(','))).map(
    (el) => {
      return el as HTMLHeadingElement;
    },
  );
};

export const buildHeadingTree = (headings: HTMLHeadingElement[]) => {
  const root: HeadingNode[] = [];
  const stack: HeadingNode[] = [];

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]);
    const node: HeadingNode = {
      element: heading,
      level,
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length == 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  });

  return root;
};




