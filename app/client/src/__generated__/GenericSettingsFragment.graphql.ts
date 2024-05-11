/**
 * @generated SignedSource<<349285e91336072f924442eb57c68413>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenericSettingsFragment$data = {
  readonly id: string;
  readonly isCollectRatingsEnabled: boolean | null;
  readonly isForumEnabled: boolean | null;
  readonly isPrivate: boolean | null;
  readonly isQuestionFeedVisible: boolean | null;
  readonly issueGuideUrl: string | null;
  readonly " $fragmentType": "GenericSettingsFragment";
};
export type GenericSettingsFragment$key = {
  readonly " $data"?: GenericSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GenericSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GenericSettingsFragment",
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
      "name": "isQuestionFeedVisible",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isCollectRatingsEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isForumEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPrivate",
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

(node as any).hash = "1e252a178e4541848ee731d1a4113350";

export default node;
