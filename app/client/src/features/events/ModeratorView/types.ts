import { UniqueIdentifier } from '@dnd-kit/core';
import { FragmentRefs } from 'relay-runtime';

export type Question = {
    cursor: string;
    id: UniqueIdentifier;
    question: string;
    lang: string | null;
    position: string;
    onDeckPosition: string;
    topics:
        | readonly {
              readonly topic: string;
              readonly description: string;
              readonly position: string;
          }[]
        | null;
    ' $fragmentSpreads': FragmentRefs<any>;
    createdBy: {
        readonly id: string;
        readonly firstName: string | null;
        readonly lastName: string | null;
        readonly avatar: string | null;
    } | null;
    createdAt: string | Date | null;
    likedByCount: number | null;
    isLikedByViewer: boolean | null;
    refQuestion: {
        readonly ' $fragmentSpreads': FragmentRefs<'QuestionQuoteFragment'>;
    } | null;
};

export type Topic = {
    readonly id: string;
    readonly topic: string;
    readonly description: string;
};
