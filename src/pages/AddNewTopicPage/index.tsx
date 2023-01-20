/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInputField from 'components/TextInputField';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import {
    addNewTopicThunk,
    ADD_CANDIDATE,
    DELETE_CANDIDATE,
    RESET_ADD_NEW_SUBJECT_SLICE,
} from 'store/addNewTopic';
import Header from 'components/Header';
import Button from 'components/Button';
import PageTitle from 'components/Title';
import NewCandidate from 'components/NewCandidate';

import './AddNewTopicPage.styles.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const yupValidation = yup.object({
    subject: yup.string().trim().strict().required('Subject is required'),
    candidateName: yup.string().trim().strict(),
});

const defaultValues = {
    subject: '',
    candidateName: '',
};

const AddNewTopicPage = () => {
    const { control, watch, resetField, setFocus, setError, formState, handleSubmit } =
        useForm<FieldValues>({
            defaultValues,
            resolver: yupResolver(yupValidation),
        });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const addNewTopicState = useAppSelector(({ addNewTopic }) => addNewTopic);
    const addNewTopicRes = useAppSelector(({ addNewTopic }) => addNewTopic.res);

    const editBtnHandler = (id: string) => {
        const candidateToEdit = addNewTopicState.candidates.filter(
            (candidate) => candidate.id === id,
        );

        resetField('candidateName', { defaultValue: candidateToEdit[0].candidateName });
        dispatch(DELETE_CANDIDATE(id));
    };

    const addCandidateBtnHandler = () => {
        const candidateName = watch('candidateName');
        if (!candidateName) {
            setError(
                'candidateName',
                { type: 'required', message: 'Please enter a Candidate Name' },
                { shouldFocus: true },
            );
            return;
        }

        dispatch(ADD_CANDIDATE(candidateName));
        resetField('candidateName', { defaultValue: '' });
        // setFocus('candidateName', { shouldSelect: true });
    };

    useEffect(() => {
        dispatch(RESET_ADD_NEW_SUBJECT_SLICE());
    }, []);

    useEffect(() => {
        if (addNewTopicRes?.sub && addNewTopicRes.candidates.length > 0) {
            navigate(`/dashboard/${addNewTopicRes.subjectId}`);
        }

        return () => {
            dispatch(RESET_ADD_NEW_SUBJECT_SLICE());
        };
    }, [addNewTopicRes?.subjectId]);

    return (
        <div id="add-new-topic-page">
            <Header />

            <div className="page-view">
                <PageTitle title="Add New Subject" />

                <form
                    className="form"
                    onSubmit={handleSubmit((formData) => {
                        dispatch(addNewTopicThunk(formData));
                    })}
                >
                    {/* First Child */}
                    <TextInputField
                        separateLabel
                        control={control}
                        errors={formState.errors}
                        fieldName="subject"
                        inputHelperText="Try to submit small and expressive subject for voting"
                        inputLabel="Enter a subject for voting"
                        inputPlaceholder="Favorite Fast Food ?"
                    />

                    {/* Second Child */}
                    <TextInputField
                        separateLabel
                        control={control}
                        errors={formState.errors}
                        fieldName="candidateName"
                        inputHelperText="Minimum 2 Candidates should be there for voting"
                        inputLabel="Candidate Name"
                    />

                    {/* Third Child */}
                    <Button onClick={() => addCandidateBtnHandler()}>Add Candidate</Button>

                    <p className="add-new-subject__info">
                        If you add more than 3 candidates you will get Metals Ranking System for
                        your subject
                    </p>

                    {addNewTopicState.candidates.length > 0 ? (
                        <p className="candidates-list">-x- Candidates List -x-</p>
                    ) : null}

                    {addNewTopicState.candidates.map((candidate, idx) => (
                        <NewCandidate
                            editBtnHandler={editBtnHandler}
                            indexNumber={idx}
                            key={candidate.id}
                            newCandidate={candidate}
                        />
                    ))}

                    {addNewTopicState.candidates.length > 0 &&
                    addNewTopicState.candidates.length < 2 ? (
                        <p className="add-new-subject__info">
                            Add one more candidate to active Submit button
                        </p>
                    ) : null}

                    {/* 2nd Last Child */}
                    <Button
                        color="success"
                        disabled={Boolean(!(addNewTopicState.candidates.length > 1))}
                        loading={addNewTopicState.loading}
                        type="submit"
                    >
                        Submit
                    </Button>

                    {/* Last Child */}
                    <Button
                        color="warning"
                        type="button"
                        onClick={() => {
                            resetField('candidateName', { defaultValue: '' });
                            resetField('subject', { defaultValue: '' });
                            dispatch(RESET_ADD_NEW_SUBJECT_SLICE());
                        }}
                    >
                        Reset
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddNewTopicPage;
