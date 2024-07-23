/**
 * @generated SignedSource<<4f7c0e1b969817ee6062edf208b57591>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ViewLiveFeedbackPromptResultsQuery$variables = {
  promptId: string;
};
export type ViewLiveFeedbackPromptResultsQuery$data = {
  readonly prompt: {
    readonly isMultipleChoice: boolean | null;
    readonly isOpenEnded: boolean | null;
    readonly isVote: boolean | null;
    readonly multipleChoiceOptions: ReadonlyArray<string> | null;
    readonly prompt: string;
    readonly viewpoints: ReadonlyArray<string> | null;
  } | null;
  readonly promptResponseVotes: {
    readonly against: number;
    readonly conflicted: number;
    readonly for: number;
  };
  readonly promptResponses: ReadonlyArray<{
    readonly id: string;
    readonly multipleChoiceResponse: string | null;
    readonly response: string | null;
    readonly vote: string | null;
  }> | null;
};
export type ViewLiveFeedbackPromptResultsQuery = {
  response: ViewLiveFeedbackPromptResultsQuery$data;
  variables: ViewLiveFeedbackPromptResultsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "promptId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "promptId",
    "variableName": "promptId"
  }
],
v2 = {
  "alias": null,
  "args": (v1/*: any*/),
  "concreteType": "Votes",
  "kind": "LinkedField",
  "name": "promptResponseVotes",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "for",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "against",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "conflicted",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": (v1/*: any*/),
  "concreteType": "EventLiveFeedbackPromptResponse",
  "kind": "LinkedField",
  "name": "promptResponses",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "response",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "vote",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "multipleChoiceResponse",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "prompt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVote",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOpenEnded",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMultipleChoice",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "multipleChoiceOptions",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewpoints",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewLiveFeedbackPromptResultsQuery",
    "selections": [
      (v2/*: any*/),
      (v4/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventLiveFeedbackPrompt",
        "kind": "LinkedField",
        "name": "prompt",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewLiveFeedbackPromptResultsQuery",
    "selections": [
      (v2/*: any*/),
      (v4/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventLiveFeedbackPrompt",
        "kind": "LinkedField",
        "name": "prompt",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "048969b8e7c27942718b81d893126ff2",
    "id": null,
    "metadata": {},
    "name": "ViewLiveFeedbackPromptResultsQuery",
    "operationKind": "query",
    "text": "query ViewLiveFeedbackPromptResultsQuery(\n  $promptId: ID!\n) {\n  promptResponseVotes(promptId: $promptId) {\n    for\n    against\n    conflicted\n  }\n  promptResponses(promptId: $promptId) {\n    id\n    response\n    vote\n    multipleChoiceResponse\n  }\n  prompt(promptId: $promptId) {\n    prompt\n    isVote\n    isOpenEnded\n    isMultipleChoice\n    multipleChoiceOptions\n    viewpoints\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "71de19aa145be29e38fc39e67f759283";

export default node;
