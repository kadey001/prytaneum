/**
 * @generated SignedSource<<01634ed902c86c537968b857113f0a28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddQuestionToOnDeck = {
  eventId: string;
  newPosition: string;
  questionId: string;
};
export type useOnDeckEnqueuedMutation$variables = {
  input: AddQuestionToOnDeck;
};
export type useOnDeckEnqueuedMutation$data = {
  readonly addQuestionToOnDeck: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly onDeckPosition: string;
        readonly position: string;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type useOnDeckEnqueuedMutation = {
  response: useOnDeckEnqueuedMutation$data;
  variables: useOnDeckEnqueuedMutation$variables;
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
    "name": "addQuestionToOnDeck",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "onDeckPosition",
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
    "name": "useOnDeckEnqueuedMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useOnDeckEnqueuedMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a2cdbb9db977f03a3e5402502d2263c2",
    "id": null,
    "metadata": {},
    "name": "useOnDeckEnqueuedMutation",
    "operationKind": "mutation",
    "text": "mutation useOnDeckEnqueuedMutation(\n  $input: AddQuestionToOnDeck!\n) {\n  addQuestionToOnDeck(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n        onDeckPosition\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a0ccbecf75b3c2b3aab7edc803ddeb1c";

export default node;
