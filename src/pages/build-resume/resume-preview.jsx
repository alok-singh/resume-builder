import ConvertToA4 from '../../components/convert-to-a4';
import MinimalResume from '../../templates/minimal';

const ResumePreview = (props) => {
  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="glass rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium">Live preview</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-700">Auto-saved</span>
        </div>
        <ConvertToA4>
          <MinimalResume {...props} />
        </ConvertToA4>
      </div>
    </aside>
  );
};

export default ResumePreview;
