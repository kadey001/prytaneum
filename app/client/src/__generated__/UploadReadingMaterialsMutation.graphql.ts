/**
 * @generated SignedSource<<9fb67df8ceb0a5ca7f7a1659aed61bf6>>
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
    readonly body: ReadonlyArray<{
      readonly description: string;
      readonly topic: string;
    }> | null;
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
    "cacheID": "c6f5797c9e34f05915ab75f6aba4bbe6",
    "id": null,
    "metadata": {},
    "name": "UploadReadingMaterialsMutation",
    "operationKind": "mutation",
    "text": "mutation UploadReadingMaterialsMutation(\n  $eventId: String!\n  $material: String!\n) {\n  generateEventTopics(eventId: $eventId, material: $material) {\n    body {\n      topic\n      description\n    }\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "d4ad51c18197600e7bf8f5ceaf057e54";

export default node;
