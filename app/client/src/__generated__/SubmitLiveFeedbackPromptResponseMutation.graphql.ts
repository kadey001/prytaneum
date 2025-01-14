/**
 * @generated SignedSource<<8fa42b14fdb5d028ad011d3552321c65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateFeedbackPromptResponse = {
  eventId: string;
  multipleChoiceResponse: string;
  promptId: string;
  response: string;
  vote: string;
};
export type SubmitLiveFeedbackPromptResponseMutation$variables = {
  input: CreateFeedbackPromptResponse;
};
export type SubmitLiveFeedbackPromptResponseMutation$data = {
  readonly createFeedbackPromptResponse: {
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
export type SubmitLiveFeedbackPromptResponseMutation = {
  response: SubmitLiveFeedbackPromptResponseMutation$data;
  variables: SubmitLiveFeedbackPromptResponseMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EventFeedbackPromptResponseMutationResponse",
    "kind": "LinkedField",
    "name": "createFeedbackPromptResponse",
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
        "concreteType": "EventLiveFeedbackPromptResponseEdge",
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
            "concreteType": "EventLiveFeedbackPromptResponse",
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
    "name": "SubmitLiveFeedbackPromptResponseMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmitLiveFeedbackPromptResponseMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "14814a89ffd7b978b7491ad29b2e99c3",
    "id": null,
    "metadata": {},
    "name": "SubmitLiveFeedbackPromptResponseMutation",
    "operationKind": "mutation",
    "text": "mutation SubmitLiveFeedbackPromptResponseMutation(\n  $input: CreateFeedbackPromptResponse!\n) {\n  createFeedbackPromptResponse(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1c039562137d502a7fb19ac58bb3e69e";

export default node;
