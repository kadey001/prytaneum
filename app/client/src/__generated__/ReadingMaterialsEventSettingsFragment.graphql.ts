/**
 * @generated SignedSource<<0d0494439a68dbd86340c779e6d064a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReadingMaterialsEventSettingsFragment$data = {
  readonly id: string;
  readonly readingMaterialsUrl: string | null;
  readonly " $fragmentType": "ReadingMaterialsEventSettingsFragment";
};
export type ReadingMaterialsEventSettingsFragment$key = {
  readonly " $data"?: ReadingMaterialsEventSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReadingMaterialsEventSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReadingMaterialsEventSettingsFragment",
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
      "name": "readingMaterialsUrl",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "65b0acb0eb38ab5ef8b4eea4d9516f68";

export default node;
