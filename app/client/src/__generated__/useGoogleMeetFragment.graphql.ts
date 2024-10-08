/**
 * @generated SignedSource<<220af3f166149197bf788a8e506c51ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useGoogleMeetFragment$data = {
  readonly googleMeetUrl: string | null;
  readonly id: string;
  readonly " $fragmentType": "useGoogleMeetFragment";
};
export type useGoogleMeetFragment$key = {
  readonly " $data"?: useGoogleMeetFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useGoogleMeetFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./useGoogleMeetRefresh.graphql'),
      "identifierField": "id"
    }
  },
  "name": "useGoogleMeetFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "googleMeetUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "f22e1a87f3f71cbc98ef826ed5f4d922";

export default node;
