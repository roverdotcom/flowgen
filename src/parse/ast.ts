import * as ts from "typescript";
import type { RawNode } from "../nodes/node";
import util from "util";
import * as logger from "../logger";

import * as printers from "../printers";

const inspect = Symbol.for("nodejs.util.inspect.custom");

export const parseNameFromNode = (node: RawNode): string => {
  if (node.name && node.name.text) {
    return node.name.text;
  } else if (node.type && node.type.typeName) {
    return node.type.typeName.text;
  } else if (node.exportClause) {
    const names = [];
    ts.forEachChild(node.exportClause, child => {
      names.push(parseNameFromNode(child));
    });
    return names.join(",");
  } else if (node.importClause && node.importClause.namedBindings) {
    return parseNameFromNode(node.importClause.namedBindings);
  } else if (node.moduleSpecifier) {
    return node.moduleSpecifier.text;
  } else if (node.expression) {
    return printers.node.printType(stripDetailsFromTree(node.expression));
  } else if (node.declarationList) {
    const declarations = node.declarationList.declarations
      .map(stripDetailsFromTree)
      .map(printers.node.printType)
      .join(" ");

    return declarations;
  } else if (node.kind === ts.SyntaxKind.NamedImports) {
    const names = [];
    ts.forEachChild(node, child => {
      names.push(parseNameFromNode(child));
    });
    return names.join(",");
  }
  switch (node.kind) {
    case ts.SyntaxKind.FunctionDeclaration:
      logger.error(node.modifiers || node, { type: "MissingFunctionName" });
      break;
    default:
      console.log("INVALID NAME", ts.SyntaxKind[node.kind]);
      break;
  }
  return "INVALID NAME REF";
};

function inspectFn(depth: number, options: util.InspectOptions): string {
  const newOptions = Object.assign({}, options, {
    depth: options.depth == null ? null : options.depth - 1,
  });
  if (depth < 0) {
    // eslint-disable-next-line no-unused-vars
    const { parent, symbol, localSymbol, ...rest } = this;
    delete rest[inspect];
    if (rest.kind) {
      return `${ts.SyntaxKind[rest.kind]} ${util.inspect(rest, newOptions)}`;
    } else {
      return util.inspect(rest, newOptions);
    }
  }
  // eslint-disable-next-line no-unused-vars
  const { parent, symbol, localSymbol, ...rest } = this;
  for (const key in rest) {
    if (
      Object.prototype.hasOwnProperty.call(rest, key) &&
      typeof rest[key] === "object"
    ) {
      rest[key][inspect] = inspectFn.bind(rest[key]);
    }
  }
  delete rest[inspect];
  if (rest.kind) {
    return `${ts.SyntaxKind[rest.kind]} ${util.inspect(rest, newOptions)}`;
  } else {
    return util.inspect(rest, newOptions);
  }
}

// Traverse a node and strip information we dont care about
// This is mostly to make debugging a bit less verbose
export const stripDetailsFromTree = (root: RawNode): any => {
  for (const key in root) {
    const val = root[key];

    if (key === "parent") continue;
    if (key === "symbol") continue;
    if (key === "localSymbol") continue;
    if (typeof val === "function") continue;
    if (typeof val !== "object") continue;

    if (
      Object.prototype.hasOwnProperty.call(root, key) &&
      typeof val === "object"
    ) {
      if (Array.isArray(val)) {
        root[key] = root[key].map(stripDetailsFromTree);
        // @ts-expect-error todo(flow->ts)
        root[key].pos = val.pos;
        // @ts-expect-error todo(flow->ts)
        root[key].end = val.end;
        root[key].assertHasRealPosition = root.assertHasRealPosition
          ? root.assertHasRealPosition.bind(val)
          : () => {};
        root[key].getStart = root.getStart ? root.getStart.bind(val) : () => 0;
        root[key].getEnd = root.getEnd ? root.getEnd.bind(val) : () => 0;
      } else {
        root[key][inspect] = inspectFn.bind(val);
      }
    }
  }

  root[inspect] = inspectFn.bind(root);
  return root;
};

export function getMembersFromNode(node: any): void {
  if (node.members) {
    return node.members;
  }

  if (node.type && node.type.members) {
    return node.type.members;
  }

  console.log("NO MEMBERS_", ts.SyntaxKind[node.kind], node);
}
