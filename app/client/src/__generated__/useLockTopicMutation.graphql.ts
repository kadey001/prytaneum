/**
 * @generated SignedSource<<a92d4979a81f65eb3f86c7fdfd1e1c0e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useLockTopicMutation$variables = {
  eventId: string;
  topic: string;
};
export type useLockTopicMutation$data = {
  readonly lockTopic: {
    readonly body: {
      readonly topic: string;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useLockTopicMutation = {
  response: useLockTopicMutation$data;
  variables: useLockTopicMutation$variables;
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
    "name": "lockTopic",
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
    "name": "useLockTopicMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useLockTopicMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "979fd331dfd50ebd6b76e403e8730109",
    "id": null,
    "metadata": {},
    "name": "useLockTopicMutation",
    "operationKind": "mutation",
    "text": "mutation useLockTopicMutation(\n  $eventId: String!\n  $topic: String!\n) {\n  lockTopic(eventId: $eventId, topic: $topic) {\n    body {\n      topic\n    }\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "ef517f9aac9e0e55fe945c3aadcfc5ea";

export default node;
