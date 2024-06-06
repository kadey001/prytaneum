/**
 * @generated SignedSource<<5200ef5090a44a7e6c73a315ff887a61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChooseLanguageDialogMutation$variables = {
  language: string;
};
export type ChooseLanguageDialogMutation$data = {
  readonly updatePreferedLanguage: {
    readonly body: {
      readonly id: string;
      readonly preferredLang: string | null;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type ChooseLanguageDialogMutation = {
  response: ChooseLanguageDialogMutation$data;
  variables: ChooseLanguageDialogMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "language"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "language",
        "variableName": "language"
      }
    ],
    "concreteType": "UserMutationResponse",
    "kind": "LinkedField",
    "name": "updatePreferedLanguage",
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "body",
        "plural": false,
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
            "name": "preferredLang",
            "storageKey": null
          }
        ],
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
    "name": "ChooseLanguageDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChooseLanguageDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6b34d6cd56ce8fa055db3a8d5a293d3d",
    "id": null,
    "metadata": {},
    "name": "ChooseLanguageDialogMutation",
    "operationKind": "mutation",
    "text": "mutation ChooseLanguageDialogMutation(\n  $language: String!\n) {\n  updatePreferedLanguage(language: $language) {\n    isError\n    message\n    body {\n      id\n      preferredLang\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "63f137d4afc758799194c791e74ed0fb";

export default node;
