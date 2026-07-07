import { PlusCircle, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/button';
import Card from '../../components/glass-card';
import TextField from '../../components/text-fields';
import Toggle from '../../components/toggle';
import { addSkill, modifySkill, removeSkill, setShowExperienceLevel } from '../../features/build-resume-slice';

const SkillsSection = () => {
  const dispatch = useDispatch();
  const { skills, showExperienceLevel } = useSelector((state) => state.buildPage);
  return (
    <div>
      <Toggle enabled={showExperienceLevel} onChange={(value) => dispatch(setShowExperienceLevel({ value }))} label="Show experience level" />
      <div className="space-y-4 mt-4">
        {skills.map((skill, index) => (
          <Card key={`skills-${index}`}>
            <div className={`grid gap-4 ${showExperienceLevel ? 'sm:grid-cols-[1fr_1fr_auto]' : 'sm:grid-cols-[1fr_auto]'} sm:items-center`}>
              <TextField label="Skill" placeholder="TypeScript" value={skill.name} onChange={(value) => dispatch(modifySkill({ index, key: 'name', value }))} />
              {showExperienceLevel ? (
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Level <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input type="range" min={0} max={100} value={skill.level} onChange={({ target }) => dispatch(modifySkill({ index, key: 'level', value: target.value }))} className="w-full accent-indigo-500" />
                  <p className="mt-1 text-xs text-muted-foreground">{skill.level}%</p>
                </div>
              ) : null}

              <button type="button" onClick={() => dispatch(removeSkill({ index }))} className="hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-50 self-end mb-1 cursor-pointer" title="Delete Level Entry">
                <Trash2 size={18} strokeWidth={2} />
              </button>
            </div>
          </Card>
        ))}
        <PrimaryButton className="glass flex w-full mt-12 items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/70 py-3 text-sm font-medium transition hover:bg-white/70" onClick={() => dispatch(addSkill())}>
          <PlusCircle className="grid h-5 w-5 place-items-center rounded-full" />
          Add skill
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SkillsSection;
