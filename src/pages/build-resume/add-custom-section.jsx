import { useDispatch, useSelector } from 'react-redux';
import { addAdditionalSections, removeAdditionalSections, modifyAdditionalSections } from '../../features/build-resume-slice';
import Card from '../../components/glass-card';
import TextField from '../../components/text-fields';
import Textarea from '../../components/text-area';
import PrimaryButton from '../../components/button';
import { PlusCircle, X } from 'lucide-react';

const AddCustomSection = () => {
  const dispatch = useDispatch();
  const { additionalSections } = useSelector((state) => state.buildPage);

  return (
    <div className="space-y-4">
      {additionalSections.map((section, index) => {
        return (
          <Card className="relative">
            <p className="text-sm font-medium mb-6">{section.title || 'Achievements'}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                fullWidth={true}
                label="Section Title"
                placeholder="Achievements"
                value={section.title}
                onChange={(value) => dispatch(modifyAdditionalSections({ index, key: 'title', value }))}
              />
              <Textarea
                label="Description"
                className="sm:col-span-2"
                placeholder="Got dean's medal"
                value={section.description}
                onChange={(value) => dispatch(modifyAdditionalSections({ index, key: 'description', value }))}
              />
            </div>
            <button
              onClick={() => dispatch(removeAdditionalSections({ index }))}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/70 hover:bg-white absolute top-3 right-3 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </Card>
        );
      })}
      <PrimaryButton
        className="glass flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/70 py-3 text-sm font-medium transition hover:bg-white/70"
        onClick={() => dispatch(addAdditionalSections())}
      >
        <PlusCircle className="grid h-5 w-5 place-items-center rounded-full" />
        Add Another Section
      </PrimaryButton>
    </div>
  );
};

export default AddCustomSection;
