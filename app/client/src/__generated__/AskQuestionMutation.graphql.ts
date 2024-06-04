/**
 * @generated SignedSource<<d832292bc37410fe37a1151abd741f43>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateQuestion = {
  eventId: string;
  isFollowUp?: boolean | null;
  isQuote?: boolean | null;
  question: string;
  refQuestion?: string | null;
};
export type AskQuestionMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateQuestion;
  lang: string;
};
export type AskQuestionMutation$data = {
  readonly createQuestion: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly createdBy: {
          readonly firstName: string | null;
        } | null;
        readonly id: string;
        readonly onDeckPosition: string;
        readonly position: string;
        readonly question: string;
        readonly refQuestion: {
          readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
        } | null;
        readonly " $fragmentSpreads": FragmentRefs<"QuestionActionsFragment" | "QuestionAuthorFragment" | "QuestionContentFragment" | "QuestionStatsFragment">;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type AskQuestionMutation$rawResponse = {
  readonly createQuestion: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly createdAt: Date | null;
        readonly createdBy: {
          readonly avatar: string | null;
          readonly firstName: string | null;
          readonly id: string;
          readonly lastName: string | null;
        } | null;
        readonly id: string;
        readonly isLikedByViewer: boolean | null;
        readonly lang: string | null;
        readonly likedByCount: number | null;
        readonly onDeckPosition: string;
        readonly position: string;
        readonly question: string;
        readonly questionTranslated: string | null;
        readonly refQuestion: {
          readonly createdAt: Date | null;
          readonly createdBy: {
            readonly avatar: string | null;
            readonly firstName: string | null;
            readonly id: string;
            readonly lastName: string | null;
          } | null;
          readonly id: string;
          readonly lang: string | null;
          readonly question: string;
          readonly questionTranslated: string | null;
        } | null;
        readonly topics: ReadonlyArray<{
          readonly position: string;
          readonly topic: string;
        }> | null;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type AskQuestionMutation = {
  rawResponse: AskQuestionMutation$rawResponse;
  response: AskQuestionMutation$data;
  variables: AskQuestionMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lang"
},
v3 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "onDeckPosition",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v12 = [
  {
    "kind": "Variable",
    "name": "lang",
    "variableName": "lang"
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lang",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": (v12/*: any*/),
  "kind": "ScalarField",
  "name": "questionTranslated",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AskQuestionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "EventQuestionMutationResponse",
        "kind": "LinkedField",
        "name": "createQuestion",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventQuestion",
                    "kind": "LinkedField",
                    "name": "refQuestion",
                    "plural": false,
                    "selections": [
                      {
                        "args": (v12/*: any*/),
                        "kind": "FragmentSpread",
                        "name": "QuestionQuoteFragment"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "args": (v12/*: any*/),
                    "kind": "FragmentSpread",
                    "name": "QuestionActionsFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionAuthorFragment"
                  },
                  {
                    "args": (v12/*: any*/),
                    "kind": "FragmentSpread",
                    "name": "QuestionContentFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionStatsFragment"
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
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "AskQuestionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "EventQuestionMutationResponse",
        "kind": "LinkedField",
        "name": "createQuestion",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v7/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventQuestion",
                    "kind": "LinkedField",
                    "name": "refQuestion",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "createdBy",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v11/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v8/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLikedByViewer",
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
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "likedByCount",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "body",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "77c5bb343a13f8e18317b60db92173df",
    "id": null,
    "metadata": {},
    "name": "AskQuestionMutation",
    "operationKind": "mutation",
    "text": "mutation AskQuestionMutation(\n  $input: CreateQuestion!\n  $lang: String!\n) {\n  createQuestion(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        question\n        position\n        onDeckPosition\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment_3iqx2P\n          id\n        }\n        ...QuestionActionsFragment_3iqx2P\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment_3iqx2P\n        ...QuestionStatsFragment\n      }\n    }\n  }\n}\n\nfragment DeleteButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment LikeFragment on EventQuestion {\n  id\n  isLikedByViewer\n}\n\nfragment QuestionActionsFragment_3iqx2P on EventQuestion {\n  id\n  ...QuoteFragment_3iqx2P\n  ...LikeFragment\n  ...QueueButtonFragment\n  ...DeleteButtonFragment\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionContentFragment_3iqx2P on EventQuestion {\n  question\n  lang\n  questionTranslated(lang: $lang)\n}\n\nfragment QuestionQuoteFragment_3iqx2P on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_3iqx2P\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n\nfragment QueueButtonFragment on EventQuestion {\n  id\n  question\n  position\n  topics {\n    topic\n    position\n  }\n}\n\nfragment QuoteFragment_3iqx2P on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_3iqx2P\n}\n"
  }
};
})();

(node as any).hash = "7c3a7d79ac764b0dee0304e52fe88b5a";

export default node;
