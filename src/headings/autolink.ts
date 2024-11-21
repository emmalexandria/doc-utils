import { HeadingStep } from './config';
import { HeadingNode } from './tree';

export const autoLink: HeadingStep = () => {
  return (headingsConfig, tree) => {
    const linkNode = (node: HeadingNode) => {
      const linkTag: HTMLAnchorElement = document.createElement('a');
      linkTag.href = `#${node.element.id}`
      linkTag.ariaHidden = 'true';
      linkTag.tabIndex = -1;

      node.element.parentNode?.insertBefore(linkTag, node.element);
      linkTag.appendChild(node.element)

      node.children.forEach(linkNode)
    }

    tree.forEach(linkNode)
  }
}


