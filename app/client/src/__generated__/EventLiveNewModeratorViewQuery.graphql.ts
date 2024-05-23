/**
 * @generated SignedSource<<264ee74d382e4f11f7ee0f9a1a378689>>
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
    readonly " $fragmentSpreads": FragmentRefs<"EventVideoFragment" | "QuestionCarouselFragment" | "SpeakerListFragment" | "useBroadcastMessageListFragment" | "useEventDetailsFragment" | "useLiveFeedbackListFragment" | "useOnDeckFragment" | "useQuestionModQueueFragment" | "useQuestionQueueFragment" | "useQuestionsByTopicFragment" | "useQueueByTopicFragment">;
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
    "name": "eventId",
    "variableName": "eventId"
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
    "value": 50
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
  "name": "firstName",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v14/*: any*/),
    (v2/*: any*/),
    (v15/*: any*/),
    (v16/*: any*/)
  ],
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
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
  "name": "endCursor",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v22 = {
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
    (v20/*: any*/),
    (v21/*: any*/)
  ],
  "storageKey": null
},
v23 = {
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
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v25 = [
  (v11/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  }
],
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likedByCount",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "concreteType": "EventQuestion",
  "kind": "LinkedField",
  "name": "refQuestion",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/)
      ],
      "storageKey": null
    },
    (v19/*: any*/),
    (v26/*: any*/)
  ],
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "concreteType": "EventQuestionTopic",
  "kind": "LinkedField",
  "name": "topics",
  "plural": true,
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/),
    (v18/*: any*/)
  ],
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "onDeckPosition",
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
    (v20/*: any*/),
    (v21/*: any*/)
  ],
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLikedByViewer",
  "storageKey": null
},
v33 = [
  (v11/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v14/*: any*/),
    {
      "alias": null,
      "args": (v9/*: any*/),
      "kind": "ScalarField",
      "name": "moderatorOf",
      "storageKey": null
    },
    (v15/*: any*/),
    (v16/*: any*/)
  ],
  "storageKey": null
},
v36 = [
  (v11/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  },
  {
    "kind": "Literal",
    "name": "topic",
    "value": "default"
  }
],
v37 = [
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
          (v26/*: any*/),
          (v18/*: any*/),
          (v30/*: any*/),
          (v29/*: any*/),
          (v17/*: any*/),
          (v28/*: any*/),
          (v19/*: any*/),
          (v32/*: any*/),
          (v27/*: any*/),
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v22/*: any*/),
  (v23/*: any*/)
],
v38 = [
  "topic"
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
                "name": "useBroadcastMessageListFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EventVideoFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useEventDetailsFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SpeakerListFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useQuestionQueueFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "QuestionCarouselFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useLiveFeedbackListFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useQuestionsByTopicFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useQueueByTopicFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useOnDeckFragment"
              },
              {
                "args": null,
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
                "name": "currentBroadcastMessage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v12/*: any*/),
                "concreteType": "EventBroadcastMessagesConnection",
                "kind": "LinkedField",
                "name": "broadcastMessages",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventBroadcastMessageEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v13/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventBroadcastMessage",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "broadcastMessage",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isVisible",
                            "storageKey": null
                          },
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v22/*: any*/),
                  (v23/*: any*/)
                ],
                "storageKey": "broadcastMessages(after:\"\",first:50)"
              },
              {
                "alias": null,
                "args": (v12/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useBroadcastMessageListFragment_broadcastMessages",
                "kind": "LinkedHandle",
                "name": "broadcastMessages"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EventVideoConnection",
                "kind": "LinkedField",
                "name": "videos",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventVideoEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v13/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventVideo",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lang",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v24/*: any*/),
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
                "concreteType": "EventSpeakerConnection",
                "kind": "LinkedField",
                "name": "speakers",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventSpeakerEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventSpeaker",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "pictureUrl",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v7/*: any*/),
                          (v24/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
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
                    "args": (v25/*: any*/),
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
                              (v26/*: any*/),
                              (v17/*: any*/),
                              (v19/*: any*/),
                              (v27/*: any*/),
                              (v18/*: any*/),
                              (v28/*: any*/),
                              (v10/*: any*/),
                              (v29/*: any*/),
                              (v30/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v31/*: any*/),
                      (v23/*: any*/)
                    ],
                    "storageKey": "questionRecord(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v25/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v25/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionCarousel_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v25/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "useOnDeckFragment_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v25/*: any*/),
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
                              (v26/*: any*/),
                              (v17/*: any*/),
                              (v19/*: any*/),
                              (v32/*: any*/),
                              (v18/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EventQuestionTopic",
                                "kind": "LinkedField",
                                "name": "topics",
                                "plural": true,
                                "selections": [
                                  (v6/*: any*/),
                                  (v18/*: any*/),
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v27/*: any*/),
                              (v28/*: any*/),
                              (v10/*: any*/),
                              (v30/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v31/*: any*/),
                      (v23/*: any*/)
                    ],
                    "storageKey": "enqueuedQuestions(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v25/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_enqueuedQuestions",
                    "kind": "LinkedHandle",
                    "name": "enqueuedQuestions"
                  },
                  {
                    "alias": null,
                    "args": (v25/*: any*/),
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
                "args": (v33/*: any*/),
                "concreteType": "EventLiveFeedbackConnection",
                "kind": "LinkedField",
                "name": "liveFeedback",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventLiveFeedbackEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v13/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventLiveFeedback",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventLiveFeedback",
                            "kind": "LinkedField",
                            "name": "refFeedback",
                            "plural": false,
                            "selections": [
                              (v35/*: any*/),
                              (v2/*: any*/),
                              (v34/*: any*/),
                              (v19/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v19/*: any*/),
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v31/*: any*/),
                  (v23/*: any*/)
                ],
                "storageKey": "liveFeedback(after:\"\",first:100)"
              },
              {
                "alias": null,
                "args": (v33/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useLiveFeedbackListFragment_liveFeedback",
                "kind": "LinkedHandle",
                "name": "liveFeedback"
              },
              {
                "alias": null,
                "args": (v36/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "questions",
                "plural": false,
                "selections": (v37/*: any*/),
                "storageKey": "questions(after:\"\",first:500,topic:\"default\")"
              },
              {
                "alias": null,
                "args": (v36/*: any*/),
                "filters": (v38/*: any*/),
                "handle": "connection",
                "key": "useQuestionsByTopicFragment_questions",
                "kind": "LinkedHandle",
                "name": "questions"
              },
              {
                "alias": null,
                "args": (v36/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "topicQueue",
                "plural": false,
                "selections": (v37/*: any*/),
                "storageKey": "topicQueue(after:\"\",first:500,topic:\"default\")"
              },
              {
                "alias": null,
                "args": (v36/*: any*/),
                "filters": (v38/*: any*/),
                "handle": "connection",
                "key": "useQueueByTopicFragment_topicQueue",
                "kind": "LinkedHandle",
                "name": "topicQueue"
              },
              {
                "alias": null,
                "args": (v25/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "questionModQueue",
                "plural": false,
                "selections": (v37/*: any*/),
                "storageKey": "questionModQueue(after:\"\",first:1000)"
              },
              {
                "alias": null,
                "args": (v25/*: any*/),
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
    "cacheID": "0b7582859c5ee53ac3fad92b9dfdf49b",
    "id": null,
    "metadata": {},
    "name": "EventLiveNewModeratorViewQuery",
    "operationKind": "query",
    "text": "query EventLiveNewModeratorViewQuery(\n  $eventId: ID!\n) {\n  node(id: $eventId) {\n    __typename\n    id\n    ... on Event {\n      isViewerModerator\n      isActive\n      isPrivate\n      topics {\n        id\n        topic\n        description\n      }\n      ...useBroadcastMessageListFragment\n      ...EventVideoFragment\n      ...useEventDetailsFragment\n      ...SpeakerListFragment\n      ...useQuestionQueueFragment\n      ...QuestionCarouselFragment\n      ...useLiveFeedbackListFragment_32qNee\n      ...useQuestionsByTopicFragment\n      ...useQueueByTopicFragment\n      ...useOnDeckFragment\n      ...useQuestionModQueueFragment\n    }\n  }\n}\n\nfragment BroadcastMessageActionsFragment on EventBroadcastMessage {\n  id\n  ...DeleteBroadcastMessageButtonFragment\n  ...EditBroadcastMessageButtonFragment\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment on EventBroadcastMessage {\n  broadcastMessage\n}\n\nfragment DeleteBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n  position\n}\n\nfragment DeleteButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment EditBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n}\n\nfragment EventVideoFragment on Event {\n  videos {\n    edges {\n      cursor\n      node {\n        url\n        lang\n        id\n      }\n    }\n  }\n  id\n}\n\nfragment LikeFragment on EventQuestion {\n  id\n  isLikedByViewer\n}\n\nfragment LiveFeedbackAuthorFragment_32qNee on EventLiveFeedback {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n    moderatorOf(eventId: $eventId)\n  }\n  createdAt\n}\n\nfragment LiveFeedbackReplyFragment_32qNee on EventLiveFeedback {\n  id\n  message\n  ...LiveFeedbackAuthorFragment_32qNee\n}\n\nfragment QuestionActionsFragment on EventQuestion {\n  id\n  ...QuoteFragment\n  ...LikeFragment\n  ...QueueButtonFragment\n  ...DeleteButtonFragment\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionCarouselFragment on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          position\n          ...QuestionAuthorFragment\n          ...QuestionContentFragment\n          refQuestion {\n            ...QuestionQuoteFragment\n            id\n          }\n          id\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment QuestionContentFragment on EventQuestion {\n  question\n}\n\nfragment QuestionQuoteFragment on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n\nfragment QueueButtonFragment on EventQuestion {\n  id\n  question\n  position\n  topics {\n    topic\n    position\n  }\n}\n\nfragment QuoteFragment on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment\n}\n\nfragment SpeakerListFragment on Event {\n  speakers {\n    edges {\n      node {\n        id\n        pictureUrl\n        name\n        description\n        title\n      }\n      cursor\n    }\n  }\n  id\n}\n\nfragment useBroadcastMessageListFragment on Event {\n  id\n  currentBroadcastMessage\n  broadcastMessages(first: 50, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        broadcastMessage\n        isVisible\n        createdBy {\n          firstName\n          id\n        }\n        ...BroadcastMessageActionsFragment\n        ...BroadcastMessageAuthorFragment\n        ...BroadcastMessageContentFragment\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useEventDetailsFragment on Event {\n  id\n  title\n  topic\n  description\n  startDateTime\n  endDateTime\n  isActive\n  isViewerModerator\n  isPrivate\n  isViewerInvited\n  issueGuideUrl\n  topics {\n    id\n    topic\n    description\n  }\n}\n\nfragment useLiveFeedbackListFragment_32qNee on Event {\n  id\n  liveFeedback(first: 100, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        message\n        createdBy {\n          id\n          firstName\n          moderatorOf(eventId: $eventId)\n        }\n        refFeedback {\n          createdBy {\n            id\n            firstName\n            moderatorOf(eventId: $eventId)\n          }\n          ...LiveFeedbackReplyFragment_32qNee\n          id\n        }\n        ...LiveFeedbackReplyFragment_32qNee\n        ...LiveFeedbackAuthorFragment_32qNee\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useOnDeckFragment on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          topics {\n            topic\n            description\n            position\n          }\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment\n          position\n          onDeckPosition\n          refQuestion {\n            ...QuestionQuoteFragment\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    enqueuedQuestions(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          topics {\n            topic\n            description\n            position\n          }\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionActionsFragment\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment\n          position\n          onDeckPosition\n          refQuestion {\n            ...QuestionQuoteFragment\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useQuestionModQueueFragment on Event {\n  id\n  currentQuestion\n  questionModQueue(first: 1000, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment\n          id\n        }\n        ...QuestionActionsFragment\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment\n        ...QuestionStatsFragment\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useQuestionQueueFragment on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment\n          position\n          refQuestion {\n            ...QuestionQuoteFragment\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    enqueuedQuestions(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionActionsFragment\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment\n          position\n          refQuestion {\n            ...QuestionQuoteFragment\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useQuestionsByTopicFragment on Event {\n  id\n  currentQuestion\n  questions(first: 500, after: \"\", topic: \"default\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment\n          id\n        }\n        ...QuestionActionsFragment\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment\n        ...QuestionStatsFragment\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useQueueByTopicFragment on Event {\n  id\n  currentQuestion\n  topicQueue(first: 500, after: \"\", topic: \"default\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment\n          id\n        }\n        ...QuestionActionsFragment\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment\n        ...QuestionStatsFragment\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0e375134abc1f442ead0a16c2bd7937a";

export default node;
