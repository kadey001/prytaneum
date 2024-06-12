/**
 * @generated SignedSource<<95992348eedb3668522b3b710f7876a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddQuestionToOnDeck = {
  eventId: string;
  newPosition: string;
  questionId: string;
};
export type useOnDeckEnqueuedMutation$variables = {
  input: AddQuestionToOnDeck;
  lang: string;
};
export type useOnDeckEnqueuedMutation$data = {
  readonly addQuestionToOnDeck: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly onDeckPosition: string;
        readonly position: string;
        readonly question: string;
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
          readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
        } | null;
        readonly " $fragmentSpreads": FragmentRefs<"QuestionActionsFragment" | "QuestionAuthorFragment" | "QuestionContentFragment" | "QuestionStatsFragment" | "QuestionTopicsFragment">;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "lang"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "onDeckPosition",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lang",
  "storageKey": null
},
v10 = [
  {
    "kind": "Variable",
    "name": "lang",
    "variableName": "lang"
  }
],
v11 = {
  "alias": null,
  "args": (v10/*: any*/),
  "kind": "ScalarField",
  "name": "questionTranslated",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useOnDeckEnqueuedMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestionMutationResponse",
        "kind": "LinkedField",
        "name": "addQuestionToOnDeck",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventQuestion",
                    "kind": "LinkedField",
                    "name": "refQuestion",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v9/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      {
                        "args": (v10/*: any*/),
                        "kind": "FragmentSpread",
                        "name": "QuestionQuoteFragment"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "args": (v10/*: any*/),
                    "kind": "FragmentSpread",
                    "name": "QuestionActionsFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionAuthorFragment"
                  },
                  {
                    "args": (v10/*: any*/),
                    "kind": "FragmentSpread",
                    "name": "QuestionContentFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionStatsFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionTopicsFragment"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useOnDeckEnqueuedMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestionMutationResponse",
        "kind": "LinkedField",
        "name": "addQuestionToOnDeck",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventQuestion",
                    "kind": "LinkedField",
                    "name": "refQuestion",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v9/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v9/*: any*/),
                  (v11/*: any*/),
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
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      }
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1df32953112f1a98012a745ec094876c",
    "id": null,
    "metadata": {},
    "name": "useOnDeckEnqueuedMutation",
    "operationKind": "mutation",
    "text": "mutation useOnDeckEnqueuedMutation(\n  $input: AddQuestionToOnDeck!\n  $lang: String!\n) {\n  addQuestionToOnDeck(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        question\n        position\n        onDeckPosition\n        refQuestion {\n          id\n          question\n          lang\n          questionTranslated(lang: $lang)\n          createdBy {\n            id\n            firstName\n            lastName\n            avatar\n          }\n          createdAt\n          ...QuestionQuoteFragment_3iqx2P\n        }\n        ...QuestionActionsFragment_3iqx2P\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment_3iqx2P\n        ...QuestionStatsFragment\n        ...QuestionTopicsFragment\n      }\n    }\n  }\n}\n\nfragment DeleteButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment LikeFragment on EventQuestion {\n  id\n  isLikedByViewer\n}\n\nfragment QuestionActionsFragment_3iqx2P on EventQuestion {\n  id\n  ...QuoteFragment_3iqx2P\n  ...LikeFragment\n  ...QueueButtonFragment\n  ...DeleteButtonFragment\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionContentFragment_3iqx2P on EventQuestion {\n  question\n  lang\n  questionTranslated(lang: $lang)\n}\n\nfragment QuestionQuoteFragment_3iqx2P on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_3iqx2P\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n\nfragment QuestionTopicsFragment on EventQuestion {\n  topics {\n    topic\n    description\n    position\n  }\n}\n\nfragment QueueButtonFragment on EventQuestion {\n  id\n  question\n  position\n  topics {\n    topic\n    position\n  }\n}\n\nfragment QuoteFragment_3iqx2P on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_3iqx2P\n}\n"
  }
};
})();

(node as any).hash = "07f038ddd553c4c5c7af146c45f4a764";

export default node;
