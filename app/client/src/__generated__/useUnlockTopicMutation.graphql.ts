/**
 * @generated SignedSource<<080c836e6b8b019d757fef43c672c7fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useUnlockTopicMutation$variables = {
  eventId: string;
  topic: string;
};
export type useUnlockTopicMutation$data = {
  readonly unlockTopic: {
    readonly body: {
      readonly topic: string;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useUnlockTopicMutation = {
  response: useUnlockTopicMutation$data;
  variables: useUnlockTopicMutation$variables;
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
    "name": "topic"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      },
      {
        "kind": "Variable",
        "name": "topic",
        "variableName": "topic"
      }
    ],
    "concreteType": "TopicLockToggleMutationResponse",
    "kind": "LinkedField",
    "name": "unlockTopic",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TopicOnly",
        "kind": "LinkedField",
        "name": "body",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "topic",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isError",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
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
    "name": "useUnlockTopicMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUnlockTopicMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "088492551d73a11f16f9497a92ee8097",
    "id": null,
    "metadata": {},
    "name": "useUnlockTopicMutation",
    "operationKind": "mutation",
    "text": "mutation useUnlockTopicMutation(\n  $eventId: String!\n  $topic: String!\n) {\n  unlockTopic(eventId: $eventId, topic: $topic) {\n    body {\n      topic\n    }\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa1c68a78dc4057bcaf03771ca734bd9";

export default node;
