/**
 * @author: Kiran A. Bansode <czar.kiran@gmail.com> <kiran5120135@gmail.com>
 */

/* -------------------------------- Libraries ------------------------------- */
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* ------------------------------- Components ------------------------------- */
import TextInputField from 'components/TextInputField';
import SelectInputField from 'components/SelectInputField';
import DateInputField from 'components/DateInputField';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Caption from 'components/Caption';
import countryCodeOptions from 'utils/menuOptions/countryCodes';

/* ---------------------------------- Hooks --------------------------------- */
import useAppDispatch from 'hooks/useAppDispatch';

/* ---------------------------------- Redux --------------------------------- */
import { createNewUserThunk } from 'store/registrationPage/createNewUserSlice';

/* ---------------------------------- Utils --------------------------------- */
import standardOptions from 'utils/menuOptions/standards';
import divisionOptions from 'utils/menuOptions/divisions';
import { IStudentRegForm } from 'types/regFormData';

// eslint-disable-next-line import/extensions
import StudentRegFormValidations from './yupValidations';

/* --------------------------------- Styles --------------------------------- */
import './StudentRegForm.styles.scss';

const defaultStudentRegFormVal: IStudentRegForm = {
    name: {
        firstName: '',
        middleName: '',
        lastName: '',
    },
    gender: 'male',
    dob: '',
    schoolName: '',
    std: '',
    div: '',
    countryCode: '',
    mob1: '',
    mob2: '',
    emailId: '',
    password: '',
    confirmPassword: '',
};

const StudentRegForm = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FieldValues>({
        defaultValues: defaultStudentRegFormVal,
        resolver: yupResolver(StudentRegFormValidations),
    });
    const dispatch = useAppDispatch();

    const View = (
        <div className="reg-form" id="student-reg-form">
            <Logo goHere="/" />

            <Caption />

            <form
                onSubmit={handleSubmit((formData) => {
                    dispatch(createNewUserThunk(formData));
                })}
            >
                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('name.firstName')}
                    inputLabel="First Name"
                    inputPlaceholder="Your Name"
                />

                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('name.middleName')}
                    inputLabel="Middle Name"
                    inputPlaceholder="Father/Husband Name"
                />

                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('name.lastName')}
                    inputLabel="Last Name"
                    inputPlaceholder="Surname"
                />

                <RadioInputField
                    alignCenter
                    required
                    separateLabel
                    showBorder
                    control={control}
                    fieldName="gender"
                    inputErrors={errors}
                    inputLabel="Gender"
                    radioSelect={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />

                <DateInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="dob"
                    inputErrors={errors}
                    inputHelperText="Enter your Birthday in format of DD/MM/YYYY"
                    inputLabel="Date of Birth"
                />

                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('schoolName')}
                    inputLabel="School Name"
                />

                <SelectInputField
                    separateLabel
                    control={control}
                    fieldName="std"
                    inputErrors={errors}
                    inputLabel="Standard"
                    options={standardOptions}
                />

                <SelectInputField
                    separateLabel
                    control={control}
                    fieldName="div"
                    inputErrors={errors}
                    inputLabel="Division"
                    options={divisionOptions}
                />

                <SelectInputField
                    separateLabel
                    control={control}
                    fieldName="countryCode"
                    inputErrors={errors}
                    inputLabel="Where are you from"
                    options={countryCodeOptions}
                />

                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('mob1')}
                    inputLabel="Mobile No. (WhatsApp)"
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('mob2')}
                    inputLabel="Alternate Mobile No."
                />

                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('emailId')}
                    inputLabel="Email ID"
                />

                <PasswordInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('password')}
                    inputLabel="Password"
                />

                <PasswordInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('confirmPassword')}
                    inputLabel="Confirm Password"
                />

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );

    return View;
};

export default StudentRegForm;
