import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/button';
import Card from '../../components/glass-card';
import Textarea from '../../components/text-area';
import TextField from '../../components/text-fields';
import { addExperience, modifyExperience, removeExperience } from '../../features/build-resume-slice';
import { PlusCircle, Trash2 } from 'lucide-react';

const ExperienceSection = () => {
  const dispatch = useDispatch();
  const { experienceList } = useSelector((state) => state.buildPage);
  return (
    <div className="space-y-8">
      {experienceList.map((experience, index) => {
        return (
          <Card className="relative">
            <button
              type="button"
              onClick={() => dispatch(removeExperience({ index }))}
              className="hover:text-red-400 absolute top-4 right-4 transition-colors p-2 rounded-lg hover:bg-slate-50 self-end mb-1 cursor-pointer"
              title="Delete Level Entry"
            >
              <Trash2 size={18} strokeWidth={2} />
            </button>
            <p className="text-sm font-medium mb-6">
              {experience.title || 'Senior Frontend Engineer'}, {experience.employer || 'Nimbus Labs'}, {experience.location || 'Berlin, Germany'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Job title"
                placeholder="Senior Frontend Engineer"
                value={experience.title}
                onChange={(value) => dispatch(modifyExperience({ index, key: 'title', value }))}
              />
              <TextField
                label="Employer"
                placeholder="Nimbus Labs"
                value={experience.employer}
                onChange={(value) => dispatch(modifyExperience({ index, key: 'employer', value }))}
              />
              <TextField
                label="Location"
                placeholder="Berlin, Germany"
                value={experience.location}
                onChange={(value) => dispatch(modifyExperience({ index, key: 'location', value }))}
              />
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Start" placeholder="03/2022" value={experience.start} onChange={(value) => dispatch(modifyExperience({ index, key: 'start', value }))} />
                <TextField label="End" placeholder="Present" value={experience.end} onChange={(value) => dispatch(modifyExperience({ index, key: 'end', value }))} />
              </div>
              <label className="sm:col-span-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded"
                  checked={experience.isCurrentJob}
                  onChange={({ target }) => dispatch(modifyExperience({ index, key: 'isCurrentJob', value: target.checked }))}
                />{' '}
                I currently work here
              </label>
              <Textarea
                keyId={`experience-section-${index}`}
                label="Description"
                className="sm:col-span-2"
                placeholder="Led the redesign of the design-system, …"
                value={experience.description}
                onChange={(value) => dispatch(modifyExperience({ index, key: 'description', value }))}
              />
            </div>
          </Card>
        );
      })}
      <PrimaryButton
        className="glass flex mt-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/70 py-3 text-sm font-medium transition hover:bg-white/70"
        onClick={() => dispatch(addExperience())}
      >
        <PlusCircle className="grid h-5 w-5 place-items-center rounded-full" />
        Add experience
      </PrimaryButton>
    </div>
  );
};

export default ExperienceSection;
