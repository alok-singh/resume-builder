import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/button';
import Card from '../../components/glass-card';
import Textarea from '../../components/text-area';
import TextField from '../../components/text-fields';
import { addEducation, modifyEducation, removeEducation } from '../../features/build-resume-slice';
import { PlusCircle, Trash2 } from 'lucide-react';

const EducationSection = () => {
  const dispatch = useDispatch();
  const { educationList } = useSelector((state) => state.buildPage);

  return (
    <div className="space-y-4">
      {educationList.map((education, index) => {
        return (
          <Card className="relative">
            <button
              type="button"
              onClick={() => dispatch(removeEducation({ index }))}
              className="hover:text-red-400 absolute top-4 right-4 transition-colors p-2 rounded-lg hover:bg-slate-50 self-end mb-1 cursor-pointer"
              title="Delete Level Entry"
            >
              <Trash2 size={18} strokeWidth={2} />
            </button>
            <p className="text-sm font-medium mb-6">
              {education.schoolName || 'TU Berlin'}, {education.location || 'Berlin, Germany'}, {education.degree || 'B.Sc. Computer Science'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="School name" placeholder="TU Berlin" value={education.schoolName} onChange={(value) => dispatch(modifyEducation({ index, key: 'schoolName', value }))} />
              <TextField
                label="Location"
                placeholder="Berlin, Germany"
                value={education.location}
                onChange={(value) => dispatch(modifyEducation({ index, key: 'location', value }))}
              />
              <TextField
                label="Degree"
                placeholder="B.Sc. Computer Science"
                value={education.degree}
                onChange={(value) => dispatch(modifyEducation({ index, key: 'degree', value }))}
              />
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Start" placeholder="09/2017" value={education.start} onChange={(value) => dispatch(modifyEducation({ index, key: 'start', value }))} />
                <TextField label="End" placeholder="06/2021" value={education.end} onChange={(value) => dispatch(modifyEducation({ index, key: 'end', value }))} />
              </div>
              <label className="sm:col-span-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded"
                  checked={education.isPursuing}
                  onChange={({ target }) => dispatch(modifyEducation({ index, key: 'isPursuing', value: target.checked }))}
                />{' '}
                I'm still enrolled
              </label>
              <Textarea
                keyId={`education-section-${index}`}
                label="Description"
                className="sm:col-span-2"
                placeholder="Thesis: real-time collaboration over CRDTs."
                value={education.description}
                onChange={(value) => dispatch(modifyEducation({ index, key: 'description', value }))}
              />
            </div>
          </Card>
        );
      })}
      <PrimaryButton
        className="glass flex mt-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/70 py-3 text-sm font-medium transition hover:bg-white/70"
        onClick={() => dispatch(addEducation())}
      >
        <PlusCircle className="grid h-5 w-5 place-items-center rounded-full" />
        Add education
      </PrimaryButton>
    </div>
  );
};

export default EducationSection;
