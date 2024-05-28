/**
 * @generated SignedSource<<06ce866e648df86768ce2c8bd3ea336d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useOnDeckEnqueuedSubscription$variables = {
  connections: ReadonlyArray<string>;
  eventId: string;
};
export type useOnDeckEnqueuedSubscription$data = {
  readonly enqueuedPushQuestion: {
    readonly edge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly onDeckPosition: string;
        readonly position: string;
        readonly topics: ReadonlyArray<{
          readonly description: string;
          readonly position: string;
          readonly topic: string;
        }> | null;
      };
    };
  };
};
export type useOnDeckEnqueuedSubscription = {
  response: useOnDeckEnqueuedSubscription$data;
  variables: useOnDeckEnqueuedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "EventQuestionEdge",
  "kind": "LinkedField",
  "name": "edge",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EventQuestion",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "onDeckPosition",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "EventQuestionTopic",
          "kind": "LinkedField",
          "name": "topics",
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
            },
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useOnDeckEnqueuedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "enqueuedPushQuestion",
        "plural": false,
        "selections": [
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useOnDeckEnqueuedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "enqueuedPushQuestion",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "86107b1f05b2a47887a76b309f0d2df1",
    "id": null,
    "metadata": {},
    "name": "useOnDeckEnqueuedSubscription",
    "operationKind": "subscription",
    "text": "subscription useOnDeckEnqueuedSubscription(\n  $eventId: ID!\n) {\n  enqueuedPushQuestion(eventId: $eventId) {\n    edge {\n      cursor\n      node {\n        id\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "35e61541a0e623f80c40a4ef856031ca";

export default node;
