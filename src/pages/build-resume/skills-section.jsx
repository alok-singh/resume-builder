import { useDispatch, useSelector } from 'react-redux';
import { addSkill, modifySkill, removeSkill } from '../../features/build-resume-slice';
import TextField from '../../components/text-fields';
import PrimaryButton from '../../components/button';
import { X } from 'lucide-react';
import Card from '../../components/glass-card';

const SkillsSection = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.buildPage);

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <Card key={index}>
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
            <TextField label="Skill" placeholder="TypeScript" value={skill.name} onChange={(value) => dispatch(modifySkill({ index, key: 'name', value }))} />
            <div>
              <label className="mb-1.5 block text-sm font-medium">Level</label>
              <input
                type="range"
                min={0}
                max={100}
                value={skill.level}
                onChange={({ target }) => dispatch(modifySkill({ index, key: 'level', value: target.value }))}
                className="w-full accent-indigo-500"
              />
              <p className="mt-1 text-xs text-muted-foreground">{skill.level}%</p>
            </div>
            <PrimaryButton onClick={() => dispatch(removeSkill({ index }))} className="grid h-9 w-9 place-items-center rounded-full bg-white/70 hover:bg-white">
              <X className="h-4 w-4" />
            </PrimaryButton>
          </div>
        </Card>
      ))}
      <PrimaryButton
        className="glass flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/70 py-3 text-sm font-medium transition hover:bg-white/70"
        onClick={() => dispatch(addSkill())}
      >
        Add skill
      </PrimaryButton>
    </div>
  );
};

export default SkillsSection;
