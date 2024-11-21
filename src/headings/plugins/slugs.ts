import { HeadingNode } from "../index.js";
import { Plugin, PluginDefinition } from "../../plugins.js"
import Slugger from "github-slugger"

export interface SlugsPlugin {

}

export const slugs: Plugin<SlugsPlugin, HeadingNode[]> = (config): PluginDefinition<HeadingNode[]> => {
  return (transformResult) => {
    const slugger = new Slugger();

    const processNode = (node: HeadingNode) => {
      if (!node.element.id && node.element.textContent) {
        node.element.id = slugger.slug(node.element.textContent)
      }

      node.children.forEach((child) => { processNode(child) })
    }

    transformResult.forEach(processNode)
  }
}


