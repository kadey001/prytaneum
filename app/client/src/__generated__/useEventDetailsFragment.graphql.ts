/**
 * @generated SignedSource<<c52e1c9045602f9fb53e9604725b88dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type EventType = "GOOGLE_MEET" | "NO_VIDEO" | "YOUTUBE_STREAM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useEventDetailsFragment$data = {
  readonly description: string | null;
  readonly endDateTime: Date | null;
  readonly eventType: EventType | null;
  readonly id: string;
  readonly isActive: boolean | null;
  readonly isPrivate: boolean | null;
  readonly isViewerInvited: boolean | null;
  readonly isViewerModerator: boolean | null;
  readonly issueGuideUrl: string | null;
  readonly startDateTime: Date | null;
  readonly title: string | null;
  readonly topic: string | null;
  readonly topics: ReadonlyArray<{
    readonly description: string;
    readonly id: string;
    readonly topic: string;
  }> | null;
  readonly " $fragmentType": "useEventDetailsFragment";
};
export type useEventDetailsFragment$key = {
  readonly " $data"?: useEventDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useEventDetailsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "topic",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
};
return {
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
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    (v1/*: any*/),
    (v2/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EventTopic",
      "kind": "LinkedField",
      "name": "topics",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eventType",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "2d6630ee926052816d4d4260094d1d77";

export default node;
