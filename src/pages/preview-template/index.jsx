import { useParams } from 'react-router-dom';
import ConvertToA4 from '../../components/convert-to-a4';
import { buildingTemplates } from '../../features/build-resume-slice';
import { templateConfigMap, templateMap } from '../build-resume/resume-preview';
import PrintPreview from '../../components/paged';

const PreviewTemplate = () => {
  const { templateId, activeThemeIndex = 0 } = useParams();
  const currentTemplateId = templateId?.toLowerCase();
  const templateList = Object.keys(templateMap);
  const Template = templateMap[currentTemplateId];
  const activeTemplate = buildingTemplates.find((item) => item.id === currentTemplateId) || buildingTemplates[0];
  const { padding, zoom } = templateConfigMap[currentTemplateId];

  return (
    <div className="bg-[#300]">
      <div className="mx-auto w-5xl" id="main-preview">
        <ConvertToA4 pagePadding={padding}>
          <Template style={{ zoom }} templateThemeColor={activeTemplate.themes[activeThemeIndex]} />
        </ConvertToA4>
        {/* <PrintPreview title="title" margin="0mm">
          <Template style={{ zoom: 1 }} templateThemeColor={activeTemplate.themes[activeThemeIndex]} />
        </PrintPreview> */}
      </div>
    </div>
  );
};

export default PreviewTemplate;
