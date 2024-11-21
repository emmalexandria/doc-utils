# doc-utils

`doc-utils` is a set of Javascript utilities designed for a variety of tasks related to managing documents such as blog posts. It is particularly useful when
you don't have access to the rich plugin library available for `remark`, `rehype`, and `retext`.

## Installation
`doc-utils` can be installed like any other NPM package.

`npm install doc-utils`

## Usage 

### Headings
`doc-utils` contains a processing system for headers in which headers are parsed into a tree and processed. Which headers are processed are determined by a combination of a data attribute and valid heading elements. Currently, 4 'steps' are available:
1. `slugs` — *Generate and add IDs to heading elements*
2. `autolink` — *Automatically wrap heading elements in <a> tags which link to the heading's ID*
3. `toc` — *Automatically generate a table of contents with support for different classes at each level or a default set of classes*
4. `enumerate` — *Prepend numbers to headings to indicate where in the document structure they lie*

#### Basic usage

```js
import {processHeadings, slugs, autoLink, toc} from 'doc-utils/headings.js'

processHeadings([slugs(), autoLink(), toc()])
```
It is important to note that each step is run in the order it is passed. For this reason, it is important to generate slugs before either of the other plugins run as they both rely on the header elements having IDs.

#### Customising header selection
By default, `processHeadings` will select header elements from `<h1>` to `<h6>` with the attribute `data-doc-utils="true"`. This can be customised by passing configuration to `processHeadings`
```js
processHeadings([slugs(), autoLink(), toc()], {
                dataAttribute: 'data-toc="true"', headers: ["h1", "h2", "h3"]
                });
```


## Planned features

### Step system
Currently, the system used by the header processing is entirely specific to header elements. It would be ideal to have a generic system which is based on ASTs (`hast` or `nlcst`). This hypothetical step system would track the root node of the AST in the DOM and use it to synchronize updates between the AST and the DOM.
Basically, the goal is a generic step system which:
- Works with `hast` or `nlcst`
- Allows generic targeting of elements by plugins
- Can synchronise ASTs and rendered content
- Orders steps based on the elements and properties they modify and depend on

### Natural language features
In addition to HTML processing, natural language processing using `nlcst` would be highly useful. One immediately obvious use case is finding keywords and keyphrases. However, expanding contractions and other features could also be implemented.

