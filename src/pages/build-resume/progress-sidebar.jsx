import { Check } from 'lucide-react';
import PrimaryButton from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../features/build-resume-slice';

const ProgressSidebar = (props) => {
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.buildPage);

  return (
    <aside className="glass h-fit rounded-3xl p-4 lg:sticky lg:top-24">
      <p className="px-2 pb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Steps</p>
      <ol className="space-y-1">
        {props.steps.map((item, index) => {
          const Icon = item.icon;
          const active = step === index;
          const done = step > index;
          return (
            <li key={index}>
              <PrimaryButton
                onClick={() => dispatch(setStep(index))}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? 'bg-white/80 shadow-sm' : 'hover:bg-white/50'}`}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-lg ${done ? 'bg-emerald-500 text-white' : active ? 'gradient-primary text-white' : 'bg-white/60 text-muted-foreground'}`}
                >
                  {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className={active ? 'font-medium' : ''}>{item.label}</span>
              </PrimaryButton>
            </li>
          );
        })}
      </ol>
    </aside>
  );
};

export default ProgressSidebar;
