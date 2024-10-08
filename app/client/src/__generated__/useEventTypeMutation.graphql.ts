/**
 * @generated SignedSource<<b832e40e2cb4f54820f4b81e5238991f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EventType = "GOOGLE_MEET" | "NO_VIDEO" | "YOUTUBE_STREAM" | "%future added value";
export type UpdateEventType = {
  eventId: string;
  eventType: EventType;
};
export type useEventTypeMutation$variables = {
  input: UpdateEventType;
};
export type useEventTypeMutation$data = {
  readonly updateEventType: {
    readonly body: string | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type useEventTypeMutation = {
  response: useEventTypeMutation$data;
  variables: useEventTypeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateEventTypeMutationResponse",
    "kind": "LinkedField",
    "name": "updateEventType",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isError",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "body",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useEventTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useEventTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d4dfb721a7768e1b20f8801cb73a7094",
    "id": null,
    "metadata": {},
    "name": "useEventTypeMutation",
    "operationKind": "mutation",
    "text": "mutation useEventTypeMutation(\n  $input: UpdateEventType!\n) {\n  updateEventType(input: $input) {\n    isError\n    message\n    body\n  }\n}\n"
  }
};
})();

(node as any).hash = "b04fb966750c87b16402e5739fe00228";

export default node;
