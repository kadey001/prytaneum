/**
 * @generated SignedSource<<38452931214adc68ed4922187ec59d66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useDeleteTopicMutation$variables = {
  eventId: string;
  topic: string;
};
export type useDeleteTopicMutation$data = {
  readonly removeTopic: {
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useDeleteTopicMutation = {
  response: useDeleteTopicMutation$data;
  variables: useDeleteTopicMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topic"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      },
      {
        "kind": "Variable",
        "name": "topic",
        "variableName": "topic"
      }
    ],
    "concreteType": "TopicRemoveMutationResponse",
    "kind": "LinkedField",
    "name": "removeTopic",
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
    "name": "useDeleteTopicMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteTopicMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "62e06c6be88472111617045b5a833014",
    "id": null,
    "metadata": {},
    "name": "useDeleteTopicMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteTopicMutation(\n  $eventId: String!\n  $topic: String!\n) {\n  removeTopic(eventId: $eventId, topic: $topic) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "f7c8620387daa1dd762684b7d408392e";

export default node;
