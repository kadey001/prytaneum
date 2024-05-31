/**
 * @generated SignedSource<<a27be8ab62fe778f973e1f77c9c99b9a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useViewerOnlyQuestionUpdatedSubscription$variables = {
  eventId: string;
  lang: string;
  viewerOnly?: boolean | null;
};
export type useViewerOnlyQuestionUpdatedSubscription$data = {
  readonly questionUpdated: {
    readonly edge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly position: string;
        readonly " $fragmentSpreads": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment" | "QuestionStatsFragment">;
      };
    };
  };
};
export type useViewerOnlyQuestionUpdatedSubscription = {
  response: useViewerOnlyQuestionUpdatedSubscription$data;
  variables: useViewerOnlyQuestionUpdatedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lang"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "viewerOnly"
},
v3 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  },
  {
    "kind": "Variable",
    "name": "viewerOnly",
    "variableName": "viewerOnly"
  }
],
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
  "name": "position",
  "storageKey": null
},
v7 = [
  {
    "kind": "Variable",
    "name": "lang",
    "variableName": "lang"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useViewerOnlyQuestionUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "questionUpdated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "edge",
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
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionAuthorFragment"
                  },
                  {
                    "args": (v7/*: any*/),
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "useViewerOnlyQuestionUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "questionUpdated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "edge",
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
                  {
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
                  {
                    "alias": null,
                    "args": (v7/*: any*/),
                    "kind": "ScalarField",
                    "name": "questionTranslated",
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
    "cacheID": "4c42bfb6ae162b09c9864689b011270e",
    "id": null,
    "metadata": {},
    "name": "useViewerOnlyQuestionUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription useViewerOnlyQuestionUpdatedSubscription(\n  $eventId: ID!\n  $viewerOnly: Boolean\n  $lang: String!\n) {\n  questionUpdated(eventId: $eventId, viewerOnly: $viewerOnly) {\n    edge {\n      cursor\n      node {\n        id\n        position\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment_3iqx2P\n        ...QuestionStatsFragment\n      }\n    }\n  }\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionContentFragment_3iqx2P on EventQuestion {\n  question\n  lang\n  questionTranslated(lang: $lang)\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n"
  }
};
})();

(node as any).hash = "59419d88b290440fe91ea7e0cf154733";

export default node;
