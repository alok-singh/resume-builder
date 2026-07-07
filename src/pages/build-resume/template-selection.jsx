import { useState } from 'react';
import PrimaryButton from '../../components/button';
import { Check } from 'lucide-react';
import { setSelectedTemplateId, buildingTemplates, setActiveThemeMap } from '../../features/build-resume-slice';
import { useDispatch, useSelector } from 'react-redux';
import { templateMap } from './resume-preview';

const getThemeKey = (theme) => {
  return `${theme.bg}-${theme.txt}`;
};

const TemplateSelectionSection = () => {
  const dispatch = useDispatch();
  const { selectedTemplateId, activeThemeMap } = useSelector((state) => state.buildPage);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {buildingTemplates.map((template, index) => {
        const active = selectedTemplateId === template.id;
        const Template = templateMap[template.id] || <div>Template not found</div>;
        return (
          <div
            className={`relative bg-linear-to-br bg-white/95 shadow-inner p-4 rounded-2xl cursor-pointer border-2 ${active ? 'border-[#eaeaea]' : ''}`}
            key={template.id}
            onClick={() => {
              dispatch(setSelectedTemplateId(template.id));
            }}
          >
            <div className={`glass overflow-scroll scrollbar-none text-left transition aspect-[1/1.414] zoom-[0.5]`}>
              <Template isMiniPreview={true} templateThemeColor={activeThemeMap[template.id]} />
            </div>
            {active && (
              <div className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white text-indigo-600 shadow">
                <Check className="h-4 w-4" />
              </div>
            )}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center justify-start gap-3">
                {template.themes.map((theme) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(setActiveThemeMap({ templateId: template.id, themeValue: theme }));
                      }}
                      key={`${template.id}-${getThemeKey(theme)}`}
                      style={{ backgroundColor: theme.bg }}
                      className={`cursor-pointer border-2 h-6 w-6 rounded-full ${activeThemeMap[template.id]?.bg === theme.bg ? 'border-[#ababab]' : ''}`}
                    />
                  );
                })}
              </div>
              <div className="text-xs text-white p-2 bg-[#a3b7c4] rounded">PDF</div>
            </div>
            <div>
              <p className="text-sm font-medium">{template.title}</p>
              <p className="text-xs text-muted-foreground pt-2">{template.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TemplateSelectionSection;
