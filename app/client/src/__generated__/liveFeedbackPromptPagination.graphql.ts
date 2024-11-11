/**
 * @generated SignedSource<<c20e24bc3287f1893f68fe67de18f50a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type liveFeedbackPromptPagination$variables = {
  after?: string | null;
  first?: number | null;
  id: string;
};
export type liveFeedbackPromptPagination$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"useLiveFeedbackPromptsFragment">;
  } | null;
};
export type liveFeedbackPromptPagination = {
  response: liveFeedbackPromptPagination$data;
  variables: liveFeedbackPromptPagination$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 100,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "prompt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVote",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOpenEnded",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMultipleChoice",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v11 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v13 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "liveFeedbackPromptPagination",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "useLiveFeedbackPromptsFragment"
          }
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
    "name": "liveFeedbackPromptPagination",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "EventLiveFeedbackPromptConnection",
                "kind": "LinkedField",
                "name": "liveFeedbackPrompts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventLiveFeedbackPromptEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventLiveFeedbackPrompt",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "multipleChoiceOptions",
                            "storageKey": null
                          },
                          (v10/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isDraft",
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
                          },
                          {
                            "alias": null,
                            "args": (v11/*: any*/),
                            "concreteType": "EventLiveFeedbackPromptResponseConnection",
                            "kind": "LinkedField",
                            "name": "responses",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EventLiveFeedbackPromptResponseEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  (v5/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "EventLiveFeedbackPromptResponse",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      (v4/*: any*/),
                                      (v8/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "response",
                                        "storageKey": null
                                      },
                                      (v7/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "vote",
                                        "storageKey": null
                                      },
                                      (v9/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "multipleChoiceResponse",
                                        "storageKey": null
                                      },
                                      (v10/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "createdBy",
                                        "plural": false,
                                        "selections": [
                                          (v4/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "firstName",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "EventLiveFeedbackPrompt",
                                        "kind": "LinkedField",
                                        "name": "prompt",
                                        "plural": false,
                                        "selections": [
                                          (v4/*: any*/),
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v3/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v12/*: any*/),
                              (v13/*: any*/)
                            ],
                            "storageKey": "responses(first:100)"
                          },
                          {
                            "alias": null,
                            "args": (v11/*: any*/),
                            "filters": null,
                            "handle": "connection",
                            "key": "useLiveFeedbackPromptResponsesFragment_responses",
                            "kind": "LinkedHandle",
                            "name": "responses"
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useLiveFeedbackPromptsFragment_liveFeedbackPrompts",
                "kind": "LinkedHandle",
                "name": "liveFeedbackPrompts"
              }
            ],
            "type": "Event",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e64bdb8c36cbbb7b7179066cbee20025",
    "id": null,
    "metadata": {},
    "name": "liveFeedbackPromptPagination",
    "operationKind": "query",
    "text": "query liveFeedbackPromptPagination(\n  $after: String\n  $first: Int = 100\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...useLiveFeedbackPromptsFragment_2HEEH6\n    id\n  }\n}\n\nfragment useLiveFeedbackPromptResponsesFragment on EventLiveFeedbackPrompt {\n  id\n  responses(first: 100) {\n    edges {\n      cursor\n      node {\n        id\n        isOpenEnded\n        response\n        isVote\n        vote\n        isMultipleChoice\n        multipleChoiceResponse\n        createdAt\n        createdBy {\n          id\n          firstName\n        }\n        prompt {\n          id\n          prompt\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useLiveFeedbackPromptsFragment_2HEEH6 on Event {\n  id\n  liveFeedbackPrompts(first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        id\n        prompt\n        isVote\n        isOpenEnded\n        isMultipleChoice\n        multipleChoiceOptions\n        createdAt\n        isDraft\n        viewpoints\n        voteViewpoints\n        ...useLiveFeedbackPromptResponsesFragment\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "03232f20673e50ece1440cd18346be74";

export default node;
