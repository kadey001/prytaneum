/**
 * @generated SignedSource<<d72add0b4b6e14b7ff3289adcb0411f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useBroadcastMessageSnackSubscription$variables = {
  eventId: string;
};
export type useBroadcastMessageSnackSubscription$data = {
  readonly broadcastMessageCreated: {
    readonly edge: {
      readonly node: {
        readonly broadcastMessage: string;
        readonly id: string;
      };
    };
  };
};
export type useBroadcastMessageSnackSubscription = {
  response: useBroadcastMessageSnackSubscription$data;
  variables: useBroadcastMessageSnackSubscription$variables;
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
    "concreteType": "EventBroadcastMessageEdgeContainer",
    "kind": "LinkedField",
    "name": "broadcastMessageCreated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "EventBroadcastMessageEdge",
        "kind": "LinkedField",
        "name": "edge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventBroadcastMessage",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "broadcastMessage",
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
    "name": "useBroadcastMessageSnackSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useBroadcastMessageSnackSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ec1333fe62efd766bc19de46d289b817",
    "id": null,
    "metadata": {},
    "name": "useBroadcastMessageSnackSubscription",
    "operationKind": "subscription",
    "text": "subscription useBroadcastMessageSnackSubscription(\n  $eventId: ID!\n) {\n  broadcastMessageCreated(eventId: $eventId) {\n    edge {\n      node {\n        id\n        broadcastMessage\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "12fe548773bfa32374edbfc33b78af9e";

export default node;
