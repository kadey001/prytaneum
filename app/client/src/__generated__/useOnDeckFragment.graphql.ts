/**
 * @generated SignedSource<<d07879cdcbe40e01501a4eada6c36195>>
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
            "args": null,
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestionContentFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestionTopicsFragment"
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
            "concreteType": "EventQuestion",
            "kind": "LinkedField",
            "name": "refQuestion",
            "plural": false,
            "selections": [
              {
                "args": null,
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
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": "enqueuedQuestions",
          "args": null,
          "concreteType": "EventQuestionConnection",
          "kind": "LinkedField",
          "name": "__useOnDeckFragment_enqueuedQuestions_connection",
          "plural": false,
          "selections": (v2/*: any*/),
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

(node as any).hash = "d8e6cf9c6a65147e2723e0cae47901b6";

export default node;
