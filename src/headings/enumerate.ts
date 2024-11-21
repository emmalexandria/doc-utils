import { HeadingStep } from "./config";
import { HeadingNode } from "./tree";

interface EnumerateConfig {
  maxLevel: number;
  absoluteNumber: boolean
  numberClasses: string
}

const DefaultConfig: EnumerateConfig = {
  maxLevel: 6,
  absoluteNumber: true,
  numberClasses: ""
}

export const enumerate: HeadingStep = (userConfig: Partial<EnumerateConfig>) => {
  const config = { ...DefaultConfig, ...userConfig }
  return (headings, tree) => {
    const indices: number[] = new Array(config.maxLevel).fill(0)

    const addNumberToNode = (node: HeadingNode, indices: number[], level: number) => {
      const indicesSubset = indices.slice(0, level + 1)
      const text = indicesSubset.join(".")
      node.element.setAttribute("data-header-level", text)
    }

    const enumerateNode = (node: HeadingNode, level: number = 0) => {
      const childLevel = level + 1
      indices[level] += 1;

      addNumberToNode(node, indices, level)

      if (childLevel > indices.length) {
        return;
      }

      indices[childLevel] = 0
      node.children.forEach((child) => { enumerateNode(child, childLevel) })
    }

    tree.forEach((node) => {
      enumerateNode(node)
    })


  }

}
