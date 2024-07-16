/**
 * @generated SignedSource<<25544f616efb4a8cd317fcda83c0a5f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type LiveFeedbackPromptListQuery$variables = {
  eventId: string;
};
export type LiveFeedbackPromptListQuery$data = {
  readonly prompts: ReadonlyArray<{
    readonly createdAt: Date | null;
    readonly id: string;
    readonly isDraft: boolean | null;
    readonly isMultipleChoice: boolean | null;
    readonly isOpenEnded: boolean | null;
    readonly isVote: boolean | null;
    readonly multipleChoiceOptions: ReadonlyArray<string> | null;
    readonly prompt: string;
  }> | null;
};
export type LiveFeedbackPromptListQuery = {
  response: LiveFeedbackPromptListQuery$data;
  variables: LiveFeedbackPromptListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
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
      }
    ],
    "concreteType": "EventLiveFeedbackPrompt",
    "kind": "LinkedField",
    "name": "prompts",
    "plural": true,
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
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isDraft",
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
    "name": "LiveFeedbackPromptListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveFeedbackPromptListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "64a08e29ef45a98e69780a5f92f8e6c6",
    "id": null,
    "metadata": {},
    "name": "LiveFeedbackPromptListQuery",
    "operationKind": "query",
    "text": "query LiveFeedbackPromptListQuery(\n  $eventId: ID!\n) {\n  prompts(eventId: $eventId) {\n    id\n    prompt\n    isVote\n    isOpenEnded\n    isMultipleChoice\n    multipleChoiceOptions\n    createdAt\n    isDraft\n  }\n}\n"
  }
};
})();

(node as any).hash = "819cd55290e3a4e76fc35973d5359334";

export default node;
