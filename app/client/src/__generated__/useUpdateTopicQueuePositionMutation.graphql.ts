/**
 * @generated SignedSource<<46ee7c4437517afd2f65a5cb668c64ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateTopicQueuePosition = {
  eventId: string;
  newPosition: string;
  questionId: string;
  topic: string;
};
export type useUpdateTopicQueuePositionMutation$variables = {
  input: UpdateTopicQueuePosition;
};
export type useUpdateTopicQueuePositionMutation$data = {
  readonly updateTopicQueuePosition: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly onDeckPosition: string;
        readonly position: string;
        readonly topics: ReadonlyArray<{
          readonly description: string;
          readonly position: string;
          readonly topic: string;
        }> | null;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type useUpdateTopicQueuePositionMutation = {
  response: useUpdateTopicQueuePositionMutation$data;
  variables: useUpdateTopicQueuePositionMutation$variables;
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
    "name": "updateTopicQueuePosition",
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
                "kind": "ScalarField",
                "name": "onDeckPosition",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestionTopic",
                "kind": "LinkedField",
                "name": "topics",
                "plural": true,
                "selections": [
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
    "name": "useUpdateTopicQueuePositionMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateTopicQueuePositionMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "55909b45656bad62297ab4498403f2fa",
    "id": null,
    "metadata": {},
    "name": "useUpdateTopicQueuePositionMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateTopicQueuePositionMutation(\n  $input: UpdateTopicQueuePosition!\n) {\n  updateTopicQueuePosition(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6ed799e3293b26a677a1ac651c95edf4";

export default node;
