import { createSlice } from '@reduxjs/toolkit';
import data from '../data/candidate-1-data.json';

export const buildingSteps = [
  { label: 'Template', icon: 'file_text' },
  { label: 'Import', icon: 'upload' },
  { label: 'Basics', icon: 'user' },
  { label: 'Experience', icon: 'briefcase' },
  { label: 'Education', icon: 'graduation_cap' },
  { label: 'Skills', icon: 'list_checks' },
  { label: 'Languages', icon: 'languages' },
  { label: 'Summary', icon: 'sparkles' },
  { label: 'Finalize', icon: 'download' }
];

export const buildingTemplates = [
  {
    id: 'celestial',
    title: 'Celestial',
    description: 'Subtle elegance with refined typography for a polished, professional presentation.',
    themes: [{ bg: '#f2f2f2', txt: '#333' }, { bg: '#333333', txt: '#ffffff' }, { bg: '#335776', txt: '#ffffff' }, { bg: '#469fbe', txt: '#ffffff' }, { bg: '#62c1b1', txt: '#ffffff' }]
  },
  {
    id: 'galaxy',
    title: 'Galaxy',
    description: 'Visually compelling design that effectively showcases the breadth and depth of your expertise.',
    themes: [{ bg: '#f3f3f3' }, { bg: '#f0e8e8' }, { bg: '#dae7f7' }, { bg: '#e5e8db' }, { bg: '#ffeee0' }]
  },
  {
    id: 'astral',
    title: 'Astral',
    description: 'Incorporates a prominent profile image that adds a personal dimension while preserving professionalism.',
    themes: [{ bg: '#dbdcdd' }, { bg: '#ebe0d9' }, { bg: '#dad8c3' }, { bg: '#d5beaf' }]
  },
  {
    id: 'eclipse',
    title: 'Eclipse',
    description: 'Sophisticated design that gracefully highlights your key accomplishments and career milestones.',
    themes: [{ bg: 'rgba(0, 0, 0, 0)' }]
  },
  {
    id: 'astralis',
    title: 'Astralis',
    description: 'Contemporary format featuring a clean, well-organized layout for maximum clarity.',
    themes: [{ bg: '#016b5d', txt: '#f4f55d' }, { bg: '#084d73', txt: '#2ed87a' }, { bg: '#27284b', 'txt': '#fa5701' }, { bg: '#755139', txt: '#f4f0dc' }]
  },
  {
    id: 'orbit',
    title: 'Orbit',
    description: 'Dynamic yet balanced presentation of your professional journey and key achievements.',
    themes: [{ bg: 'rgba(0, 0, 0, 0)' }]
  },
  {
    id: 'comet',
    title: 'Comet',
    description: 'Vibrant palette with carefully chosen accents that bring energy to your presentation.',
    themes: [{ bg: '#ffe14d' }, { bg: '#fe9735' }, { bg: '#92d8e2' }, { bg: '#f6afac' }, { bg: '#6196eb' }]
  },
  {
    id: 'solstice',
    title: 'Solstice',
    description: 'Distinguished design that authentically reflects your unique professional identity and expertise.',
    themes: [{ bg: '#02061b' }, { bg: '#112a72' }, { bg: '#2c98de' }, { bg: '#00bca3' }, { bg: '#9b3016' }]
  },
  {
    id: 'pulsar',
    title: 'Pulsar',
    description: 'Luminous design crafted for professionals seeking to make a memorable impression.',
    themes: [{ bg: '#f1eff0' }, { bg: '#c6ebff' }, { bg: '#fffcad' }, { bg: '#ffddf6' }, { bg: '#e19ff9' }, { bg: '#efffd6' }]
  },
  {
    id: 'quasar',
    title: 'Quasar',
    description: 'Forward-thinking format designed for innovation-focused professionals and tech leaders.',
    themes: [{ bg: '#2e404a' }]
  },
  {
    id: 'nebular',
    title: 'Nebular',
    description: 'Contemporary design that elegantly elevates your personal brand and professional narrative.',
    themes: [{ bg: '#f2f2f2' }, { bg: '#d4e7fd' }, { bg: '#dcf4e6' }, { bg: '#f4f0dc' }]
  },
  {
    id: 'nova',
    title: 'Nova',
    description: 'Purposeful design that thoughtfully highlights transformative moments in your career journey.',
    themes: [{ bg: '#9dbaca' }, { bg: '#ceedff' }, { bg: '#f9dedc' }, { bg: '#e4f7ea' }, { bg: '#fff4e4' }]
  },
  {
    id: 'aurora',
    title: 'Aurora',
    description: 'Energetic yet refined design ideal for presenting dynamic career accomplishments.',
    themes: [{ bg: '#ffadcb' }, { bg: '#adc9ff' }, { bg: '#ffd0ad' }, { bg: '#bad8bd' }, { bg: '#ebbefb' }, { bg: '#ffbfbf' }]
  },
  {
    id: 'hyperion',
    title: 'Hyperion',
    description: 'Refined typography and thoughtful structure combine to create a confident, polished impression.',
    themes: [{ bg: '#8c8c8c' }, { bg: '#333333' }, { bg: '#335776' }, { bg: '#469fbe' }, { bg: '#62c1b1' }]
  },
  {
    id: 'lunar',
    title: 'Lunar',
    description: 'Minimalist elegance that emphasizes clarity and precision in your professional narrative.',
    themes: [{ bg: 'rgba(0, 0, 0, 0)' }]
  },
  {
    id: 'stellar',
    title: 'Stellar',
    description: 'Sleek presentation that beautifully emphasizes your standout achievements and professional excellence.',
    themes: [{ bg: 'rgba(0, 0, 0, 0)' }]
  },
  {
    id: 'zenith',
    title: 'Zenith',
    description: 'Minimalist sophistication that emphasizes clarity and lasting professional impact.',
    themes: [{ bg: '#e9f1e2' }, { bg: '#f3f0e9' }, { bg: '#e2f1f1' }, { bg: '#f6eaf6' }]
  },
  {
    id: 'aether',
    title: 'Aether',
    description: 'Precisely structured format that presents your expertise with quiet professionalism.',
    themes: [{ bg: 'rgba(0, 0, 0, 0)' }]
  },
  {
    id: 'nebula',
    title: 'Nebula',
    description: 'Creative framework that gracefully accommodates and showcases diverse skills and experiences.',
    themes: [{ bg: '#6ec9ff' }, { bg: '#9dbaca' }, { bg: '#ffde89' }, { bg: '#edb4a6' }, { bg: '#ffc1b9' }, { bg: '#a4cba8' }]
  },
  {
    id: 'eon',
    title: 'Eon',
    description: 'Uncluttered design that places your qualifications in well-deserved focus.',
    themes: [{ bg: '#333333' }]
  },
  {
    id: 'cosmos',
    title: 'Cosmos',
    description: 'Comprehensive format offering a complete and cohesive view of your professional narrative.',
    themes: [{ bg: '#a3bb95' }, { bg: '#eda8b0' }, { bg: '#818181' }, { bg: '#c77f7f' }]
  },
  {
    id: 'starburst',
    title: 'Starburst',
    description: 'Contemporary design featuring thoughtful structure and modern aesthetic throughout.',
    themes: [{ bg: '#303030' }, { bg: '#7e918f' }, { bg: '#837a74' }, { bg: '#7b7f82' }, { bg: '#b7a39d' }]
  },
  {
    id: 'exoplanet',
    title: 'Exoplanet',
    description: 'Organized simplicity paired with refined, clean design principles.',
    themes: [{ bg: '#333333' }, { bg: '#bd957e' }, { bg: '#469fbe' }, { bg: '#62c1b1' }, { bg: '#8a62c1' }, { bg: '#a6c162' }]
  },
  {
    id: 'axis',
    title: 'Axis',
    description: 'Commanding layout with thoughtful contrast that optimizes both clarity and professional impact.',
    themes: [{ bg: '#ccdfef', txt: '#333' }, { bg: '#041929', txt: '#fff' }, { bg: '#ebebeb', txt: '#333' }, { bg: '#320201', txt: '#fff' }]
  },
  {
    id: 'keystone',
    title: 'Keystone',
    description: 'Soft blue accents combined with clean sidebar structure create a serene, well-organized presentation.',
    themes: [{ bg: '#e9ebed' }, { bg: '#dce7f7', txt: 'black' }, { bg: '#061023', txt: '#fff', sideBg: '#061023', sideTxt: '#fff' }, { bg: '#003d42', txt: '#fff' }]
  },
  {
    id: 'helix',
    title: 'Helix',
    description: 'Sophisticated design with thoughtful use of whitespace and circular elements for a refined presentation.',
    themes: [{ bg: '#e9ebed', nameColor: 'black' }, { bg: '#092969', txt: '#fff' }, { bg: '#061023', txt: '#fff' }, { bg: '#320101', txt: '#fff' }]
  },
  {
    id: 'horizon',
    title: 'Horizon',
    description: 'Elegant bordered format with timeless appeal, ideal for traditional industries valuing sophistication.',
    themes: [{ bg: '#061023' }, { bg: '#3116ad', sideTxt: '#3116ad' }, { bg: '#e3e6ea' }, { bg: '#092969', sideTxt: '#092969' }]
  },
  {
    id: 'quantum',
    title: 'Quantum',
    description: 'Thoughtfully designed split-column layout that elegantly balances skills with career experience.',
    themes: [{ bg: '#092969' }, { bg: '#3116ad' }, { bg: '#320101' }, { bg: '#003d42' }]
  },
  {
    id: 'classic_euro_pass',
    title: 'Classic Europass',
    description: 'Refined sidebar accents and circular portrait add sophistication to the trusted Europass structure.',
    themes: [
      { sideTxt: '#333', bg: '#E1F1FF', txt: '#3685FC' },
      { sideTxt: '#FFF', bg: '#092969', txt: '#092969' },
      { sideTxt: '#FFF', bg: '#094c41', txt: '#094c41' },
      { sideTxt: '#FFF', bg: '#7851a9', txt: '#7851a9' },
    ]
  },
  {
    id: 'modern_clean',
    title: 'Modern Clean',
    description: 'Modern layout with strategic use of sections to gracefully organize and prioritize your professional information.',
    themes: [{ bg: '#3685fc', sideBg: '#d6eaff' }, { bg: '#ff6600', sideBg: '#FFECBA' }, { bg: '#569e00', sideBg: '#E8F3DB' }, { bg: '#ac17e7', sideBg: '#F0E5FF' }]
  },
  {
    id: 'professional_sidebar',
    title: 'Professional Sidebar',
    description: 'Balanced two-column layout that thoughtfully organizes personal details, skills, and linguistic abilities.',
    themes: [{ bg: '#092969', sideBg: '#ebeef3' }, { bg: '#691cdd', sideBg: '#f3ebfc' }, { bg: '#320101', sideBg: '#efebeb' }, { bg: '#003d42', sideBg: '#ebf0f0' }]
  },
  {
    id: 'two_column_balanced',
    title: 'Two-Column Balanced',
    description: 'Harmonious two-column design with balanced visual elements that elegantly showcase your professional journey.',
    themes: [{ bg: '#5a61a9' }, { bg: '#4795a6' }, { bg: '#a67a47' }, { bg: '#3685fc' }]
  },
  {
    id: 'executive',
    title: 'Executive',
    description: 'Streamlined single-column format optimized for clarity, accessibility, and professional presentation.',
    themes: [{ bg: '#87c3ff' }, { bg: '#53acb0' }, { bg: '#938ddd' }, { bg: '#ef4052' }]
  }
]

