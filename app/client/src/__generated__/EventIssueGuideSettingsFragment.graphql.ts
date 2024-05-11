/**
 * @generated SignedSource<<963b5d6bc8ecacbcb63cee1b91ca184b>>
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
  readonly issueGuideUrl: string | null;
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
      "name": "issueGuideUrl",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "58cd9ff5c186f247fe73fd13c03d71ef";

export default node;
