/**
 * @generated SignedSource<<95773878a0a89ce4674f4e4a1cbbc818>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useEventDetailsFragment$data = {
  readonly description: string | null;
  readonly endDateTime: Date | null;
  readonly id: string;
  readonly isActive: boolean | null;
  readonly isPrivate: boolean | null;
  readonly isViewerInvited: boolean | null;
  readonly isViewerModerator: boolean | null;
  readonly issueGuideUrl: string | null;
  readonly startDateTime: Date | null;
  readonly title: string | null;
  readonly topic: string | null;
  readonly " $fragmentType": "useEventDetailsFragment";
};
export type useEventDetailsFragment$key = {
  readonly " $data"?: useEventDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useEventDetailsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./UseEventDetailsRefetchQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "useEventDetailsFragment",
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
      "name": "startDateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isActive",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isViewerModerator",
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
      "name": "isViewerInvited",
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

(node as any).hash = "1e3632d245c6365ae65a3d6816792067";

export default node;
