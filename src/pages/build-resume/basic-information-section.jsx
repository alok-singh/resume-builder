import { Camera } from 'lucide-react';
import TextField from '../../components/text-fields';
import { useDispatch, useSelector } from 'react-redux';
import { setBasicInfo } from '../../features/build-resume-slice';
import { useRef } from 'react';

const BasicInformationSection = (props) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { basicInfo } = useSelector((state) => state.buildPage);

  const onChangeTextField = (field, value, errorField) => {
    dispatch(setBasicInfo({ [field]: value, [errorField]: undefined }));
  };

  const handleCameraClick = (e) => {
    // Prevent the click from bubbling up to the main avatar preview trigger
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangeTextField('profileImage', reader.result, 'profileImageError');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[160px_1fr]">
      <div className="flex flex-col items-center">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        <div className="relative">
          {basicInfo.profileImage ? (
            <img src={basicInfo.profileImage} alt="Profile preview" className="h-32 w-32 object-cover rounded-full" />
          ) : (
            <div onClick={handleCameraClick} className="grid h-32 w-32 place-items-center rounded-full bg-linear-to-br from-fuchsia-300 to-indigo-400 text-4xl font-semibold text-white shadow-lg">{basicInfo.firstName[0]}{basicInfo.lastName[0]}</div>
          )}
          <div className="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full bg-white shadow-md" onClick={handleCameraClick}>
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
        <TextField
          error={props.addressError}
          label="Address"
          fullWidth={true}
          placeholder="123 Broadway Ave"
          onChange={(value) => onChangeTextField('address', value, 'addressError')}
          value={basicInfo.address}
        />
        <TextField
          error={props.cityError}
          label="City"
          placeholder="New York"
          fullWidth={true}
          onChange={(value) => onChangeTextField('city', value, 'cityError')}
          value={basicInfo.city}
        />
        <TextField
          error={props.countryError}
          label="Country"
          placeholder="USA"
          onChange={(value) => onChangeTextField('country', value, 'countryError')}
          value={basicInfo.country}
        />
        <TextField
          error={props.postCodeError}
          label="Post code"
          placeholder="10007"
          onChange={(value) => onChangeTextField('postCode', value, 'postCodeError')}
          value={basicInfo.postCode}
        />
      </div>
    </div>
  );
};

export default BasicInformationSection;
