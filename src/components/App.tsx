import React, { Fragment, type ReactElement, useMemo } from "react";
import Yoga, { Direction, Display, Overflow, type Node as YogaNode } from "yoga-layout";
import { type FlexStyle, applyStyle } from "../layout/FlexStyle.mjs";

export type Props = Readonly<{
  rootNode: StyleNode;
  width?: number;
  height?: number;
}>;

export type StyleNode = {
  style?: FlexStyle;
  children?: StyleNode[];
};

export type LayoutMetrics = {
  top: number;
  left: number;
  width: number;
  height: number;
  overflow?: "visible" | "hidden" | "scroll";
  display?: "flex" | "none" | "contents";
  children?: LayoutMetrics[];
};

export const YogaViewer = ({ rootNode, width, height }: Props): ReactElement => {
  const layout: LayoutMetrics = useMemo(() => layoutStyleTree(rootNode, width, height), [rootNode, width, height]);
  console.log(layout);
  return <Fragment />;
};

// This is not efficient and not a good real-world-example for the best way to use Yoga, but sufficient for a playground
function layoutStyleTree(
  node: StyleNode,
  rootWidth: number | undefined,
  rootHeight: number | undefined,
): LayoutMetrics {
  const root = yogaNodeFromStyleNode(node);
  root.calculateLayout(rootWidth, rootHeight, Direction.LTR);

  const layoutMetrics = metricsFromYogaNode(root);
  layoutMetrics.overflow = node.style?.overflow;

  root.freeRecursive();
  return layoutMetrics;
}

const webDefaultsConfig = Yoga.Config.create();
webDefaultsConfig.setUseWebDefaults(true);

function yogaNodeFromStyleNode(styleNode: StyleNode): YogaNode {
  const node = Yoga.Node.create(webDefaultsConfig); // TODO use `create(undefined)` if not using web defaults
  applyStyle(node, styleNode.style);

  for (const child of styleNode.children ?? []) {
    node.insertChild(yogaNodeFromStyleNode(child), node.getChildCount());
  }

  return node;
}

function metricsFromYogaNode(node: YogaNode): LayoutMetrics {
  const children: LayoutMetrics[] = [];
  for (let i = 0; i < node.getChildCount(); i++) {
    children.push(metricsFromYogaNode(node.getChild(i)));
  }

  // Offset is relative to parent padding box, so we need to subtract the extra
  // border we show as part of the box.
  const parentBorderThickness = 1;

  return {
    top: node.getComputedTop() - parentBorderThickness,
    left: node.getComputedLeft() - parentBorderThickness,
    width: node.getComputedWidth(),
    height: node.getComputedHeight(),
    overflow: (() => {
      switch (node.getOverflow()) {
        case Overflow.Hidden:
          return "hidden";
        case Overflow.Scroll:
          return "scroll";
        case Overflow.Visible:
          return "visible";
      }
    })(),
    display: (() => {
      switch (node.getDisplay()) {
        case Display.Flex:
          return "flex";
        case Display.None:
          return "none";
        case Display.Contents:
          return "contents";
      }
    })(),
    children,
  };
}
