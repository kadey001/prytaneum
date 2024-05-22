/**
 * @generated SignedSource<<8a581b42f914db3e9ce31c765453527b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useTopicListQuery$variables = {
  eventId: string;
};
export type useTopicListQuery$data = {
  readonly eventTopics: ReadonlyArray<{
    readonly description: string;
    readonly id: string;
    readonly topic: string;
  }> | null;
};
export type useTopicListQuery = {
  response: useTopicListQuery$data;
  variables: useTopicListQuery$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      }
    ],
    "concreteType": "EventTopic",
    "kind": "LinkedField",
    "name": "eventTopics",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useTopicListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useTopicListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4ccb6badddaa7754521381deaa4c8de4",
    "id": null,
    "metadata": {},
    "name": "useTopicListQuery",
    "operationKind": "query",
    "text": "query useTopicListQuery(\n  $eventId: String!\n) {\n  eventTopics(eventId: $eventId) {\n    id\n    topic\n    description\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee303450961b52d919507f813f638c95";

export default node;
