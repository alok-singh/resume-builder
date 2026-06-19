import { createSlice } from '@reduxjs/toolkit'

export const buildResumeSlice = createSlice({
  name: 'build_resume_state',
  initialState: {
    step: 0,
    choice: '',
    selectedTemplate: 'Modernist',
    basicInfo: {},
    experienceList: [{}],
    educationList: [{}],
    skills: [
      { name: 'TypeScript', level: 90 },
      { name: 'React', level: 95 },
      { name: 'Design Systems', level: 80 }
    ],
    sectionOrdering: ['Basics', 'Summary', 'Experience', 'Education', 'Skills'],
    additionalSections: [{}]
  },
  reducers: {
    nextStep: (state) => { state.step = Math.min(8, state.step + 1) },
    previousStep: (state) => { state.step = Math.max(1, state.step - 1) },
    setStep: (state, action) => { state.step = action.payload },
    setChoice: (state, action) => { state.choice = action.payload },
    setSelectedTemplate: (state, action) => { state.selectedTemplate = action.payload },
    setBasicInfo: (state, action) => { state.basicInfo = { ...state.basicInfo, ...action.payload } },
    addExperience: (state) => { state.experienceList = [...state.experienceList, {}] },
    modifyExperience: (state, action) => { state.experienceList[action.payload.index] = { ...state.experienceList[action.payload.index], [action.payload.key]: action.payload.value } },
    addEducation: (state) => { state.educationList = [...state.educationList, {}] },
    modifyEducation: (state, action) => { state.educationList[action.payload.index] = { ...state.educationList[action.payload.index], [action.payload.key]: action.payload.value } },
    addSkill: (state) => { state.skills = [...state.skills, { level: 50, name: '' }] },
    removeSkill: (state, action) => { state.skills = state.skills.filter((skill, index) => index !== action.payload.index) },
    modifySkill: (state, action) => { state.skills[action.payload.index] = { ...state.skills[action.payload.index], [action.payload.key]: action.payload.value } },
    addAdditionalSections: (state) => { state.additionalSections = [...state.additionalSections, {}] },
    removeAdditionalSections: (state, action) => { state.additionalSections = state.additionalSections.filter((skill, index) => index !== action.payload.index) },
    modifyAdditionalSections: (state, action) => { state.additionalSections[action.payload.index] = { ...state.additionalSections[action.payload.index], [action.payload.key]: action.payload.value } },
  },
})

export const {
  nextStep,
  previousStep,
  setStep,
  setChoice,
  setSelectedTemplate,
  setBasicInfo,
  addExperience,
  modifyExperience,
  addEducation,
  modifyEducation,
  addSkill,
  removeSkill,
  modifySkill,
  addAdditionalSections,
  removeAdditionalSections,
  modifyAdditionalSections
} = buildResumeSlice.actions;

export default buildResumeSlice.reducer;
