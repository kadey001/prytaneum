/**
 * @generated SignedSource<<7c4d616cb898cd7485d26524352fe74d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useViewerOnlyQuestionCreatedSubscription$variables = {
  connections: ReadonlyArray<string>;
  eventId: string;
  lang: string;
  viewerOnly?: boolean | null;
};
export type useViewerOnlyQuestionCreatedSubscription$data = {
  readonly questionCreated: {
    readonly edge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly isVisible: boolean;
        readonly position: string;
        readonly refQuestion: {
          readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
        } | null;
        readonly " $fragmentSpreads": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment" | "QuestionStatsFragment">;
      };
    };
  };
};
export type useViewerOnlyQuestionCreatedSubscription = {
  response: useViewerOnlyQuestionCreatedSubscription$data;
  variables: useViewerOnlyQuestionCreatedSubscription$variables;
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
  "name": "eventId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lang"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "viewerOnly"
},
v4 = [
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
  "name": "id",
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
  "name": "isVisible",
  "storageKey": null
},
v9 = [
  {
    "kind": "Variable",
    "name": "lang",
    "variableName": "lang"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v6/*: any*/),
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
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lang",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": (v9/*: any*/),
  "kind": "ScalarField",
  "name": "questionTranslated",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useViewerOnlyQuestionCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "questionCreated",
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
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionAuthorFragment"
                  },
                  {
                    "args": (v9/*: any*/),
                    "kind": "FragmentSpread",
                    "name": "QuestionContentFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionStatsFragment"
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
                        "args": (v9/*: any*/),
                        "kind": "FragmentSpread",
                        "name": "QuestionQuoteFragment"
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
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "useViewerOnlyQuestionCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "questionCreated",
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
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
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
                    "concreteType": "EventQuestion",
                    "kind": "LinkedField",
                    "name": "refQuestion",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/)
                    ],
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
            "name": "edge",
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
    "cacheID": "b60e6414897400c090f11de23836aa63",
    "id": null,
    "metadata": {},
    "name": "useViewerOnlyQuestionCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription useViewerOnlyQuestionCreatedSubscription(\n  $eventId: ID!\n  $viewerOnly: Boolean\n  $lang: String!\n) {\n  questionCreated(eventId: $eventId, viewerOnly: $viewerOnly) {\n    edge {\n      cursor\n      node {\n        id\n        position\n        isVisible\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment_3iqx2P\n        ...QuestionStatsFragment\n        refQuestion {\n          ...QuestionQuoteFragment_3iqx2P\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionContentFragment_3iqx2P on EventQuestion {\n  question\n  lang\n  questionTranslated(lang: $lang)\n}\n\nfragment QuestionQuoteFragment_3iqx2P on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_3iqx2P\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n"
  }
};
})();

(node as any).hash = "4a2a889f3c1f2e2e850403d4427ca5ef";

export default node;
