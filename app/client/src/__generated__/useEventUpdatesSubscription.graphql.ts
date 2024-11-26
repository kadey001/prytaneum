/**
 * @generated SignedSource<<46f13ed54bf6c46e3da509b42999d9b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useEventUpdatesSubscription$variables = {
  userId: string;
};
export type useEventUpdatesSubscription$data = {
  readonly eventUpdates: {
    readonly description: string | null;
    readonly endDateTime: Date | null;
    readonly eventType: string | null;
    readonly id: string;
    readonly isActive: boolean | null;
    readonly isPrivate: boolean | null;
    readonly isViewerInvited: boolean | null;
    readonly isViewerModerator: boolean | null;
    readonly issueGuideUrl: string | null;
    readonly startDateTime: Date | null;
    readonly title: string | null;
    readonly topic: string | null;
    readonly topics: ReadonlyArray<{
      readonly description: string;
      readonly id: string;
      readonly topic: string;
    }> | null;
  };
};
export type useEventUpdatesSubscription = {
  response: useEventUpdatesSubscription$data;
  variables: useEventUpdatesSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
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
  "name": "topic",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "Event",
    "kind": "LinkedField",
    "name": "eventUpdates",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      (v2/*: any*/),
      (v3/*: any*/),
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
        "name": "isViewerModerator",
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
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "eventType",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useEventUpdatesSubscription",
    "selections": (v4/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useEventUpdatesSubscription",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "0513f35c5b7a080144bb91ec7c1ee9a1",
    "id": null,
    "metadata": {},
    "name": "useEventUpdatesSubscription",
    "operationKind": "subscription",
    "text": "subscription useEventUpdatesSubscription(\n  $userId: ID!\n) {\n  eventUpdates(userId: $userId) {\n    id\n    title\n    topic\n    description\n    startDateTime\n    endDateTime\n    isActive\n    isViewerModerator\n    isPrivate\n    isViewerInvited\n    issueGuideUrl\n    topics {\n      id\n      topic\n      description\n    }\n    eventType\n  }\n}\n"
  }
};
})();

(node as any).hash = "03a5c99d11cd41d4da9fd091a4b2aa2b";

export default node;
