/**
 * @generated SignedSource<<1ba0a23ae7874e192377db60a6b15edd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GoogleMeetSettingsFragmentRefresh$variables = {
  id: string;
};
export type GoogleMeetSettingsFragmentRefresh$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"GoogleMeetSettingsFragment">;
  } | null;
};
export type GoogleMeetSettingsFragmentRefresh = {
  response: GoogleMeetSettingsFragmentRefresh$data;
  variables: GoogleMeetSettingsFragmentRefresh$variables;
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
    "name": "GoogleMeetSettingsFragmentRefresh",
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
            "name": "GoogleMeetSettingsFragment"
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
    "name": "GoogleMeetSettingsFragmentRefresh",
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
    "cacheID": "e14f1de894325139239cba81ef8a269d",
    "id": null,
    "metadata": {},
    "name": "GoogleMeetSettingsFragmentRefresh",
    "operationKind": "query",
    "text": "query GoogleMeetSettingsFragmentRefresh(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...GoogleMeetSettingsFragment\n    id\n  }\n}\n\nfragment GoogleMeetSettingsFragment on Event {\n  googleMeetUrl\n  id\n}\n"
  }
};
})();

(node as any).hash = "fb8a0c10bafb6ae4cc314502d69cf3af";

export default node;
