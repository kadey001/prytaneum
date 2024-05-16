/**
 * @generated SignedSource<<d18058879a3599045c49902ee2663213>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useUpdateTopicMutation$variables = {
  description: string;
  eventId: string;
  newTopic: string;
  oldTopic: string;
};
export type useUpdateTopicMutation$data = {
  readonly updateTopic: {
    readonly body: {
      readonly description: string;
      readonly topic: string;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useUpdateTopicMutation = {
  response: useUpdateTopicMutation$data;
  variables: useUpdateTopicMutation$variables;
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
  "name": "newTopic"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "oldTopic"
},
v4 = [
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
        "name": "newTopic",
        "variableName": "newTopic"
      },
      {
        "kind": "Variable",
        "name": "oldTopic",
        "variableName": "oldTopic"
      }
    ],
    "concreteType": "TopicMutationResponse",
    "kind": "LinkedField",
    "name": "updateTopic",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneratedTopic",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateTopicMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useUpdateTopicMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "43ecb39503a40a048f484ea7f4546d7f",
    "id": null,
    "metadata": {},
    "name": "useUpdateTopicMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateTopicMutation(\n  $eventId: String!\n  $oldTopic: String!\n  $newTopic: String!\n  $description: String!\n) {\n  updateTopic(eventId: $eventId, oldTopic: $oldTopic, newTopic: $newTopic, description: $description) {\n    body {\n      topic\n      description\n    }\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "c9a99cd898f2c0794983e7f794f357c8";

export default node;
