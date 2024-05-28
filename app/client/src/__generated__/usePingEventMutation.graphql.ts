/**
 * @generated SignedSource<<f2f5bc07b063f09c8713d3d8d21ed139>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type usePingEventMutation$variables = {
  eventId: string;
};
export type usePingEventMutation$data = {
  readonly participantPingEvent: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type usePingEventMutation$rawResponse = {
  readonly participantPingEvent: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type usePingEventMutation = {
  rawResponse: usePingEventMutation$rawResponse;
  response: usePingEventMutation$data;
  variables: usePingEventMutation$variables;
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
    "concreteType": "ParticipantPingEventMutationResponse",
    "kind": "LinkedField",
    "name": "participantPingEvent",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "usePingEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "usePingEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6f02a807748bcfc40f6dd97b62da8ce4",
    "id": null,
    "metadata": {},
    "name": "usePingEventMutation",
    "operationKind": "mutation",
    "text": "mutation usePingEventMutation(\n  $eventId: ID!\n) {\n  participantPingEvent(eventId: $eventId) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "04b24234cf2ac7a158d02fa3d44c0d1a";

export default node;
