import { Plugin, PluginDefinition } from '../../plugins.js';
import { HeadingNode } from '../index.js';

export interface AutoLinkConfig {

}

export const autoLink: Plugin<AutoLinkConfig, HeadingNode[]> = (config): PluginDefinition<HeadingNode[]> => {
  return (transformResult: HeadingNode[]) => {
    console.log(transformResult)
    const linkNode = (node: HeadingNode) => {
      const linkTag: HTMLAnchorElement = document.createElement('a');
      linkTag.href = `#${node.element.id}`
      linkTag.ariaHidden = 'true';
      linkTag.tabIndex = -1;

      node.element.parentNode?.insertBefore(linkTag, node.element);
      linkTag.appendChild(node.element)

      node.children.forEach(linkNode)
    }

    transformResult.forEach(linkNode)

  }
}




