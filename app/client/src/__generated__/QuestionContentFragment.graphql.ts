/**
 * @generated SignedSource<<e5f68aee12d27df2d2b72534e150d1a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionContentFragment$data = {
  readonly lang: string | null;
  readonly question: string;
  readonly questionTranslated: string | null;
  readonly " $fragmentType": "QuestionContentFragment";
};
export type QuestionContentFragment$key = {
  readonly " $data"?: QuestionContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionContentFragment">;
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
  "name": "QuestionContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "question",
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
      "name": "questionTranslated",
      "storageKey": null
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "ae2ac38a606d72078e1a249639f20f23";

export default node;
