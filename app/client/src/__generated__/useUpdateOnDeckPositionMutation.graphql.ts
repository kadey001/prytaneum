/**
 * @generated SignedSource<<8e8abd0c7f6fda0da71e4449c7b278cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateOnDeckPosition = {
  eventId: string;
  newPosition: string;
  questionId: string;
};
export type useUpdateOnDeckPositionMutation$variables = {
  input: UpdateOnDeckPosition;
};
export type useUpdateOnDeckPositionMutation$data = {
  readonly updateOnDeckPosition: {
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
export type useUpdateOnDeckPositionMutation = {
  response: useUpdateOnDeckPositionMutation$data;
  variables: useUpdateOnDeckPositionMutation$variables;
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
    "name": "updateOnDeckPosition",
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
    "name": "useUpdateOnDeckPositionMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateOnDeckPositionMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "bad55549bec918c8a62bf1b69beaed2e",
    "id": null,
    "metadata": {},
    "name": "useUpdateOnDeckPositionMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateOnDeckPositionMutation(\n  $input: UpdateOnDeckPosition!\n) {\n  updateOnDeckPosition(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6de76e947a6e45b6d5bfa53fd6b13c1e";

export default node;
