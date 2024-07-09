/**
 * @generated SignedSource<<321ba3465896568059a6bf7b589b8a94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventLiveQuery$variables = {
  eventId: string;
  lang: string;
};
export type EventLiveQuery$data = {
  readonly node: {
    readonly id: string;
    readonly isViewerModerator?: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"EventSidebarFragment" | "EventVideoFragment" | "SpeakerListFragment" | "useBroadcastMessageListFragment" | "useEventDetailsFragment" | "useOnDeckFragment" | "useParticipantListFragment">;
  } | null;
};
export type EventLiveQuery = {
  response: EventLiveQuery$data;
  variables: EventLiveQuery$variables;
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
    "name": "lang"
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
v4 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v9 = {
  "kind": "Literal",
  "name": "after",
  "value": ""
},
v10 = [
  (v9/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "onDeckPosition",
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
  "name": "createdAt",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lang",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "lang",
      "variableName": "lang"
    }
  ],
  "kind": "ScalarField",
  "name": "questionTranslated",
  "storageKey": null
},
v21 = {
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
    (v18/*: any*/),
    (v11/*: any*/),
    (v19/*: any*/),
    (v20/*: any*/)
  ],
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLikedByViewer",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "topic",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likedByCount",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    (v25/*: any*/),
    (v26/*: any*/)
  ],
  "storageKey": null
},
v28 = {
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
v29 = [
  (v9/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  }
],
v30 = [
  (v9/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": (v4/*: any*/),
  "kind": "ScalarField",
  "name": "moderatorOf",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v14/*: any*/),
    (v32/*: any*/),
    (v15/*: any*/),
    (v16/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventLiveQuery",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EventSidebarFragment"
              },
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
                "args": [
                  {
                    "kind": "Variable",
                    "name": "userLang",
                    "variableName": "lang"
                  }
                ],
                "kind": "FragmentSpread",
                "name": "useOnDeckFragment"
              },
              {
                "args": (v4/*: any*/),
                "kind": "FragmentSpread",
                "name": "useParticipantListFragment"
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
    "name": "EventLiveQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isQuestionFeedVisible",
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
                          (v6/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
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
                "args": (v10/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "questions",
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
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventQuestion",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v17/*: any*/),
                          (v21/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v22/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestionTopic",
                            "kind": "LinkedField",
                            "name": "topics",
                            "plural": true,
                            "selections": [
                              (v23/*: any*/),
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v24/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v27/*: any*/),
                  (v28/*: any*/)
                ],
                "storageKey": "questions(after:\"\",first:50)"
              },
              {
                "alias": null,
                "args": (v10/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useQuestionListFragment_questions",
                "kind": "LinkedHandle",
                "name": "questions"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currentBroadcastMessage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v10/*: any*/),
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
                      (v8/*: any*/),
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
                          (v12/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "lang",
                                "value": "EN"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "translatedBroadcastMessage",
                            "storageKey": "translatedBroadcastMessage(lang:\"EN\")"
                          },
                          (v5/*: any*/)
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
                      (v25/*: any*/),
                      (v26/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v28/*: any*/)
                ],
                "storageKey": "broadcastMessages(after:\"\",first:50)"
              },
              {
                "alias": null,
                "args": (v10/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useBroadcastMessageListFragment_broadcastMessages",
                "kind": "LinkedHandle",
                "name": "broadcastMessages"
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
                    "args": (v29/*: any*/),
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
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v11/*: any*/),
                              (v17/*: any*/),
                              (v18/*: any*/),
                              (v24/*: any*/),
                              (v19/*: any*/),
                              (v20/*: any*/),
                              (v12/*: any*/),
                              (v21/*: any*/),
                              (v5/*: any*/),
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EventQuestionTopic",
                                "kind": "LinkedField",
                                "name": "topics",
                                "plural": true,
                                "selections": [
                                  (v23/*: any*/),
                                  (v6/*: any*/),
                                  (v12/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v22/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v27/*: any*/),
                      (v28/*: any*/)
                    ],
                    "storageKey": "questionRecord(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v29/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v29/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionCarousel_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v29/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "useOnDeckFragment_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v29/*: any*/),
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
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v11/*: any*/),
                              (v17/*: any*/),
                              (v18/*: any*/),
                              (v19/*: any*/),
                              (v20/*: any*/),
                              (v22/*: any*/),
                              (v12/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EventQuestionTopic",
                                "kind": "LinkedField",
                                "name": "topics",
                                "plural": true,
                                "selections": [
                                  (v23/*: any*/),
                                  (v12/*: any*/),
                                  (v6/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v24/*: any*/),
                              (v21/*: any*/),
                              (v5/*: any*/),
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v27/*: any*/),
                      (v28/*: any*/)
                    ],
                    "storageKey": "enqueuedQuestions(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v29/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_enqueuedQuestions",
                    "kind": "LinkedHandle",
                    "name": "enqueuedQuestions"
                  },
                  {
                    "alias": null,
                    "args": (v29/*: any*/),
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
                "args": (v30/*: any*/),
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
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventLiveFeedback",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v31/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isDM",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "dmRecipientId",
                            "storageKey": null
                          },
                          (v33/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventLiveFeedback",
                            "kind": "LinkedField",
                            "name": "refFeedback",
                            "plural": false,
                            "selections": [
                              (v33/*: any*/),
                              (v2/*: any*/),
                              (v31/*: any*/),
                              (v18/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v18/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v27/*: any*/),
                  (v28/*: any*/)
                ],
                "storageKey": "liveFeedback(after:\"\",first:100)"
              },
              {
                "alias": null,
                "args": (v30/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useLiveFeedbackListFragment_liveFeedback",
                "kind": "LinkedHandle",
                "name": "liveFeedback"
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
                      (v8/*: any*/),
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
                          (v19/*: any*/),
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
              (v7/*: any*/),
              (v23/*: any*/),
              (v6/*: any*/),
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
                "name": "isActive",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPrivate",
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
                "concreteType": "EventTopic",
                "kind": "LinkedField",
                "name": "topics",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v23/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v30/*: any*/),
                "concreteType": "EventParticipantConnection",
                "kind": "LinkedField",
                "name": "participants",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventParticipantEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventParticipant",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v32/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isMuted",
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
                      (v26/*: any*/),
                      (v25/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "participants(after:\"\",first:100)"
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
    "cacheID": "e6e456683c17a6ee9a588bcb42c6a09e",
    "id": null,
    "metadata": {},
    "name": "EventLiveQuery",
    "operationKind": "query",
    "text": "query EventLiveQuery(\n  $eventId: ID!\n  $lang: String!\n) {\n  node(id: $eventId) {\n    __typename\n    id\n    ... on Event {\n      isViewerModerator\n      ...EventSidebarFragment\n      ...useBroadcastMessageListFragment\n      ...EventVideoFragment\n      ...useEventDetailsFragment\n      ...SpeakerListFragment\n      ...useOnDeckFragment_1YWbQa\n      ...useParticipantListFragment_32qNee\n    }\n  }\n}\n\nfragment BroadcastMessageActionsFragment on EventBroadcastMessage {\n  id\n  ...DeleteBroadcastMessageButtonFragment\n  ...EditBroadcastMessageButtonFragment\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment_TYBrd on EventBroadcastMessage {\n  broadcastMessage\n  lang\n  translatedBroadcastMessage(lang: \"EN\")\n}\n\nfragment DeleteBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n  position\n}\n\nfragment DeleteButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment EditBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n}\n\nfragment EventSidebarFragment on Event {\n  id\n  isQuestionFeedVisible\n  isViewerModerator\n  ...SpeakerListFragment\n  ...useQuestionListFragment_1YWbQa\n  ...useBroadcastMessageListFragment\n  ...useQuestionQueueFragment_1YWbQa\n  ...QuestionCarouselFragment_1YWbQa\n  ...useLiveFeedbackListFragment_32qNee\n  ...useOnDeckFragment_1YWbQa\n}\n\nfragment EventVideoFragment on Event {\n  videos {\n    edges {\n      cursor\n      node {\n        url\n        lang\n        id\n      }\n    }\n  }\n  id\n}\n\nfragment LikeFragment on EventQuestion {\n  id\n  isLikedByViewer\n}\n\nfragment LiveFeedbackAuthorFragment_32qNee on EventLiveFeedback {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n    moderatorOf(eventId: $eventId)\n  }\n  createdAt\n}\n\nfragment LiveFeedbackReplyFragment_32qNee on EventLiveFeedback {\n  id\n  message\n  ...LiveFeedbackAuthorFragment_32qNee\n}\n\nfragment QuestionActionsFragment_3iqx2P on EventQuestion {\n  id\n  ...QuoteFragment_3iqx2P\n  ...LikeFragment\n  ...QueueButtonFragment\n  ...DeleteButtonFragment\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionCarouselFragment_1YWbQa on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          position\n          ...QuestionAuthorFragment\n          ...QuestionContentFragment_3iqx2P\n          refQuestion {\n            ...QuestionQuoteFragment_3iqx2P\n            id\n          }\n          id\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment QuestionContentFragment_3iqx2P on EventQuestion {\n  question\n  lang\n  questionTranslated(lang: $lang)\n}\n\nfragment QuestionQuoteFragment_3iqx2P on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_3iqx2P\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n\nfragment QuestionTopicsFragment on EventQuestion {\n  topics {\n    topic\n    description\n    position\n  }\n}\n\nfragment QueueButtonFragment on EventQuestion {\n  id\n  question\n  position\n  topics {\n    topic\n    position\n  }\n}\n\nfragment QuoteFragment_3iqx2P on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_3iqx2P\n}\n\nfragment SpeakerListFragment on Event {\n  speakers {\n    edges {\n      node {\n        id\n        pictureUrl\n        name\n        description\n        title\n      }\n      cursor\n    }\n  }\n  id\n}\n\nfragment useBroadcastMessageListFragment on Event {\n  id\n  currentBroadcastMessage\n  broadcastMessages(first: 50, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        broadcastMessage\n        isVisible\n        createdBy {\n          firstName\n          id\n        }\n        ...BroadcastMessageActionsFragment\n        ...BroadcastMessageAuthorFragment\n        ...BroadcastMessageContentFragment_TYBrd\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useEventDetailsFragment on Event {\n  id\n  title\n  topic\n  description\n  startDateTime\n  endDateTime\n  isActive\n  isViewerModerator\n  isPrivate\n  isViewerInvited\n  issueGuideUrl\n  topics {\n    id\n    topic\n    description\n  }\n}\n\nfragment useLiveFeedbackListFragment_32qNee on Event {\n  id\n  liveFeedback(first: 100, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        message\n        isDM\n        dmRecipientId\n        createdBy {\n          id\n          firstName\n          moderatorOf(eventId: $eventId)\n        }\n        refFeedback {\n          createdBy {\n            id\n            firstName\n            moderatorOf(eventId: $eventId)\n          }\n          ...LiveFeedbackReplyFragment_32qNee\n          id\n        }\n        ...LiveFeedbackReplyFragment_32qNee\n        ...LiveFeedbackAuthorFragment_32qNee\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useOnDeckFragment_1YWbQa on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          lang\n          position\n          onDeckPosition\n          topics {\n            topic\n            description\n            position\n          }\n          createdBy {\n            id\n            firstName\n            lastName\n            avatar\n          }\n          createdAt\n          likedByCount\n          isLikedByViewer\n          ...QuestionActionsFragment_3iqx2P\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_3iqx2P\n          ...QuestionTopicsFragment\n          refQuestion {\n            id\n            question\n            lang\n            questionTranslated(lang: $lang)\n            createdBy {\n              id\n              firstName\n              lastName\n              avatar\n            }\n            createdAt\n            ...QuestionQuoteFragment_3iqx2P\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    enqueuedQuestions(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          lang\n          position\n          onDeckPosition\n          topics {\n            topic\n            description\n            position\n          }\n          createdBy {\n            id\n            firstName\n            lastName\n            avatar\n          }\n          createdAt\n          likedByCount\n          isLikedByViewer\n          ...QuestionActionsFragment_3iqx2P\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_3iqx2P\n          ...QuestionTopicsFragment\n          refQuestion {\n            id\n            question\n            lang\n            questionTranslated(lang: $lang)\n            createdBy {\n              id\n              firstName\n              lastName\n              avatar\n            }\n            createdAt\n            ...QuestionQuoteFragment_3iqx2P\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useParticipantListFragment_32qNee on Event {\n  participants(first: 100, after: \"\") {\n    edges {\n      node {\n        user {\n          id\n          firstName\n          lastName\n          moderatorOf(eventId: $eventId)\n        }\n        isMuted\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n\nfragment useQuestionListFragment_1YWbQa on Event {\n  id\n  currentQuestion\n  questions(first: 50, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        position\n        onDeckPosition\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment_3iqx2P\n          id\n        }\n        ...QuestionActionsFragment_3iqx2P\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment_3iqx2P\n        ...QuestionStatsFragment\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useQuestionQueueFragment_1YWbQa on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_3iqx2P\n          position\n          refQuestion {\n            ...QuestionQuoteFragment_3iqx2P\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    enqueuedQuestions(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionActionsFragment_3iqx2P\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_3iqx2P\n          position\n          refQuestion {\n            ...QuestionQuoteFragment_3iqx2P\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9f11d991649cfb566a35bddbc4143dac";

export default node;
