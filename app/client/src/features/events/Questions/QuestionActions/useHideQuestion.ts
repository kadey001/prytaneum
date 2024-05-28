import { graphql, useMutation } from 'react-relay';
import { useHideQuestionMutation } from '@local/__generated__/useHideQuestionMutation.graphql';
import { useSnack } from '@local/core/useSnack';

const USE_HIDE_QUESTION_MUTATION = graphql`
    mutation useHideQuestionMutation($input: DeleteQuestion!) {
        deleteQuestion(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                }
            }
        }
    }
`;

interface Props {
    questionId: string;
}

export function useHideQuestion({ questionId }: Props) {
    const [commit] = useMutation<useHideQuestionMutation>(USE_HIDE_QUESTION_MUTATION);
    const { displaySnack } = useSnack();

    function handleClick() {
        commit({
            variables: {
                input: {
                    questionId,
                    isVisible: false,
                },
            },
            onCompleted({ deleteQuestion }) {
                if (deleteQuestion.isError) displaySnack(deleteQuestion.message);
            },
        });
    }

    return { handleClick };
}
