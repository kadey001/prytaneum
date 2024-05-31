/**
 * @generated SignedSource<<6c78267abfe9614bf84347f14c257d20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChooseLanguageFormMutation$variables = {
  language: string;
};
export type ChooseLanguageFormMutation$data = {
  readonly updatePreferedLanguage: {
    readonly body: {
      readonly id: string;
      readonly preferredLang: string | null;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type ChooseLanguageFormMutation = {
  response: ChooseLanguageFormMutation$data;
  variables: ChooseLanguageFormMutation$variables;
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
    "name": "ChooseLanguageFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChooseLanguageFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "093a9e51b251368aa9e09fd55fdf01c2",
    "id": null,
    "metadata": {},
    "name": "ChooseLanguageFormMutation",
    "operationKind": "mutation",
    "text": "mutation ChooseLanguageFormMutation(\n  $language: String!\n) {\n  updatePreferedLanguage(language: $language) {\n    isError\n    message\n    body {\n      id\n      preferredLang\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "143fe1c3faa3a674604628a08f045cd6";

export default node;
