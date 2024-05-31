/**
 * @generated SignedSource<<b224cc6ab2fe8b6183784d094b52d7b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionActionsFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteButtonFragment" | "LikeFragment" | "QueueButtonFragment" | "QuoteFragment">;
  readonly " $fragmentType": "QuestionActionsFragment";
};
export type QuestionActionsFragment$key = {
  readonly " $data"?: QuestionActionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionActionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "lang"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionActionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "lang",
          "variableName": "lang"
        }
      ],
      "kind": "FragmentSpread",
      "name": "QuoteFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LikeFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QueueButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteButtonFragment"
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "1c039e30b4d26c9d3579297f1e37a074";

export default node;
