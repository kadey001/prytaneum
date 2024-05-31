/**
 * @generated SignedSource<<f11ee07f3042cf7bbf04f213891d0665>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventSidebarFragment$data = {
  readonly id: string;
  readonly isQuestionFeedVisible: boolean | null;
  readonly isViewerModerator: boolean | null;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionCarouselFragment" | "SpeakerListFragment" | "useBroadcastMessageListFragment" | "useLiveFeedbackListFragment" | "useOnDeckFragment" | "useQuestionListFragment" | "useQuestionQueueFragment">;
  readonly " $fragmentType": "EventSidebarFragment";
};
export type EventSidebarFragment$key = {
  readonly " $data"?: EventSidebarFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventSidebarFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "userLang",
    "variableName": "lang"
  }
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "eventId"
    },
    {
      "kind": "RootArgument",
      "name": "lang"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventSidebarFragment",
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
      "name": "isViewerModerator",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpeakerListFragment"
    },
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "useQuestionListFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useBroadcastMessageListFragment"
    },
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "useQuestionQueueFragment"
    },
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "QuestionCarouselFragment"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "eventId",
          "variableName": "eventId"
        }
      ],
      "kind": "FragmentSpread",
      "name": "useLiveFeedbackListFragment"
    },
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "useOnDeckFragment"
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "b2ff2e162e8420e223f8f5587682a4b5";

export default node;
