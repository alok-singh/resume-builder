import { Camera } from 'lucide-react';
import TextField from '../../components/text-fields';
import { useDispatch, useSelector } from 'react-redux';
import { setBasicInfo } from '../../features/build-resume-slice';

const BasicInformationSection = (props) => {
  const dispatch = useDispatch();
  const { basicInfo } = useSelector((state) => state.buildPage);

  const onChangeTextField = (field, value, errorField) => {
    dispatch(setBasicInfo({ [field]: value, [errorField]: undefined }));
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[160px_1fr]">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="grid h-32 w-32 place-items-center rounded-full bg-linear-to-br from-fuchsia-300 to-indigo-400 text-4xl font-semibold text-white shadow-lg">AS</div>
          <div className="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full bg-white shadow-md">
            <Camera className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Upload photo</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          error={props.firstNameError}
          label="First name"
          placeholder="Ada"
          onChange={(value) => onChangeTextField('firstName', value, 'firstNameError')}
          value={basicInfo.firstName}
        />
        <TextField
          error={props.lastNameError}
          label="Last name"
          placeholder="Lovelace"
          onChange={(value) => onChangeTextField('lastName', value, 'lastNameError')}
          value={basicInfo.lastName}
        />
        <TextField
          error={props.currentJobTitleError}
          label="Job title"
          placeholder="Senior Frontend Engineer"
          fullWidth={true}
          onChange={(value) => onChangeTextField('currentJobTitle', value, 'currentJobTitleError')}
          value={basicInfo.currentJobTitle}
        />
        <TextField
          error={props.phoneNumberError}
          label="Phone"
          placeholder="+1 (555) 010-4242"
          onChange={(value) => onChangeTextField('phoneNumber', value, 'phoneNumberError')}
          value={basicInfo.phoneNumber}
        />
        <TextField
          error={props.emailError}
          label="Email"
          type="email"
          placeholder="ada@resumely.dev"
          onChange={(value) => onChangeTextField('email', value, 'emailError')}
          value={basicInfo.email}
        />
      </div>
    </div>
  );
};

export default BasicInformationSection;
