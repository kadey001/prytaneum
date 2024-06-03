/**
 * @generated SignedSource<<6eab5f38cdb275c00a9c912dc1d44155>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveMessagesQuery$variables = {
  eventId: string;
  lang: string;
};
export type LiveMessagesQuery$data = {
  readonly eventBroadcastMessages: ReadonlyArray<{
    readonly broadcastMessage: string;
    readonly createdBy: {
      readonly firstName: string | null;
    } | null;
    readonly id: string;
    readonly isVisible: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageAuthorFragment" | "BroadcastMessageContentFragment">;
  }> | null;
};
export type LiveMessagesQuery = {
  response: LiveMessagesQuery$data;
  variables: LiveMessagesQuery$variables;
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
    "name": "lang"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "broadcastMessage",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVisible",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v6 = [
  {
    "kind": "Variable",
    "name": "lang",
    "variableName": "lang"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveMessagesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventBroadcastMessage",
        "kind": "LinkedField",
        "name": "eventBroadcastMessages",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BroadcastMessageAuthorFragment"
          },
          {
            "args": (v6/*: any*/),
            "kind": "FragmentSpread",
            "name": "BroadcastMessageContentFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveMessagesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventBroadcastMessage",
        "kind": "LinkedField",
        "name": "eventBroadcastMessages",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v2/*: any*/),
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
            "args": (v6/*: any*/),
            "kind": "ScalarField",
            "name": "translatedBroadcastMessage",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "75f08eda85d9110c4568c5c290145b4c",
    "id": null,
    "metadata": {},
    "name": "LiveMessagesQuery",
    "operationKind": "query",
    "text": "query LiveMessagesQuery(\n  $eventId: ID!\n  $lang: String!\n) {\n  eventBroadcastMessages(eventId: $eventId) {\n    id\n    broadcastMessage\n    isVisible\n    createdBy {\n      firstName\n      id\n    }\n    ...BroadcastMessageAuthorFragment\n    ...BroadcastMessageContentFragment_3iqx2P\n  }\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment_3iqx2P on EventBroadcastMessage {\n  broadcastMessage\n  lang\n  translatedBroadcastMessage(lang: $lang)\n}\n"
  }
};
})();

(node as any).hash = "b77b4931c916769f7259fc037cc7c2df";

export default node;
