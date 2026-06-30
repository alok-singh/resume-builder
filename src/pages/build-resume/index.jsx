import { ArrowLeft, ArrowRight, Briefcase, Columns3Cog, Download, FileText, GraduationCap, GripVertical, ListChecks, Plus, Sparkles, Upload, User, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import PrimaryButton from '../../components/button';
import ResumePreview from './resume-preview';
import { nextStep, previousStep } from '../../features/build-resume-slice';
import AddCustomSection from './add-custom-section';
import BasicInformationSection from './basic-information-section';
import EducationSection from './education-section';
import ExperienceSection from './experience-section';
import FinalizeSection from './finalize-section';
import ImportSection from './import-section';
import ProgressSidebar from './progress-sidebar';
import SkillsSection from './skills-section';
import SummarySection from './summary-section';
import TemplateSelectionSection from './template-selection';
import MinimalResume from '../../templates/minimal';

const STEPS = [
  { label: 'Template', icon: FileText },
  { label: 'Import', icon: Upload },
  { label: 'Basics', icon: User },
  { label: 'Experience', icon: Briefcase },
  { label: 'Education', icon: GraduationCap },
  { label: 'Skills', icon: ListChecks },
  { label: 'Summary', icon: Sparkles },
  { label: 'Finalize', icon: Download }
];

const TEMPLATES = [
  { id: 'modernist', name: 'Modernist', accent: 'from-fuchsia-400 to-indigo-500' },
  { id: 'editorial', name: 'Editorial', accent: 'from-amber-300 to-rose-400' },
  { id: 'minimal', name: 'Minimal', accent: 'from-emerald-300 to-cyan-500' },
  { id: 'classic', name: 'Classic', accent: 'from-sky-300 to-violet-500' },
  { id: 'mono', name: 'Mono', accent: 'from-slate-400 to-slate-700' },
  { id: 'vivid', name: 'Vivid', accent: 'from-orange-400 to-pink-500' }
];

const BuilderHeaderSection = (props) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Step {props.currentStep + 1} of {props.steps.length}
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{props.steps[props.currentStep].label}</h2>
      </div>
      <div className="h-2 w-40 overflow-hidden rounded-full bg-white/60">
        <div className="h-full gradient-primary transition-all" style={{ width: `${(props.currentStep / (props.steps.length - 1)) * 100}%` }} />
      </div>
    </div>
  );
};

const BuildResumePage = () => {
  const dispatch = useDispatch();
  const buildPage = useSelector((state) => state.buildPage);
  const { step, selectedTemplateIndex } = buildPage;
  return (
    <div className="min-h-screen">
      <main className="mx-auto grid max-w-350 gap-6 px-6 pb-16 pt-6 lg:grid-cols-[220px_1fr_360px]">
        <ProgressSidebar steps={STEPS} />
        <section className="glass-strong rounded-3xl p-8">
          <BuilderHeaderSection steps={STEPS} currentStep={step} />
          {step === 0 && <TemplateSelectionSection templates={TEMPLATES} />}
          {step === 1 && <ImportSection />}
          {step === 2 && <BasicInformationSection />}
          {step === 3 && <ExperienceSection />}
          {step === 4 && <EducationSection />}
          {step === 5 && <SkillsSection />}
          {step === 6 && <SummarySection />}
          {step === 7 && <AddCustomSection />}
          <div className="mt-8 flex items-center justify-between border-t border-white/40 pt-6">
            <PrimaryButton
              onClick={() => dispatch(previousStep())}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:bg-white/60 disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </PrimaryButton>
            <PrimaryButton
              onClick={() => (step < STEPS.length - 1 ? dispatch(nextStep()) : toast.success('PDF ready', { description: 'Your resume is downloading…' }))}
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
            >
              {step < STEPS.length - 1 ? (
                <>
                  Continue <ArrowRight className="h-4 w-4" />{' '}
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </>
              )}
            </PrimaryButton>
          </div>
        </section>
        <ResumePreview {...buildPage} />
      </main>
    </div>
  );
};

export default BuildResumePage;
