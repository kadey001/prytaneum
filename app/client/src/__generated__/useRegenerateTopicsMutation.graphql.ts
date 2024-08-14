/**
 * @generated SignedSource<<2be7057cf2033c4bca2a87e7e16cb5a0>>
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
    readonly body: {
      readonly issue: string;
      readonly topics: ReadonlyArray<{
        readonly description: string;
        readonly locked: boolean | null;
        readonly topic: string;
      }> | null;
    } | null;
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
        "concreteType": "TopicGenerationBody",
        "kind": "LinkedField",
        "name": "body",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GeneratedTopic",
            "kind": "LinkedField",
            "name": "topics",
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
            "name": "issue",
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
    "cacheID": "2d8037102ce6f319c4c6289ad2dfc21d",
    "id": null,
    "metadata": {},
    "name": "useRegenerateTopicsMutation",
    "operationKind": "mutation",
    "text": "mutation useRegenerateTopicsMutation(\n  $eventId: String!\n) {\n  regenerateEventTopics(eventId: $eventId) {\n    body {\n      topics {\n        topic\n        description\n        locked\n      }\n      issue\n    }\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "5405e4c9a4f639862a5c1cdaccce4c48";

export default node;
