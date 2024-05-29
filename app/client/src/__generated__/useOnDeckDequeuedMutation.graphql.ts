/**
 * @generated SignedSource<<2e48bf109d85df16fce0c15fea095a46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveQuestionFromOnDeck = {
  eventId: string;
  newPosition: string;
  questionId: string;
  topic: string;
};
export type useOnDeckDequeuedMutation$variables = {
  input: RemoveQuestionFromOnDeck;
};
export type useOnDeckDequeuedMutation$data = {
  readonly removeQuestionFromOnDeck: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly onDeckPosition: string;
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
export type useOnDeckDequeuedMutation = {
  response: useOnDeckDequeuedMutation$data;
  variables: useOnDeckDequeuedMutation$variables;
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
    "name": "removeQuestionFromOnDeck",
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
    "name": "useOnDeckDequeuedMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useOnDeckDequeuedMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "051656416bd9b86cfcce45e9c467308b",
    "id": null,
    "metadata": {},
    "name": "useOnDeckDequeuedMutation",
    "operationKind": "mutation",
    "text": "mutation useOnDeckDequeuedMutation(\n  $input: RemoveQuestionFromOnDeck!\n) {\n  removeQuestionFromOnDeck(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n        onDeckPosition\n        topics {\n          position\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f0ad1ea833c4172f7eee7d3664f98570";

export default node;
