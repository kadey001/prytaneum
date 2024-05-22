/**
 * @generated SignedSource<<d14e22b82994ed08503b5de779434122>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QueueButtonFragment$data = {
  readonly id: string;
  readonly position: string;
  readonly question: string;
  readonly topics: ReadonlyArray<{
    readonly position: string;
    readonly topic: string;
  }> | null;
  readonly " $fragmentType": "QueueButtonFragment";
};
export type QueueButtonFragment$key = {
  readonly " $data"?: QueueButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QueueButtonFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueueButtonFragment",
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
      "name": "question",
      "storageKey": null
    },
    (v0/*: any*/),
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
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};
})();

(node as any).hash = "855ec30524718822e0a1c5e9d47f7b78";

export default node;
