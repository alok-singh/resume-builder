import data from './dummy-data.json';
import { createSlice } from '@reduxjs/toolkit'

export const buildResumeSlice = createSlice({
  name: 'build_resume_state',
  initialState: {
    step: 0,
    choice: '',
    selectedTemplateIndex: 0,
    basicInfo: data.basicInfo,
    experienceList: data.experienceList,
    educationList: data.educationList,
    skills: data.skills,
    summary: data.summary,
    showExperienceLevel: data.showExperienceLevel,
    sectionOrdering: ['Basics', 'Summary', 'Experience', 'Education', 'Skills'],
    additionalSections: data.additionalSections
  },
  reducers: {
    nextStep: (state) => { state.step = Math.min(8, state.step + 1) },
    previousStep: (state) => { state.step = Math.max(1, state.step - 1) },
    setStep: (state, action) => { state.step = action.payload },
    setChoice: (state, action) => { state.choice = action.payload },
    setSelectedTemplateIndex: (state, action) => { state.selectedTemplateIndex = action.payload },
    setBasicInfo: (state, action) => { state.basicInfo = { ...state.basicInfo, ...action.payload } },
    addExperience: (state) => { state.experienceList = [...state.experienceList, {}] },
    modifyExperience: (state, action) => { state.experienceList[action.payload.index] = { ...state.experienceList[action.payload.index], [action.payload.key]: action.payload.value } },
    removeExperience: (state, action) => { state.experienceList = state.experienceList.filter((item, index) => index !== action.payload.index) },
    setShowExperienceLevel: (state, action) => { state.showExperienceLevel = action.payload.value },

    addEducation: (state) => { state.educationList = [...state.educationList, {}] },
    modifyEducation: (state, action) => { state.educationList[action.payload.index] = { ...state.educationList[action.payload.index], [action.payload.key]: action.payload.value } },
    removeEducation: (state, action) => { state.educationList = state.educationList.filter((item, index) => index !== action.payload.index) },

    addSkill: (state) => { state.skills = [...state.skills, { level: 50, name: '' }] },
    removeSkill: (state, action) => { state.skills = state.skills.filter((skill, index) => index !== action.payload.index) },
    modifySkill: (state, action) => { state.skills[action.payload.index] = { ...state.skills[action.payload.index], [action.payload.key]: action.payload.value } },

    addAdditionalSections: (state) => { state.additionalSections = [...state.additionalSections, {}] },
    removeAdditionalSections: (state, action) => { state.additionalSections = state.additionalSections.filter((skill, index) => index !== action.payload.index) },
    modifyAdditionalSections: (state, action) => { state.additionalSections[action.payload.index] = { ...state.additionalSections[action.payload.index], [action.payload.key]: action.payload.value } },

    modifySummary: (state, action) => { state.summary = action.payload.value }
  },
})

export const {
  nextStep,
  previousStep,
  setStep,
  setChoice,
  setSelectedTemplateIndex,
  setBasicInfo,
  addExperience,
  modifyExperience,
  removeExperience,
  setShowExperienceLevel,
  addEducation,
  modifyEducation,
  removeEducation,
  addSkill,
  removeSkill,
  modifySkill,
  addAdditionalSections,
  removeAdditionalSections,
  modifyAdditionalSections,
  modifySummary
} = buildResumeSlice.actions;

export default buildResumeSlice.reducer;
