/**
 * @generated SignedSource<<86e3c951618ce2b08f02c1024706b656>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UploadReadingMaterialsMutation$variables = {
  eventId: string;
  material: string;
};
export type UploadReadingMaterialsMutation$data = {
  readonly generateEventTopics: {
    readonly body: {
      readonly issue: string;
      readonly topics: ReadonlyArray<{
        readonly description: string;
        readonly topic: string;
      }> | null;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type UploadReadingMaterialsMutation = {
  response: UploadReadingMaterialsMutation$data;
  variables: UploadReadingMaterialsMutation$variables;
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
    "name": "material"
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
        "name": "material",
        "variableName": "material"
      }
    ],
    "concreteType": "TopicGenerationMutationResponse",
    "kind": "LinkedField",
    "name": "generateEventTopics",
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
    "name": "UploadReadingMaterialsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UploadReadingMaterialsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cb82ea2b48c8159a738eddb8752cd317",
    "id": null,
    "metadata": {},
    "name": "UploadReadingMaterialsMutation",
    "operationKind": "mutation",
    "text": "mutation UploadReadingMaterialsMutation(\n  $eventId: String!\n  $material: String!\n) {\n  generateEventTopics(eventId: $eventId, material: $material) {\n    body {\n      topics {\n        topic\n        description\n      }\n      issue\n    }\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "582b9138be334fe83c65988de23d6109";

export default node;
