import { Sparkles, Upload } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/button';
import { setChoice } from '../../features/build-resume-slice';

const ImportSection = (props) => {
  const dispatch = useDispatch();
  const { choice } = useSelector((state) => state.buildPage);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <PrimaryButton
          onClick={() => dispatch(setChoice('upload'))}
          className={`glass rounded-2xl p-6 text-left transition hover:bg-white/70 ${choice === 'upload' ? 'ring-2 ring-indigo-500' : ''}`}
        >
          <Upload className="mb-3 h-6 w-6 text-indigo-600" />
          <p className="font-medium">I have a resume</p>
          <p className="mt-1 text-sm text-muted-foreground">Upload a PDF or DOCX. We&apos;ll parse the fields for you.</p>
        </PrimaryButton>
        <PrimaryButton
          onClick={() => dispatch(setChoice('scratch'))}
          className={`glass rounded-2xl p-6 text-left transition hover:bg-white/70 ${choice === 'scratch' ? 'ring-2 ring-indigo-500' : ''}`}
        >
          <Sparkles className="mb-3 h-6 w-6 text-fuchsia-600" />
          <p className="font-medium">Start from scratch</p>
          <p className="mt-1 text-sm text-muted-foreground">Type your details in. We&apos;ll guide you step-by-step.</p>
        </PrimaryButton>
      </div>

      {choice === 'upload' && (
        <label className="glass-input flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/80 p-10 text-center transition hover:bg-white/60">
          <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-medium">Drop your resume here</p>
          <p className="text-sm text-muted-foreground">PDF, DOCX up to 10MB</p>
          <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => e.target.files?.[0] && toast.success('Parsed', { description: e.target.files[0].name })} />
        </label>
      )}
    </div>
  );
};

export default ImportSection;
