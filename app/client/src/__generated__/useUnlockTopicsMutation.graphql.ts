/**
 * @generated SignedSource<<5ed28f95f51e55bcee1f0fe527654551>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useUnlockTopicsMutation$variables = {
  eventId: string;
  topics: ReadonlyArray<string>;
};
export type useUnlockTopicsMutation$data = {
  readonly unlockTopics: {
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useUnlockTopicsMutation = {
  response: useUnlockTopicsMutation$data;
  variables: useUnlockTopicsMutation$variables;
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
    "name": "topics"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  },
  {
    "kind": "Variable",
    "name": "topics",
    "variableName": "topics"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUnlockTopicsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "unlockTopics",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUnlockTopicsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "unlockTopics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3c14ad241d42b620a19dbdd5d87a5b4b",
    "id": null,
    "metadata": {},
    "name": "useUnlockTopicsMutation",
    "operationKind": "mutation",
    "text": "mutation useUnlockTopicsMutation(\n  $eventId: String!\n  $topics: [String!]!\n) {\n  unlockTopics(eventId: $eventId, topics: $topics) {\n    __typename\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "3a60cb7248eab19346d906067c401956";

export default node;
