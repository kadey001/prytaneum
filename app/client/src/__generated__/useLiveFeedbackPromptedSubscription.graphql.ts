/**
 * @generated SignedSource<<81a36a07554daf55a2bef26b21a0539b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useLiveFeedbackPromptedSubscription$variables = {
  connections: ReadonlyArray<string>;
  eventId: string;
};
export type useLiveFeedbackPromptedSubscription$data = {
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
export type useLiveFeedbackPromptedSubscription = {
  response: useLiveFeedbackPromptedSubscription$data;
  variables: useLiveFeedbackPromptedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
],
v3 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useLiveFeedbackPromptedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventLiveFeedbackPromptEdge",
        "kind": "LinkedField",
        "name": "feedbackPrompted",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useLiveFeedbackPromptedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventLiveFeedbackPromptEdge",
        "kind": "LinkedField",
        "name": "feedbackPrompted",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "node",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "EventLiveFeedbackPromptEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e2703f8cb4ffaaf505f3f488ac518a87",
    "id": null,
    "metadata": {},
    "name": "useLiveFeedbackPromptedSubscription",
    "operationKind": "subscription",
    "text": "subscription useLiveFeedbackPromptedSubscription(\n  $eventId: ID!\n) {\n  feedbackPrompted(eventId: $eventId) {\n    node {\n      id\n      prompt\n      isVote\n      isDraft\n      isOpenEnded\n      isMultipleChoice\n      multipleChoiceOptions\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1d2796acdd5eeb8da02c0504fe76d400";

export default node;
