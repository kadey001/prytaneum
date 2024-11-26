/**
 * @generated SignedSource<<9c11b6aa61d136f2fdb6f0c20dde1f49>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GenerateViewpointsInput = {
  eventId: string;
  isForcedRegenerate?: boolean | null;
  promptId: string;
};
export type GenerateViewpointsMutation$variables = {
  input: GenerateViewpointsInput;
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
    "cacheID": "8741c137667be86ea906e0129ec57f61",
    "id": null,
    "metadata": {},
    "name": "GenerateViewpointsMutation",
    "operationKind": "mutation",
    "text": "mutation GenerateViewpointsMutation(\n  $input: GenerateViewpointsInput!\n) {\n  generateViewpoints(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        viewpoints\n        voteViewpoints\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa89d219734805e1938400df4d0d6d2a";

export default node;
