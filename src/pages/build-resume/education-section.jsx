import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/button';
import Card from '../../components/glass-card';
import Textarea from '../../components/text-area';
import TextField from '../../components/text-fields';
import { addEducation, modifyEducation } from '../../features/build-resume-slice';

const EducationSection = () => {
  const dispatch = useDispatch();
  const { educationList } = useSelector((state) => state.buildPage);

  return (
    <div className="space-y-4">
      {educationList.map((education, index) => {
        return (
          <Card>
            <p className="text-sm font-medium mb-6">
              {education.title || 'TU Berlin'}, {education.location || 'Berlin, Germany'}, {education.degree || 'B.Sc. Computer Science'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="School name" placeholder="TU Berlin" value={education.title} onChange={(value) => dispatch(modifyEducation({ index, key: 'title', value }))} />
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
                  defaultChecked
                  checked={education.isPursuing}
                  onChange={({ target }) => dispatch(modifyEducation({ index, key: 'isPursuing', value: target.checked }))}
                />{' '}
                I'm still enrolled
              </label>
              <Textarea
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
        className="glass flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/70 py-3 text-sm font-medium transition hover:bg-white/70"
        onClick={() => dispatch(addEducation())}
      >
        Add education
      </PrimaryButton>
    </div>
  );
};

export default EducationSection;
