import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/button';
import { buildingSteps, nextStep, previousStep } from '../../features/build-resume-slice';
import AddCustomSection from './add-custom-section';
import BasicInformationSection from './basic-information-section';
import DownloadPdfButton from './download-handler';
import EducationSection from './education-section';
import ExperienceSection from './experience-section';
import ImportSection from './import-section';
import LanguagesSection from './languages-section';
import ProgressSidebar from './progress-sidebar';
import ResumePreview from './resume-preview';
import SkillsSection from './skills-section';
import SummarySection from './summary-section';
import TemplateSelectionSection from './template-selection';

const BuilderHeaderSection = (props) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Step {props.currentStep + 1} of {buildingSteps.length}
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{buildingSteps[props.currentStep].label}</h2>
      </div>
      <div className="h-2 w-40 overflow-hidden rounded-full bg-white/60">
        <div className="h-full gradient-primary transition-all" style={{ width: `${(props.currentStep / (buildingSteps.length - 1)) * 100}%` }} />
      </div>
    </div>
  );
};

const BuildResumePage = () => {
  const previewRef = useRef(null);
  const dispatch = useDispatch();
  const buildPage = useSelector((state) => state.buildPage);
  const { step, selectedTemplateIndex } = buildPage;
  const showPreview = step >= 1;

  return (
    <div className="min-h-screen">
      <ProgressSidebar steps={buildingSteps} />
      <main className={`mx-auto grid max-w-350 gap-6 px-6 pb-16 pt-6 ${showPreview ? 'lg:grid-cols-[1fr_580px]' : ''}`}>
        <section className="glass-strong rounded-3xl p-8">
          <BuilderHeaderSection steps={buildingSteps} currentStep={step} />
          {step === 0 && <TemplateSelectionSection />}
          {step === 1 && <ImportSection />}
          {step === 2 && <BasicInformationSection />}
          {step === 3 && <ExperienceSection />}
          {step === 4 && <EducationSection />}
          {step === 5 && <SkillsSection />}
          {step === 6 && <LanguagesSection />}
          {step === 7 && <SummarySection />}
          {step === 8 && <AddCustomSection />}
          <div className="mt-8 flex items-center justify-between border-t border-white/40 pt-6">
            <PrimaryButton onClick={() => dispatch(previousStep())} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:bg-white/60 disabled:opacity-40">
              <ArrowLeft className="h-4 w-4" /> Back
            </PrimaryButton>
            {step < buildingSteps.length - 1 ? (
              <PrimaryButton onClick={() => dispatch(nextStep())} className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5">
                {' '}
                Continue <ArrowRight className="h-4 w-4" />{' '}
              </PrimaryButton>
            ) : (
              <DownloadPdfButton targetRef={previewRef} />
            )}
          </div>
        </section>
        {step >= 1 ? <ResumePreview previewRef={previewRef} /> : null}
      </main>
    </div>
  );
};

export default BuildResumePage;
