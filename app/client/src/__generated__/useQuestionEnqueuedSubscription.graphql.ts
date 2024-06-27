/**
 * @generated SignedSource<<3b191f044c524dd32dfc1c876b5dd92d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useQuestionEnqueuedSubscription$variables = {
  eventId: string;
};
export type useQuestionEnqueuedSubscription$data = {
  readonly questionEnqueued: {
    readonly edge: {
      readonly node: {
        readonly id: string;
      };
    };
  };
};
export type useQuestionEnqueuedSubscription = {
  response: useQuestionEnqueuedSubscription$data;
  variables: useQuestionEnqueuedSubscription$variables;
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
    "name": "questionEnqueued",
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
    "name": "useQuestionEnqueuedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useQuestionEnqueuedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5eaebb6be01592ea8b91472b7ee4c315",
    "id": null,
    "metadata": {},
    "name": "useQuestionEnqueuedSubscription",
    "operationKind": "subscription",
    "text": "subscription useQuestionEnqueuedSubscription(\n  $eventId: String!\n) {\n  questionEnqueued(eventId: $eventId) {\n    edge {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6d2d59119d72b6846dd7c4a867d0e7e1";

export default node;
