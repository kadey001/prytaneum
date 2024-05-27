/**
 * @generated SignedSource<<2127d7f5d4a3f28f525ff76e51d2d6f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionTopicsFragment$data = {
  readonly topics: ReadonlyArray<{
    readonly description: string;
    readonly position: string;
    readonly topic: string;
  }> | null;
  readonly " $fragmentType": "QuestionTopicsFragment";
};
export type QuestionTopicsFragment$key = {
  readonly " $data"?: QuestionTopicsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionTopicsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionTopicsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EventQuestionTopic",
      "kind": "LinkedField",
      "name": "topics",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "topic",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "position",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "d13b3d5238bf8174587e9e269c86b56f";

export default node;
