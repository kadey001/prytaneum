import { UniqueIdentifier } from '@dnd-kit/core';
import { FragmentRefs } from 'relay-runtime';

export type Question = {
    id: UniqueIdentifier;
    cursor: string;
    createdBy: {
        readonly firstName: string | null;
    } | null;
    position: string;
    onDeckPosition: string;
    question: string;
    refQuestion: {
        readonly ' $fragmentSpreads': FragmentRefs<'QuestionQuoteFragment'>;
    } | null;
    topics:
        | readonly {
              readonly topic: string;
              readonly description: string;
              readonly position: string;
          }[]
        | null;
    ' $fragmentSpreads': FragmentRefs<any>;
};

export type Topic = {
    readonly id: string;
    readonly topic: string;
    readonly description: string;
};
