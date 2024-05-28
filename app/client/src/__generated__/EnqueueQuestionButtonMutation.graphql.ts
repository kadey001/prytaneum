/**
 * @generated SignedSource<<11c94eb8c7b99fb82a1e557975f87595>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddQuestionToTopicQueue = {
  eventId: string;
  questionId: string;
  topic: string;
};
export type EnqueueQuestionButtonMutation$variables = {
  input: AddQuestionToTopicQueue;
};
export type EnqueueQuestionButtonMutation$data = {
  readonly addQuestionToTopicQueue: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly position: string;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type EnqueueQuestionButtonMutation = {
  response: EnqueueQuestionButtonMutation$data;
  variables: EnqueueQuestionButtonMutation$variables;
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
    "concreteType": "EventQuestionMutationResponse",
    "kind": "LinkedField",
    "name": "addQuestionToTopicQueue",
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
        "concreteType": "EventQuestionEdge",
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
            "concreteType": "EventQuestion",
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
                "name": "position",
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
    "name": "EnqueueQuestionButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EnqueueQuestionButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "aa85dd7c9f881068ad0864792dd41278",
    "id": null,
    "metadata": {},
    "name": "EnqueueQuestionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation EnqueueQuestionButtonMutation(\n  $input: AddQuestionToTopicQueue!\n) {\n  addQuestionToTopicQueue(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "87db975f9036bbac9a053a7efced47ad";

export default node;
