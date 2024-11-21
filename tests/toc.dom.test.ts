import { buildHeadingTree, type HeadingNode } from "../src/headings";

import { expect, test } from 'vitest'

test('Basic heading tree', () => {
  let headings: HTMLHeadingElement[] = [];
  headings.push(document.createElement('h1') as HTMLHeadingElement)
  headings.push(document.createElement('h2') as HTMLHeadingElement)

  let result: HeadingNode[] = [{ element: headings[0], level: 1, children: [{ element: headings[1], level: 2, children: [] }] }]

  expect(buildHeadingTree(headings)).toEqual(result)

})

test('Complex heading tree', () => {
  let headings: HTMLHeadingElement[] = [];
  headings.push(document.createElement('h1') as HTMLHeadingElement)
  headings.push(document.createElement('h2') as HTMLHeadingElement)
  headings.push(document.createElement('h2') as HTMLHeadingElement)
  headings.push(document.createElement('h3') as HTMLHeadingElement)
  headings.push(document.createElement('h1') as HTMLHeadingElement)

  let result: HeadingNode[] = [{ element: headings[0], level: 1, children: [{ element: headings[1], level: 2, children: [] }, { element: headings[2], level: 2, children: [{ element: headings[3], level: 3, children: [] }], }] }, { element: headings[4], level: 1, children: [] }]

  expect(buildHeadingTree(headings)).toEqual(result)
})
