/**
 * @generated SignedSource<<3da5fb0ba532be053e6f5a2d037fc4e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventLiveNewModeratorViewQuery$variables = {
  eventId: string;
  userLang: string;
};
export type EventLiveNewModeratorViewQuery$data = {
  readonly node: {
    readonly id: string;
    readonly isActive?: boolean | null;
    readonly isPrivate?: boolean | null;
    readonly isViewerModerator?: boolean | null;
    readonly topics?: ReadonlyArray<{
      readonly description: string;
      readonly id: string;
      readonly topic: string;
    }> | null;
    readonly " $fragmentSpreads": FragmentRefs<"QuestionCarouselFragment" | "useEventDetailsFragment" | "useOnDeckFragment" | "useQuestionModQueueFragment" | "useQuestionQueueFragment" | "useQuestionsByTopicFragment" | "useQueueByTopicFragment">;
  } | null;
};
export type EventLiveNewModeratorViewQuery = {
  response: EventLiveNewModeratorViewQuery$data;
  variables: EventLiveNewModeratorViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userLang"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "eventId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isViewerModerator",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isActive",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPrivate",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "topic",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "EventTopic",
  "kind": "LinkedField",
  "name": "topics",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/)
  ],
  "storageKey": null
},
v9 = [
  {
    "kind": "Variable",
    "name": "userLang",
    "variableName": "userLang"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "kind": "Literal",
  "name": "after",
  "value": ""
},
v12 = [
  (v11/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v15/*: any*/),
    (v2/*: any*/),
    (v16/*: any*/),
    (v17/*: any*/)
  ],
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likedByCount",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lang",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "lang",
      "variableName": "userLang"
    }
  ],
  "kind": "ScalarField",
  "name": "questionTranslated",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v15/*: any*/),
    (v16/*: any*/),
    (v17/*: any*/)
  ],
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": "EventQuestion",
  "kind": "LinkedField",
  "name": "refQuestion",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v24/*: any*/),
    (v19/*: any*/),
    (v14/*: any*/),
    (v21/*: any*/),
    (v22/*: any*/)
  ],
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "onDeckPosition",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "EventQuestionTopic",
  "kind": "LinkedField",
  "name": "topics",
  "plural": true,
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/),
    (v23/*: any*/)
  ],
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLikedByViewer",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    (v29/*: any*/),
    (v30/*: any*/)
  ],
  "storageKey": null
},
v32 = {
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
},
v33 = {
  "kind": "Literal",
  "name": "topic",
  "value": "default"
},
v34 = [
  (v11/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  (v33/*: any*/)
],
v35 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "EventQuestionEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      (v13/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "EventQuestion",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v14/*: any*/),
          (v21/*: any*/),
          (v23/*: any*/),
          (v26/*: any*/),
          (v27/*: any*/),
          (v24/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v28/*: any*/),
          (v22/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestion",
            "kind": "LinkedField",
            "name": "refQuestion",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v14/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v24/*: any*/),
              (v19/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/)
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
      (v29/*: any*/),
      (v30/*: any*/)
    ],
    "storageKey": null
  },
  (v32/*: any*/)
],
v36 = [
  "topic"
],
v37 = [
  (v11/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  },
  (v33/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventLiveNewModeratorViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v8/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useEventDetailsFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useQuestionQueueFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "QuestionCarouselFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useQuestionsByTopicFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useQueueByTopicFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useOnDeckFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useQuestionModQueueFragment"
              }
            ],
            "type": "Event",
            "abstractKey": null
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
    "name": "EventLiveNewModeratorViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v10/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startDateTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDateTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isViewerInvited",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "issueGuideUrl",
                "storageKey": null
              },
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
                    "alias": null,
                    "args": (v12/*: any*/),
                    "concreteType": "EventQuestionConnection",
                    "kind": "LinkedField",
                    "name": "questionRecord",
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
                          (v13/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v14/*: any*/),
                              (v18/*: any*/),
                              (v19/*: any*/),
                              (v20/*: any*/),
                              (v21/*: any*/),
                              (v22/*: any*/),
                              (v23/*: any*/),
                              (v25/*: any*/),
                              (v10/*: any*/),
                              (v26/*: any*/),
                              (v27/*: any*/),
                              (v28/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v31/*: any*/),
                      (v32/*: any*/)
                    ],
                    "storageKey": "questionRecord(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v12/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v12/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionCarousel_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v12/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "useOnDeckFragment_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v12/*: any*/),
                    "concreteType": "EventQuestionConnection",
                    "kind": "LinkedField",
                    "name": "enqueuedQuestions",
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
                          (v13/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v14/*: any*/),
                              (v18/*: any*/),
                              (v19/*: any*/),
                              (v21/*: any*/),
                              (v22/*: any*/),
                              (v28/*: any*/),
                              (v23/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EventQuestionTopic",
                                "kind": "LinkedField",
                                "name": "topics",
                                "plural": true,
                                "selections": [
                                  (v6/*: any*/),
                                  (v23/*: any*/),
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v20/*: any*/),
                              (v25/*: any*/),
                              (v10/*: any*/),
                              (v26/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v31/*: any*/),
                      (v32/*: any*/)
                    ],
                    "storageKey": "enqueuedQuestions(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v12/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_enqueuedQuestions",
                    "kind": "LinkedHandle",
                    "name": "enqueuedQuestions"
                  },
                  {
                    "alias": null,
                    "args": (v12/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "useOnDeckFragment_enqueuedQuestions",
                    "kind": "LinkedHandle",
                    "name": "enqueuedQuestions"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v34/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "questionsByTopic",
                "plural": false,
                "selections": (v35/*: any*/),
                "storageKey": "questionsByTopic(after:\"\",first:50,topic:\"default\")"
              },
              {
                "alias": null,
                "args": (v34/*: any*/),
                "filters": (v36/*: any*/),
                "handle": "connection",
                "key": "useQuestionsByTopicFragment_questionsByTopic",
                "kind": "LinkedHandle",
                "name": "questionsByTopic"
              },
              {
                "alias": null,
                "args": (v37/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "topicQueue",
                "plural": false,
                "selections": (v35/*: any*/),
                "storageKey": "topicQueue(after:\"\",first:500,topic:\"default\")"
              },
              {
                "alias": null,
                "args": (v37/*: any*/),
                "filters": (v36/*: any*/),
                "handle": "connection",
                "key": "useQueueByTopicFragment_topicQueue",
                "kind": "LinkedHandle",
                "name": "topicQueue"
              },
              {
                "alias": null,
                "args": (v12/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "questionModQueue",
                "plural": false,
                "selections": (v35/*: any*/),
                "storageKey": "questionModQueue(after:\"\",first:1000)"
              },
              {
                "alias": null,
                "args": (v12/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useQuestionModQueueFragment_questionModQueue",
                "kind": "LinkedHandle",
                "name": "questionModQueue"
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
    "cacheID": "7e03ca16e781c4e3580211f2d8e5a2b3",
    "id": null,
    "metadata": {},
    "name": "EventLiveNewModeratorViewQuery",
    "operationKind": "query",
    "text": "query EventLiveNewModeratorViewQuery(\n  $eventId: ID!\n  $userLang: String!\n) {\n  node(id: $eventId) {\n    __typename\n    id\n    ... on Event {\n      isViewerModerator\n      isActive\n      isPrivate\n      topics {\n        id\n        topic\n        description\n      }\n      ...useEventDetailsFragment\n      ...useQuestionQueueFragment_2ktdWx\n      ...QuestionCarouselFragment_2ktdWx\n      ...useQuestionsByTopicFragment_2ktdWx\n      ...useQueueByTopicFragment_2ktdWx\n      ...useOnDeckFragment_2ktdWx\n      ...useQuestionModQueueFragment_2ktdWx\n    }\n  }\n}\n\nfragment DeleteButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment LikeFragment on EventQuestion {\n  id\n  isLikedByViewer\n}\n\nfragment QuestionActionsFragment_43mCLt on EventQuestion {\n  id\n  ...QuoteFragment_43mCLt\n  ...LikeFragment\n  ...QueueButtonFragment\n  ...DeleteButtonFragment\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionCarouselFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          position\n          ...QuestionAuthorFragment\n          ...QuestionContentFragment_43mCLt\n          refQuestion {\n            ...QuestionQuoteFragment_43mCLt\n            id\n          }\n          id\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment QuestionContentFragment_43mCLt on EventQuestion {\n  question\n  lang\n  questionTranslated(lang: $userLang)\n}\n\nfragment QuestionQuoteFragment_43mCLt on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_43mCLt\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n\nfragment QuestionTopicsFragment on EventQuestion {\n  topics {\n    topic\n    description\n    position\n  }\n}\n\nfragment QueueButtonFragment on EventQuestion {\n  id\n  question\n  position\n  topics {\n    topic\n    position\n  }\n}\n\nfragment QuoteFragment_43mCLt on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_43mCLt\n}\n\nfragment useEventDetailsFragment on Event {\n  id\n  title\n  topic\n  description\n  startDateTime\n  endDateTime\n  isActive\n  isViewerModerator\n  isPrivate\n  isViewerInvited\n  issueGuideUrl\n  topics {\n    id\n    topic\n    description\n  }\n}\n\nfragment useOnDeckFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          lang\n          position\n          onDeckPosition\n          topics {\n            topic\n            description\n            position\n          }\n          createdBy {\n            id\n            firstName\n            lastName\n            avatar\n          }\n          createdAt\n          likedByCount\n          isLikedByViewer\n          ...QuestionActionsFragment_43mCLt\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_43mCLt\n          ...QuestionTopicsFragment\n          refQuestion {\n            id\n            question\n            lang\n            questionTranslated(lang: $userLang)\n            createdBy {\n              id\n              firstName\n              lastName\n              avatar\n            }\n            createdAt\n            ...QuestionQuoteFragment_43mCLt\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    enqueuedQuestions(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          lang\n          position\n          onDeckPosition\n          topics {\n            topic\n            description\n            position\n          }\n          createdBy {\n            id\n            firstName\n            lastName\n            avatar\n          }\n          createdAt\n          likedByCount\n          isLikedByViewer\n          ...QuestionActionsFragment_43mCLt\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_43mCLt\n          ...QuestionTopicsFragment\n          refQuestion {\n            id\n            question\n            lang\n            questionTranslated(lang: $userLang)\n            createdBy {\n              id\n              firstName\n              lastName\n              avatar\n            }\n            createdAt\n            ...QuestionQuoteFragment_43mCLt\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useQuestionModQueueFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionModQueue(first: 1000, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        lang\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          id\n          firstName\n          lastName\n          avatar\n        }\n        createdAt\n        likedByCount\n        isLikedByViewer\n        ...QuestionActionsFragment_43mCLt\n        ...QuestionAuthorFragment\n        ...QuestionStatsFragment\n        ...QuestionContentFragment_43mCLt\n        ...QuestionTopicsFragment\n        refQuestion {\n          id\n          question\n          lang\n          questionTranslated(lang: $userLang)\n          createdBy {\n            id\n            firstName\n            lastName\n            avatar\n          }\n          createdAt\n          ...QuestionQuoteFragment_43mCLt\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useQuestionQueueFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_43mCLt\n          position\n          refQuestion {\n            ...QuestionQuoteFragment_43mCLt\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    enqueuedQuestions(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionActionsFragment_43mCLt\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_43mCLt\n          position\n          refQuestion {\n            ...QuestionQuoteFragment_43mCLt\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useQuestionsByTopicFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionsByTopic(first: 50, after: \"\", topic: \"default\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        lang\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          id\n          firstName\n          lastName\n          avatar\n        }\n        createdAt\n        likedByCount\n        isLikedByViewer\n        ...QuestionActionsFragment_43mCLt\n        ...QuestionAuthorFragment\n        ...QuestionStatsFragment\n        ...QuestionContentFragment_43mCLt\n        ...QuestionTopicsFragment\n        refQuestion {\n          id\n          question\n          lang\n          questionTranslated(lang: $userLang)\n          createdBy {\n            id\n            firstName\n            lastName\n            avatar\n          }\n          createdAt\n          ...QuestionQuoteFragment_43mCLt\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useQueueByTopicFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  topicQueue(first: 500, after: \"\", topic: \"default\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        lang\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          id\n          firstName\n          lastName\n          avatar\n        }\n        createdAt\n        likedByCount\n        isLikedByViewer\n        ...QuestionActionsFragment_43mCLt\n        ...QuestionAuthorFragment\n        ...QuestionStatsFragment\n        ...QuestionContentFragment_43mCLt\n        ...QuestionTopicsFragment\n        refQuestion {\n          id\n          question\n          lang\n          questionTranslated(lang: $userLang)\n          createdBy {\n            id\n            firstName\n            lastName\n            avatar\n          }\n          createdAt\n          ...QuestionQuoteFragment_43mCLt\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a056d4535be8d1b717007cd9706dc212";

export default node;
