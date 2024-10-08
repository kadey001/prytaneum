/**
 * @generated SignedSource<<eed216d4f3906349fa93c161aaf7d148>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useGoogleMeetRefresh$variables = {
  id: string;
};
export type useGoogleMeetRefresh$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"useGoogleMeetFragment">;
  } | null;
};
export type useGoogleMeetRefresh = {
  response: useGoogleMeetRefresh$data;
  variables: useGoogleMeetRefresh$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useGoogleMeetRefresh",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "useGoogleMeetFragment"
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
    "name": "useGoogleMeetRefresh",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "googleMeetUrl",
                "storageKey": null
              }
            ],
            "type": "Event",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4b0c8e5c2a9176e594a626522f63d89b",
    "id": null,
    "metadata": {},
    "name": "useGoogleMeetRefresh",
    "operationKind": "query",
    "text": "query useGoogleMeetRefresh(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...useGoogleMeetFragment\n    id\n  }\n}\n\nfragment useGoogleMeetFragment on Event {\n  googleMeetUrl\n  id\n}\n"
  }
};
})();

(node as any).hash = "f22e1a87f3f71cbc98ef826ed5f4d922";

export default node;
