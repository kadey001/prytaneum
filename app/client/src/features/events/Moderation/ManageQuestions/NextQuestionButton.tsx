import { IconButton, ButtonProps, Tooltip } from '@mui/material';
import { graphql, useMutation } from 'react-relay';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import type { NextQuestionButtonMutation } from '@local/__generated__/NextQuestionButtonMutation.graphql';
import { useEvent } from '../../useEvent';

export const NEXT_QUESTION_BUTTON_MUTATION = graphql`
    mutation NextQuestionButtonMutation($eventId: ID!) {
        nextQuestion(eventId: $eventId) {
            id
            currentQuestion
        }
    }
`;

export function NextQuestionButton(props: ButtonProps) {
    const { eventId } = useEvent();
    const [commit] = useMutation<NextQuestionButtonMutation>(NEXT_QUESTION_BUTTON_MUTATION);
    const handleClick = () => {
        commit({
            variables: {
                eventId,
            },
        });
    };

    return (
        <Tooltip title='Next Question' placement='left'>
            <div>
                <IconButton {...props} onClick={handleClick} sx={{ color: (theme) => theme.palette.primary.main }}>
                    <ArrowForwardIcon />
                </IconButton>
            </div>
        </Tooltip>
    );
}
