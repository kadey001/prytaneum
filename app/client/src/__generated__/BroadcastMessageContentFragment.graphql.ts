/**
 * @generated SignedSource<<970a42e545fd5b808cea0323dc7e6271>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BroadcastMessageContentFragment$data = {
  readonly broadcastMessage: string;
  readonly lang: string | null;
  readonly translatedBroadcastMessage: string | null;
  readonly " $fragmentType": "BroadcastMessageContentFragment";
};
export type BroadcastMessageContentFragment$key = {
  readonly " $data"?: BroadcastMessageContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": "EN",
      "kind": "LocalArgument",
      "name": "lang"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "BroadcastMessageContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "broadcastMessage",
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
      "args": [
        {
          "kind": "Variable",
          "name": "lang",
          "variableName": "lang"
        }
      ],
      "kind": "ScalarField",
      "name": "translatedBroadcastMessage",
      "storageKey": null
    }
  ],
  "type": "EventBroadcastMessage",
  "abstractKey": null
};

(node as any).hash = "96d61b1371975d34799c1eee635b8344";

export default node;
