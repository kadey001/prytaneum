/**
 * @generated SignedSource<<4a8edaba1c029997e98985b3b3dea849>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GenerateViewpointsMutation$variables = {
  eventId: string;
  promptId: string;
};
export type GenerateViewpointsMutation$data = {
  readonly generateViewpoints: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly viewpoints: ReadonlyArray<string> | null;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type GenerateViewpointsMutation = {
  response: GenerateViewpointsMutation$data;
  variables: GenerateViewpointsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  },
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
        "name": "eventId",
        "variableName": "eventId"
      },
      {
        "kind": "Variable",
        "name": "promptId",
        "variableName": "promptId"
      }
    ],
    "concreteType": "EventFeedbackPromptMutationResponse",
    "kind": "LinkedField",
    "name": "generateViewpoints",
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
                "name": "viewpoints",
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
    "name": "GenerateViewpointsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GenerateViewpointsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7b9953ab2f125fac029457e383839012",
    "id": null,
    "metadata": {},
    "name": "GenerateViewpointsMutation",
    "operationKind": "mutation",
    "text": "mutation GenerateViewpointsMutation(\n  $eventId: ID!\n  $promptId: ID!\n) {\n  generateViewpoints(eventId: $eventId, promptId: $promptId) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        viewpoints\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f1bc33bf93017e833546d010cba4e8b4";

export default node;
