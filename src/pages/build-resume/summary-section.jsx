import { Sparkles } from 'lucide-react';
import Textarea from '../../components/text-area';
import PrimaryButton from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { modifySummary } from '../../features/build-resume-slice';

const SummarySection = () => {
  const dispatch = useDispatch();
  const { summary } = useSelector((state) => state.buildPage);
  return (
    <div className="space-y-4">
      <Textarea
        value={summary}
        onChange={(value) => dispatch(modifySummary({ value }))}
        label="Professional summary"
        rows={8}
        placeholder="Frontend engineer with 8+ years of experience building delightful, accessible interfaces…"
      />
      <div className="glass flex items-start gap-3 rounded-2xl p-4">
        <Sparkles className="mt-0.5 h-5 w-5 text-fuchsia-500" />
        <div className="text-sm">
          <p className="font-medium">Need inspiration?</p>
          <p className="text-muted-foreground">Tap “Improve with AI” to rewrite your summary in 3 styles.</p>
        </div>
        <PrimaryButton className="ml-auto rounded-full gradient-primary px-4 py-2 text-xs font-medium text-white">Improve with AI</PrimaryButton>
      </div>
    </div>
  );
};

export default SummarySection;
