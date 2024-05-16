/**
 * @generated SignedSource<<9460ee6e8e03ee49d5c2f1bac54e784b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useRegenerateTopicsMutation$variables = {
  eventId: string;
};
export type useRegenerateTopicsMutation$data = {
  readonly regenerateEventTopics: {
    readonly body: ReadonlyArray<{
      readonly description: string;
      readonly locked: boolean | null;
      readonly topic: string;
    }> | null;
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useRegenerateTopicsMutation = {
  response: useRegenerateTopicsMutation$data;
  variables: useRegenerateTopicsMutation$variables;
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
    "concreteType": "TopicGenerationMutationResponse",
    "kind": "LinkedField",
    "name": "regenerateEventTopics",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneratedTopic",
        "kind": "LinkedField",
        "name": "body",
        "plural": true,
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locked",
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
    "name": "useRegenerateTopicsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useRegenerateTopicsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "407869b42e2655a569cd9cd77f823068",
    "id": null,
    "metadata": {},
    "name": "useRegenerateTopicsMutation",
    "operationKind": "mutation",
    "text": "mutation useRegenerateTopicsMutation(\n  $eventId: String!\n) {\n  regenerateEventTopics(eventId: $eventId) {\n    body {\n      topic\n      description\n      locked\n    }\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab9407a0a4ebf238209fba2b4ad35111";

export default node;