export const buildResumeSlice = createSlice({
  name: 'build_resume_state',
  initialState: {
    step: 0,
    choice: '',
    selectedTemplateId: '',
    basicInfo: data.basicInfo,
    experienceList: data.experienceList,
    educationList: data.educationList,
    skills: data.skills,
    summary: data.summary,
    showExperienceLevel: data.showExperienceLevel,
    showLanguageLevel: data.showLanguageLevel,
    additionalSections: data.additionalSections,
    languages: data.languages,
    activeThemeMap: {}
  },
  reducers: {
    nextStep: (state) => { state.step = Math.min(buildingSteps.length - 1, state.step + 1) },
    previousStep: (state) => { state.step = Math.max(0, state.step - 1) },
    setStep: (state, action) => { state.step = action.payload },
    setChoice: (state, action) => { state.choice = action.payload },
    setSelectedTemplateId: (state, action) => { state.selectedTemplateId = action.payload },
    setBasicInfo: (state, action) => { state.basicInfo = { ...state.basicInfo, ...action.payload } },
    addExperience: (state) => { state.experienceList = [...state.experienceList, {}] },
    modifyExperience: (state, action) => { state.experienceList[action.payload.index] = { ...state.experienceList[action.payload.index], [action.payload.key]: action.payload.value } },
    removeExperience: (state, action) => { state.experienceList = state.experienceList.filter((item, index) => index !== action.payload.index) },
    setShowExperienceLevel: (state, action) => { state.showExperienceLevel = action.payload.value },

    addEducation: (state) => { state.educationList = [...state.educationList, {}] },
    modifyEducation: (state, action) => { state.educationList[action.payload.index] = { ...state.educationList[action.payload.index], [action.payload.key]: action.payload.value } },
    removeEducation: (state, action) => { state.educationList = state.educationList.filter((item, index) => index !== action.payload.index) },
    setShowLanguageLevel: (state, action) => { state.showLanguageLevel = action.payload.value },

    addSkill: (state) => { state.skills = [...state.skills, { level: 50, name: '' }] },
    removeSkill: (state, action) => { state.skills = state.skills.filter((skill, index) => index !== action.payload.index) },
    modifySkill: (state, action) => { state.skills[action.payload.index] = { ...state.skills[action.payload.index], [action.payload.key]: action.payload.value } },

    addLanguage: (state) => { state.languages = [...state.languages, { level: 50, name: '' }] },
    removeLanguage: (state, action) => { state.languages = state.languages.filter((languages, index) => index !== action.payload.index) },
    modifyLanguage: (state, action) => { state.languages[action.payload.index] = { ...state.languages[action.payload.index], [action.payload.key]: action.payload.value } },

    addAdditionalSections: (state) => { state.additionalSections = [...state.additionalSections, {}] },
    removeAdditionalSections: (state, action) => { state.additionalSections = state.additionalSections.filter((skill, index) => index !== action.payload.index) },
    modifyAdditionalSections: (state, action) => { state.additionalSections[action.payload.index] = { ...state.additionalSections[action.payload.index], [action.payload.key]: action.payload.value } },

    modifySummary: (state, action) => { state.summary = action.payload.value },
    setActiveThemeMap: (state, action) => { state.activeThemeMap = { ...state.activeThemeMap, [action.payload.templateId]: action.payload.themeValue } }
  },
})

export const {
  nextStep,
  previousStep,
  setStep,
  setChoice,
  setSelectedTemplateId,
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
  addLanguage,
  removeLanguage,
  modifyLanguage,
  setShowLanguageLevel,
  addAdditionalSections,
  removeAdditionalSections,
  modifyAdditionalSections,
  modifySummary,
  setActiveThemeMap,
} = buildResumeSlice.actions;

export default buildResumeSlice.reducer;
