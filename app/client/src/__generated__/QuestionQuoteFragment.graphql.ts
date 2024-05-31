/**
 * @generated SignedSource<<2a27f71b9b08469b2dd67cc3c537e9e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionQuoteFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment">;
  readonly " $fragmentType": "QuestionQuoteFragment";
};
export type QuestionQuoteFragment$key = {
  readonly " $data"?: QuestionQuoteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
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
  "name": "QuestionQuoteFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuestionAuthorFragment"
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
      "name": "QuestionContentFragment"
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "b7d7067e42575c7049a762a965916a83";

export default node;
