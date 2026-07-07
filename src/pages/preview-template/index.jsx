import { useState } from 'react';
import { templateMap } from '../build-resume/resume-preview';

import ResumeTemplate24 from '../../templates/ResumeTemplate24';
import ResumeTemplate25 from '../../templates/ResumeTemplate25';
import ResumeTemplate26 from '../../templates/ResumeTemplate26';
import ResumeTemplate27 from '../../templates/ResumeTemplate27';
import ResumeTemplate28 from '../../templates/ResumeTemplate28';
import ResumeTemplate29 from '../../templates/ResumeTemplate29';
import ResumeTemplate30 from '../../templates/ResumeTemplate30';
import ResumeTemplate31 from '../../templates/ResumeTemplate31';
import Executive from '../../templates/executive';

const PreviewTemplate = () => {
  const combinedTemplateMap = {
    ...templateMap,
    // resume_template_24: (props) => <ResumeTemplate24 {...props} />,
    // resume_template_25: (props) => <ResumeTemplate25 {...props} />,
    // resume_template_26: (props) => <ResumeTemplate26 {...props} />,
    // resume_template_27: (props) => <ResumeTemplate27 {...props} />,
    // resume_template_28: (props) => <ResumeTemplate28 {...props} />,
    // resume_template_29: (props) => <ResumeTemplate29 {...props} />,
    // resume_template_30: (props) => <ResumeTemplate30 {...props} />,
    // resume_template_31: (props) => <ResumeTemplate31 {...props} />,
    // executive: (props) => <Executive {...props} />
  };
  const templateList = Object.keys(combinedTemplateMap);
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateList[0]);
  const Template = combinedTemplateMap[selectedTemplateId];

  return (
    <div className="w-max max-w-4xl mx-auto">
      <select className="mb-4 rounded border p-2" value={selectedTemplateId} onChange={(e) => setSelectedTemplateId(e.target.value)}>
        {templateList.map((templateId) => {
          const Template = combinedTemplateMap[templateId];
          return (
            <option key={templateId} value={templateId}>
              {templateId}
            </option>
          );
        })}
      </select>
      <div className="aspect-[1/1.414] overflow-scroll">
        <Template />
      </div>
    </div>
  );
};

export default PreviewTemplate;
