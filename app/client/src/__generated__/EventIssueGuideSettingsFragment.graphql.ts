/**
 * @generated SignedSource<<17cc16b1cdf2de4c220fd56a5b5a473f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventIssueGuideSettingsFragment$data = {
  readonly id: string;
  readonly readingMaterialsUrl: string | null;
  readonly title: string | null;
  readonly " $fragmentType": "EventIssueGuideSettingsFragment";
};
export type EventIssueGuideSettingsFragment$key = {
  readonly " $data"?: EventIssueGuideSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventIssueGuideSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventIssueGuideSettingsFragment",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "readingMaterialsUrl",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "24b255064caf13912570a31361ff8aa4";

export default node;
