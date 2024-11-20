/**
 * @generated SignedSource<<f7afa589034b18876582b9372e7a8ebf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useLiveFeedbackPromptSubscription$variables = {
  eventId: string;
};
export type useLiveFeedbackPromptSubscription$data = {
  readonly feedbackPrompted: {
    readonly node: {
      readonly id: string;
      readonly isDraft: boolean | null;
      readonly isMultipleChoice: boolean | null;
      readonly isOpenEnded: boolean | null;
      readonly isVote: boolean | null;
      readonly multipleChoiceOptions: ReadonlyArray<string> | null;
      readonly prompt: string;
    };
  };
};
export type useLiveFeedbackPromptSubscription = {
  response: useLiveFeedbackPromptSubscription$data;
  variables: useLiveFeedbackPromptSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      }
    ],
    "concreteType": "EventLiveFeedbackPromptEdge",
    "kind": "LinkedField",
    "name": "feedbackPrompted",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "EventLiveFeedbackPrompt",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
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
            "name": "prompt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isVote",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isDraft",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isOpenEnded",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isMultipleChoice",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "multipleChoiceOptions",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useLiveFeedbackPromptSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useLiveFeedbackPromptSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8a67d4ead30d9e680f812ec39555c066",
    "id": null,
    "metadata": {},
    "name": "useLiveFeedbackPromptSubscription",
    "operationKind": "subscription",
    "text": "subscription useLiveFeedbackPromptSubscription(\n  $eventId: ID!\n) {\n  feedbackPrompted(eventId: $eventId) {\n    node {\n      id\n      prompt\n      isVote\n      isDraft\n      isOpenEnded\n      isMultipleChoice\n      multipleChoiceOptions\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "35f418331281c37477421497ffc1a59a";

export default node;
