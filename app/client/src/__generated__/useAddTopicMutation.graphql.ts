/**
 * @generated SignedSource<<6e6ae2355fdd5e939004f260fac4c19c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useAddTopicMutation$variables = {
  description: string;
  eventId: string;
  topic: string;
};
export type useAddTopicMutation$data = {
  readonly addTopic: {
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useAddTopicMutation = {
  response: useAddTopicMutation$data;
  variables: useAddTopicMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topic"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
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
    "concreteType": "TopicMutationResponse",
    "kind": "LinkedField",
    "name": "addTopic",
    "plural": false,
    "selections": [
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useAddTopicMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useAddTopicMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "e07aaebfdca8b4c207eb3ca5d8793203",
    "id": null,
    "metadata": {},
    "name": "useAddTopicMutation",
    "operationKind": "mutation",
    "text": "mutation useAddTopicMutation(\n  $eventId: String!\n  $topic: String!\n  $description: String!\n) {\n  addTopic(eventId: $eventId, topic: $topic, description: $description) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "a51da88a1a0d36a2efdc5a820a575374";

export default node;
