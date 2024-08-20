/**
 * @generated SignedSource<<e7aa78350e7cf387e99030aca02ebd38>>
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
    readonly createdAt: Date | null;
    readonly id: string;
    readonly isMultipleChoice: boolean | null;
    readonly isOpenEnded: boolean | null;
    readonly isVote: boolean | null;
    readonly multipleChoiceOptions: ReadonlyArray<string> | null;
    readonly prompt: string;
    readonly viewpoints: ReadonlyArray<string> | null;
    readonly voteViewpoints: any | null;
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
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
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
  {
    "alias": null,
    "args": (v1/*: any*/),
    "concreteType": "EventLiveFeedbackPromptResponse",
    "kind": "LinkedField",
    "name": "promptResponses",
    "plural": true,
    "selections": [
      (v2/*: any*/),
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
  {
    "alias": null,
    "args": (v1/*: any*/),
    "concreteType": "EventLiveFeedbackPrompt",
    "kind": "LinkedField",
    "name": "prompt",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "prompt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isVote",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isOpenEnded",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isMultipleChoice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "multipleChoiceOptions",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewLiveFeedbackPromptResultsQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewLiveFeedbackPromptResultsQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "649bd81a02e78de6763fe1213230e522",
    "id": null,
    "metadata": {},
    "name": "ViewLiveFeedbackPromptResultsQuery",
    "operationKind": "query",
    "text": "query ViewLiveFeedbackPromptResultsQuery(\n  $promptId: ID!\n) {\n  promptResponseVotes(promptId: $promptId) {\n    for\n    against\n    conflicted\n  }\n  promptResponses(promptId: $promptId) {\n    id\n    response\n    vote\n    multipleChoiceResponse\n  }\n  prompt(promptId: $promptId) {\n    id\n    createdAt\n    prompt\n    isVote\n    isOpenEnded\n    isMultipleChoice\n    multipleChoiceOptions\n    viewpoints\n    voteViewpoints\n  }\n}\n"
  }
};
})();

(node as any).hash = "a77dbf709b05e05744490ec72faf5366";

export default node;
