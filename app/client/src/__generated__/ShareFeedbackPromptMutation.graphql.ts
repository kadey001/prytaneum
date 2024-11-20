/**
 * @generated SignedSource<<8da5890edd22bbdc0b363ea5c63ab58b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ShareFeedbackPromptMutation$variables = {
  promptId: string;
};
export type ShareFeedbackPromptMutation$data = {
  readonly reshareFeedbackPrompt: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type ShareFeedbackPromptMutation = {
  response: ShareFeedbackPromptMutation$data;
  variables: ShareFeedbackPromptMutation$variables;
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
    "name": "reshareFeedbackPrompt",
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
    "name": "ShareFeedbackPromptMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShareFeedbackPromptMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "964511c1baf025a3381554b61f8e7f04",
    "id": null,
    "metadata": {},
    "name": "ShareFeedbackPromptMutation",
    "operationKind": "mutation",
    "text": "mutation ShareFeedbackPromptMutation(\n  $promptId: ID!\n) {\n  reshareFeedbackPrompt(promptId: $promptId) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0345fab8a625a9d3f8a1ff29f9297bf5";

export default node;
