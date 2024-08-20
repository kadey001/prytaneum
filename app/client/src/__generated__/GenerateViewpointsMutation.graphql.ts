/**
 * @generated SignedSource<<9c61f1eaeb363806f7d6113fa7083e21>>
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
        readonly voteViewpoints: any | null;
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "voteViewpoints",
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
    "cacheID": "55957d2a7f9961a532cccf203f1ffd54",
    "id": null,
    "metadata": {},
    "name": "GenerateViewpointsMutation",
    "operationKind": "mutation",
    "text": "mutation GenerateViewpointsMutation(\n  $eventId: ID!\n  $promptId: ID!\n) {\n  generateViewpoints(eventId: $eventId, promptId: $promptId) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        viewpoints\n        voteViewpoints\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d7273e1d4da70155aea5937e5caabedc";

export default node;
