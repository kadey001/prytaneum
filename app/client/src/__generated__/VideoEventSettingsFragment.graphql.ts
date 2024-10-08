/**
 * @generated SignedSource<<86bcc5adecf51e437552076cdc73e270>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type EventType = "GOOGLE_MEET" | "NO_VIDEO" | "YOUTUBE_STREAM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type VideoEventSettingsFragment$data = {
  readonly eventType: EventType | null;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"GoogleMeetSettingsFragment" | "YoutubeSettingsFragment">;
  readonly " $fragmentType": "VideoEventSettingsFragment";
};
export type VideoEventSettingsFragment$key = {
  readonly " $data"?: VideoEventSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"VideoEventSettingsFragment">;
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
      "operation": require('./VideoEventSettingsFragmentRefresh.graphql'),
      "identifierField": "id"
    }
  },
  "name": "VideoEventSettingsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eventType",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "YoutubeSettingsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GoogleMeetSettingsFragment"
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

(node as any).hash = "34fd7f679509a7341d213af56a9a4110";

export default node;
