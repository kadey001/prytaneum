/**
 * @generated SignedSource<<2e40deb3d39785a3646803b71c0484a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useQuestionModQueueFragment$data = {
  readonly currentQuestion: string | null;
  readonly id: string;
  readonly questionModQueue: {
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
    readonly pageInfo: {
      readonly endCursor: string | null;
      readonly startCursor: string | null;
    };
  } | null;
  readonly " $fragmentType": "useQuestionModQueueFragment";
};
export type useQuestionModQueueFragment$key = {
  readonly " $data"?: useQuestionModQueueFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useQuestionModQueueFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "questionModQueue"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "lang",
    "variableName": "userLang"
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
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./questionModQueuePagination.graphql'),
      "identifierField": "id"
    }
  },
  "name": "useQuestionModQueueFragment",
  "selections": [
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentQuestion",
      "storageKey": null
    },
    {
      "alias": "questionModQueue",
      "args": null,
      "concreteType": "EventQuestionConnection",
      "kind": "LinkedField",
      "name": "__useQuestionModQueueFragment_questionModQueue_connection",
      "plural": false,
      "selections": [
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
                (v1/*: any*/),
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
                (v2/*: any*/),
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
                    (v2/*: any*/)
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
                    (v1/*: any*/),
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
                  "args": (v3/*: any*/),
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
                  "args": (v3/*: any*/),
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
                      "args": (v3/*: any*/),
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
              "name": "startCursor",
              "storageKey": null
            },
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
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "129f5816b12ff309c616d367f3d8ab40";

export default node;
