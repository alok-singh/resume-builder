import { Check } from 'lucide-react';
import PrimaryButton from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, buildingSteps } from '../../features/build-resume-slice';
import iconMap from '../../components/icon-map';

const ProgressSidebar = () => {
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.buildPage);

  return (
    <div className="mx-auto max-w-350 px-6 mt-6">
      <div className="glass rounded-full p-2">
        <ol className="flex items-center gap-2">
          {buildingSteps.map((item, index) => {
            const Icon = iconMap[item.icon];
            const active = step === index;
            const done = step > index;
            return (
              <li key={index} className="flex-1">
                <PrimaryButton onClick={() => dispatch(setStep(index))} className={`flex w-full items-center gap-2 px-3 py-2.5 text-sm rounded-full transition hover:bg-white/60 ${active ? 'bg-white/80 shadow-sm' : ''}`}>
                  <span className={`grid h-7 w-7 place-items-center rounded-lg ${done ? 'bg-emerald-500 text-white' : active ? 'gradient-primary text-white' : 'bg-white/60 text-muted-foreground'}`}>{done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}</span>
                  <span>
                    <span className={active ? 'font-medium' : ''}>{item.label}</span>
                    {active && (
                      <p className="text-[10px] text-muted-foreground text-left">
                        Step {index + 1} of {buildingSteps.length}
                      </p>
                    )}
                  </span>
                </PrimaryButton>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ProgressSidebar;
