import * as React from 'react';
import { graphql, useMutation } from 'react-relay';
import { useSnack } from '@local/core';
import type { CreateModeratorMutation } from '@local/__generated__/CreateModeratorMutation.graphql';
import { ModeratorForm, ModeratorProps } from './ModeratorForm';

export interface CreateModeratorProps {
    eventId: string;
    onSubmit?: () => void;
    connections: string[];
}

export const CREATE_MODERATOR_MUTATION = graphql`
    mutation CreateModeratorMutation($input: CreateModerator!, $connections: [ID!]!) {
        createModerator(input: $input) {
            isError
            message
            body @appendNode(connections: $connections, edgeTypeName: "UserEdge") {
                id
                firstName
                lastName
                avatar
            }
        }
    }
`;

export function CreateModerator({ eventId, onSubmit, connections }: CreateModeratorProps) {
    const { displaySnack } = useSnack();
    const [commit] = useMutation<CreateModeratorMutation>(CREATE_MODERATOR_MUTATION);

    const handleSubmit: ModeratorProps['onSubmit'] = (submittedForm) => {
        commit({
            variables: {
                input: {
                    ...submittedForm,
                    eventId,
                },
                connections,
            },
            onCompleted({ createModerator }) {
                if (createModerator.isError) {
                    displaySnack(createModerator.message, { variant: 'error' });
                } else if (onSubmit) {
                    onSubmit();
                }
            },
            onError(err) {
                displaySnack(err.message, { variant: 'error' });
            },
        });
    };
    return <ModeratorForm onSubmit={handleSubmit} />;
}
