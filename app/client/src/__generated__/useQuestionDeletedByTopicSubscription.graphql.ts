/**
 * @generated SignedSource<<f5c3aebd9eadbb871666503fd840d740>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useQuestionDeletedByTopicSubscription$variables = {
  eventId: string;
};
export type useQuestionDeletedByTopicSubscription$data = {
  readonly questionDeleted: {
    readonly edge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
      };
    };
  };
};
export type useQuestionDeletedByTopicSubscription = {
  response: useQuestionDeletedByTopicSubscription$data;
  variables: useQuestionDeletedByTopicSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
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
      }
    ],
    "concreteType": "EventQuestionEdgeContainer",
    "kind": "LinkedField",
    "name": "questionDeleted",
    "plural": false,
    "selections": [
      {
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
              }
            ],
            "storageKey": null
          }
        ],
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
    "name": "useQuestionDeletedByTopicSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useQuestionDeletedByTopicSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9a9222102b43e1dd5c5871ad68234093",
    "id": null,
    "metadata": {},
    "name": "useQuestionDeletedByTopicSubscription",
    "operationKind": "subscription",
    "text": "subscription useQuestionDeletedByTopicSubscription(\n  $eventId: ID!\n) {\n  questionDeleted(eventId: $eventId) {\n    edge {\n      cursor\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fb546628d51cdd3216efe27d1970c293";

export default node;
