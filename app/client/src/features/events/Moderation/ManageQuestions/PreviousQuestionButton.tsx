import { ButtonProps, IconButton, Tooltip } from '@mui/material';
import { graphql, useMutation } from 'react-relay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import type { PreviousQuestionButtonMutation } from '@local/__generated__/PreviousQuestionButtonMutation.graphql';
import { useEvent } from '../../useEvent';

export const PREVIOUS_QUESTION_BUTTON_MUTATION = graphql`
    mutation PreviousQuestionButtonMutation($eventId: ID!) {
        prevQuestion(eventId: $eventId) {
            id
            currentQuestion
        }
    }
`;

export function PreviousQuestionButton(props: ButtonProps) {
    const { eventId } = useEvent();
    const [commit] = useMutation<PreviousQuestionButtonMutation>(PREVIOUS_QUESTION_BUTTON_MUTATION);
    const handleClick = () => {
        commit({
            variables: {
                eventId,
            },
        });
    };

    return (
        <Tooltip title='Previous Question' placement='right' sx={{ color: (theme) => theme.palette.primary.main }}>
            <div>
                <IconButton {...props} onClick={handleClick}>
                    <ArrowBackIcon />
                </IconButton>
            </div>
        </Tooltip>
    );
}
