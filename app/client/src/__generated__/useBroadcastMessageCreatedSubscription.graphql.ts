/**
 * @generated SignedSource<<88d7ebc54484770934cc6918f9478b58>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useBroadcastMessageCreatedSubscription$variables = {
  connections: ReadonlyArray<string>;
  eventId: string;
  lang: string;
};
export type useBroadcastMessageCreatedSubscription$data = {
  readonly broadcastMessageCreated: {
    readonly edge: {
      readonly cursor: string;
      readonly node: {
        readonly broadcastMessage: string;
        readonly createdBy: {
          readonly firstName: string | null;
        } | null;
        readonly id: string;
        readonly isVisible: boolean | null;
        readonly position: number | null;
        readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageActionsFragment" | "BroadcastMessageAuthorFragment" | "BroadcastMessageContentFragment">;
      };
    };
  };
};
export type useBroadcastMessageCreatedSubscription = {
  response: useBroadcastMessageCreatedSubscription$data;
  variables: useBroadcastMessageCreatedSubscription$variables;
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
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lang"
},
v3 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "broadcastMessage",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVisible",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v10 = [
  {
    "kind": "Variable",
    "name": "lang",
    "variableName": "lang"
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
    "name": "useBroadcastMessageCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventBroadcastMessage",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "BroadcastMessageActionsFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "BroadcastMessageAuthorFragment"
                  },
                  {
                    "args": (v10/*: any*/),
                    "kind": "FragmentSpread",
                    "name": "BroadcastMessageContentFragment"
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
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "useBroadcastMessageCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventBroadcastMessage",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatar",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lang",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v10/*: any*/),
                    "kind": "ScalarField",
                    "name": "translatedBroadcastMessage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
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
    "cacheID": "c6d1043261ee8b5b5f172e489b4abf0f",
    "id": null,
    "metadata": {},
    "name": "useBroadcastMessageCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription useBroadcastMessageCreatedSubscription(\n  $eventId: ID!\n  $lang: String!\n) {\n  broadcastMessageCreated(eventId: $eventId) {\n    edge {\n      cursor\n      node {\n        id\n        broadcastMessage\n        position\n        isVisible\n        createdBy {\n          firstName\n          id\n        }\n        ...BroadcastMessageActionsFragment\n        ...BroadcastMessageAuthorFragment\n        ...BroadcastMessageContentFragment_3iqx2P\n      }\n    }\n  }\n}\n\nfragment BroadcastMessageActionsFragment on EventBroadcastMessage {\n  id\n  ...DeleteBroadcastMessageButtonFragment\n  ...EditBroadcastMessageButtonFragment\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment_3iqx2P on EventBroadcastMessage {\n  broadcastMessage\n  lang\n  translatedBroadcastMessage(lang: $lang)\n}\n\nfragment DeleteBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n  position\n}\n\nfragment EditBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n}\n"
  }
};
})();

(node as any).hash = "c0da6dc48eee99a0a2ad77c935494b45";

export default node;
