/**
 * @generated SignedSource<<33f3b694485e7772020dfcc95af3a47a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ShareFeedbackPromptDraftMutation$variables = {
  promptId: string;
};
export type ShareFeedbackPromptDraftMutation$data = {
  readonly shareFeedbackPromptDraft: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly createdAt: Date | null;
        readonly id: string;
        readonly prompt: string;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type ShareFeedbackPromptDraftMutation = {
  response: ShareFeedbackPromptDraftMutation$data;
  variables: ShareFeedbackPromptDraftMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "promptId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "promptId",
        "variableName": "promptId"
      }
    ],
    "concreteType": "EventFeedbackPromptMutationResponse",
    "kind": "LinkedField",
    "name": "shareFeedbackPromptDraft",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isError",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EventLiveFeedbackPromptEdge",
        "kind": "LinkedField",
        "name": "body",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
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
                "name": "createdAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "prompt",
                "storageKey": null
              }
            ],
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
    "name": "ShareFeedbackPromptDraftMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShareFeedbackPromptDraftMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "356453ddbff2a7bcb811bd5f6669279b",
    "id": null,
    "metadata": {},
    "name": "ShareFeedbackPromptDraftMutation",
    "operationKind": "mutation",
    "text": "mutation ShareFeedbackPromptDraftMutation(\n  $promptId: ID!\n) {\n  shareFeedbackPromptDraft(promptId: $promptId) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        createdAt\n        prompt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "61fc7c499aa303e7d949b45f71958f09";

export default node;
