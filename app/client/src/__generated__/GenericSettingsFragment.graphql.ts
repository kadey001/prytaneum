/**
 * @generated SignedSource<<d9aa39ab529887019681d961521db3a7>>
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
  readonly readingMaterialsUrl: string | null;
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
      "name": "readingMaterialsUrl",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "5f0b89d39bc10790c921a048d40a5be2";

export default node;
