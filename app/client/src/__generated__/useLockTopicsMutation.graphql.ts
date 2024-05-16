/**
 * @generated SignedSource<<03a46beaf03e8cb6c40c10622623c98e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useLockTopicsMutation$variables = {
  eventId: string;
  topics: ReadonlyArray<string>;
};
export type useLockTopicsMutation$data = {
  readonly lockTopics: {
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useLockTopicsMutation = {
  response: useLockTopicsMutation$data;
  variables: useLockTopicsMutation$variables;
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
    "name": "topics"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  },
  {
    "kind": "Variable",
    "name": "topics",
    "variableName": "topics"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useLockTopicsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "lockTopics",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useLockTopicsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "lockTopics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4f63cad6940d18e88cd4456b779ed8dc",
    "id": null,
    "metadata": {},
    "name": "useLockTopicsMutation",
    "operationKind": "mutation",
    "text": "mutation useLockTopicsMutation(\n  $eventId: String!\n  $topics: [String!]!\n) {\n  lockTopics(eventId: $eventId, topics: $topics) {\n    __typename\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "c928995cb39d7a42fb7baa882ba0ade8";

export default node;
