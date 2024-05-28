/**
 * @generated SignedSource<<aec38883c68b5c79ca0ae9cc8c195585>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useUserFragment$data = {
  readonly avatar: string | null;
  readonly email: string | null;
  readonly firstName: string | null;
  readonly id: string;
  readonly isAdmin: boolean | null;
  readonly isOrganizer: boolean | null;
  readonly lastName: string | null;
  readonly preferredLang: string | null;
  readonly " $fragmentType": "useUserFragment";
};
export type useUserFragment$key = {
  readonly " $data"?: useUserFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useUserFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUserFragment",
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
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOrganizer",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAdmin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "preferredLang",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "4562b40c4be3e0ec6034a9b59df447f6";

export default node;
