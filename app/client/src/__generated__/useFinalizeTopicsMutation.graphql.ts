/**
 * @generated SignedSource<<80934df2d3ad42de67a7f91cbba92e2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useFinalizeTopicsMutation$variables = {
  descriptions: ReadonlyArray<string>;
  eventId: string;
  topics: ReadonlyArray<string>;
};
export type useFinalizeTopicsMutation$data = {
  readonly finalizeTopics: {
    readonly body: ReadonlyArray<{
      readonly description: string;
      readonly topic: string;
    }> | null;
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useFinalizeTopicsMutation = {
  response: useFinalizeTopicsMutation$data;
  variables: useFinalizeTopicsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "descriptions"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topics"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "descriptions",
        "variableName": "descriptions"
      },
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
    "concreteType": "TopicFinalizeMutationResponse",
    "kind": "LinkedField",
    "name": "finalizeTopics",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneratedTopic",
        "kind": "LinkedField",
        "name": "body",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "topic",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useFinalizeTopicsMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useFinalizeTopicsMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "08e00d95f73b25a6d8ae222cc4087f1e",
    "id": null,
    "metadata": {},
    "name": "useFinalizeTopicsMutation",
    "operationKind": "mutation",
    "text": "mutation useFinalizeTopicsMutation(\n  $eventId: String!\n  $topics: [String!]!\n  $descriptions: [String!]!\n) {\n  finalizeTopics(eventId: $eventId, topics: $topics, descriptions: $descriptions) {\n    body {\n      topic\n      description\n    }\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "6a4e01758270e2024db205bdf375e706";

export default node;
