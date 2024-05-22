/**
 * @generated SignedSource<<8d5de573abcd107ce2312ec465f0d6d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveQuestionFromTopicQueue = {
  eventId: string;
  questionId: string;
  topic: string;
};
export type DequeueQuestionButtonMutation$variables = {
  input: RemoveQuestionFromTopicQueue;
};
export type DequeueQuestionButtonMutation$data = {
  readonly removeQuestionFromTopicQueue: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly position: string;
        readonly topics: ReadonlyArray<{
          readonly position: string;
        }> | null;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type DequeueQuestionButtonMutation = {
  response: DequeueQuestionButtonMutation$data;
  variables: DequeueQuestionButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v2 = [
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
    "name": "removeQuestionFromTopicQueue",
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestionTopic",
                "kind": "LinkedField",
                "name": "topics",
                "plural": true,
                "selections": [
                  (v1/*: any*/)
                ],
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
    "name": "DequeueQuestionButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DequeueQuestionButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "25ac2219ff80cff7edf7c1ae3eba6f67",
    "id": null,
    "metadata": {},
    "name": "DequeueQuestionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DequeueQuestionButtonMutation(\n  $input: RemoveQuestionFromTopicQueue!\n) {\n  removeQuestionFromTopicQueue(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n        topics {\n          position\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8cd73f169b483ff7e31aedea3e7fc674";

export default node;
