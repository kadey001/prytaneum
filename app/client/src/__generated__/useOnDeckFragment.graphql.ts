/**
 * @generated SignedSource<<ddee1096fa1cdc83d238486524e40d2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useOnDeckFragment$data = {
  readonly currentQuestion: string | null;
  readonly id: string;
  readonly questionQueue: {
    readonly enqueuedQuestions: {
      readonly __id: string;
      readonly edges: ReadonlyArray<{
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
          readonly refQuestion: {
            readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
          } | null;
          readonly topics: ReadonlyArray<{
            readonly description: string;
            readonly position: string;
            readonly topic: string;
          }> | null;
          readonly " $fragmentSpreads": FragmentRefs<"QuestionActionsFragment" | "QuestionAuthorFragment" | "QuestionContentFragment" | "QuestionStatsFragment" | "QuestionTopicsFragment">;
        };
      }> | null;
    } | null;
    readonly questionRecord: {
      readonly __id: string;
      readonly edges: ReadonlyArray<{
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
          readonly refQuestion: {
            readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
          } | null;
          readonly topics: ReadonlyArray<{
            readonly description: string;
            readonly position: string;
            readonly topic: string;
          }> | null;
          readonly " $fragmentSpreads": FragmentRefs<"QuestionActionsFragment" | "QuestionAuthorFragment" | "QuestionContentFragment" | "QuestionStatsFragment" | "QuestionTopicsFragment">;
        };
      }> | null;
    } | null;
  } | null;
  readonly " $fragmentType": "useOnDeckFragment";
};
export type useOnDeckFragment$key = {
  readonly " $data"?: useOnDeckFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useOnDeckFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "lang",
    "variableName": "userLang"
  }
],
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "EventQuestionEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
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
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "question",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lang",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "onDeckPosition",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v0/*: any*/),
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
            "name": "likedByCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isLikedByViewer",
            "storageKey": null
          },
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "QuestionActionsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestionAuthorFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestionStatsFragment"
          },
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "QuestionContentFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestionTopicsFragment"
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
                "args": (v2/*: any*/),
                "kind": "FragmentSpread",
                "name": "QuestionQuoteFragment"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
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
  {
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
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 1000,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "userLang"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "questionQueue",
          "questionRecord"
        ]
      },
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "questionQueue",
          "enqueuedQuestions"
        ]
      }
    ]
  },
  "name": "useOnDeckFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentQuestion",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EventQuestionQueue",
      "kind": "LinkedField",
      "name": "questionQueue",
      "plural": false,
      "selections": [
        {
          "alias": "questionRecord",
          "args": null,
          "concreteType": "EventQuestionConnection",
          "kind": "LinkedField",
          "name": "__useOnDeckFragment_questionRecord_connection",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": null
        },
        {
          "alias": "enqueuedQuestions",
          "args": null,
          "concreteType": "EventQuestionConnection",
          "kind": "LinkedField",
          "name": "__useOnDeckFragment_enqueuedQuestions_connection",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "53c50f0a4bded3ab63dea19e5469038f";

export default node;
