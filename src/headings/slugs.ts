import Slugger from 'github-slugger';
import { HeadingNode } from './tree';
import { HeadingStep } from './config';

export const slugsStep: HeadingStep = () => {
  return (headings, tree) => {
    const slugger = new Slugger();
    const processNode = (node: HeadingNode) => {
      if (!node.element.id && node.element.textContent) {
        node.element.id = slugger.slug(node.element.textContent)
      }

      node.children.forEach((child) => { processNode(child) })
    }

    tree.forEach((node) => {
      processNode(node)
    })

  }
}


