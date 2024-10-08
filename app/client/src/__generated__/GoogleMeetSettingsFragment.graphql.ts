/**
 * @generated SignedSource<<d0effc91a3ba0fc73ee291b0e7816be3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GoogleMeetSettingsFragment$data = {
  readonly googleMeetUrl: string | null;
  readonly id: string;
  readonly " $fragmentType": "GoogleMeetSettingsFragment";
};
export type GoogleMeetSettingsFragment$key = {
  readonly " $data"?: GoogleMeetSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GoogleMeetSettingsFragment">;
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
      "operation": require('./GoogleMeetSettingsFragmentRefresh.graphql'),
      "identifierField": "id"
    }
  },
  "name": "GoogleMeetSettingsFragment",
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

(node as any).hash = "fb8a0c10bafb6ae4cc314502d69cf3af";

export default node;
