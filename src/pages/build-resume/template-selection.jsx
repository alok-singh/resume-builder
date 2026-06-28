import { useState } from 'react';
import PrimaryButton from '../../components/button';
import { Check } from 'lucide-react';
import { setSelectedTemplateIndex } from '../../features/build-resume-slice';
import { useDispatch, useSelector } from 'react-redux';

const TemplateSelectionSection = (props) => {
  const dispatch = useDispatch();
  const { selectedTemplateIndex } = useSelector((state) => state.buildPage);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {props.templates.map((template, index) => {
        const active = selectedTemplateIndex === index;
        return (
          <PrimaryButton
            key={template.name}
            onClick={() => dispatch(setSelectedTemplateIndex(index))}
            className={`glass overflow-hidden rounded-2xl text-left transition ${active ? 'ring-2 ring-indigo-500' : 'hover:bg-white/70'}`}
          >
            <div className={`relative aspect-3/4 bg-linear-to-br ${template.accent} p-4`}>
              <div className="absolute inset-3 rounded-xl bg-white/95 p-3 shadow-inner">
                <div className="mb-2 h-6 w-2/3 rounded bg-slate-200" />
                <div className="h-1.5 w-1/2 rounded bg-slate-100" />
                <div className="mt-3 h-1 w-full rounded bg-slate-100" />
                <div className="mt-1.5 h-1 w-11/12 rounded bg-slate-100" />
                <div className="mt-1.5 h-1 w-10/12 rounded bg-slate-100" />
                <div className="mt-3 h-2 w-1/3 rounded bg-slate-200" />
                <div className="mt-1.5 h-1 w-full rounded bg-slate-100" />
                <div className="mt-1.5 h-1 w-11/12 rounded bg-slate-100" />
              </div>
              {active && (
                <div className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white text-indigo-600 shadow">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between p-3">
              <p className="text-sm font-medium">{template.name}</p>
              <span className="text-xs text-muted-foreground">ATS-ready</span>
            </div>
          </PrimaryButton>
        );
      })}
    </div>
  );
};

export default TemplateSelectionSection;
