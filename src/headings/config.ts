import { HeadingTag } from '.';
import { type HeadingNode } from './tree';

export interface HeadingsConfig {
  headings: HeadingTag[];
  dataAttribute: string;
}

export const DefaultHeadingsConfig: HeadingsConfig = {
  headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
  dataAttribute: "data-doc-utils='true'"
};

export type HeadingTransform = (headingsConfig: HeadingsConfig, tree: HeadingNode[]) => void;
export type HeadingStep = (config?: any) => HeadingTransform 
