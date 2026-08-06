import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return (
    <div className="mb-2 flex items-center gap-3">
      <h2 className="text-lg font-bold text-slate-900">{children}</h2>
      <div className="h-4 flex-1 bg-slate-200" />
    </div>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Quantum = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], languages = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');
  const themeStyleBgColor = props?.templateThemeColor?.bg || '#0a2472';

  return (
    <div className="w-full bg-white font-open-sans text-slate-900 shadow-sm h-full" style={{ ...(props.style || {}) }}>
      <div className="h-3 mx-8" style={{ background: themeStyleBgColor }} />
      <div className="grid grid-cols-[1fr_260px] gap-8 p-8">
        <div>
          <h1 className="text-2xl font-extrabold uppercase">{fullName}</h1>
          <p className="text-sm text-slate-600 pb-3 border-b border-slate-900">{basicInfo.currentJobTitle}</p>

          {summary && (
            <section className="pb-3 my-3 border-b border-slate-900">
              <SectionHeading>Summary</SectionHeading>
              <HtmlList html={summary} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mb-6 pb-3 border-b border-slate-900">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-bold">{exp.title}</p>
                    <p className="text-sm text-slate-500">
                      {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                    </p>
                    <HtmlList html={exp.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {educationList.length > 0 && (
            <section className="pb-3 border-b border-slate-900">
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-2">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <p className="font-bold">
                      {edu.degree}, {edu.schoolName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                    </p>
                    {edu.description ? <HtmlList html={edu.description} /> : null}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="mb-4 h-65 w-65 object-cover" />}
          <div className="border-b pb-4 border-slate-900">
            <h2 className="mb-2 text-lg font-bold">Details</h2>
            <div className="space-y-2.5 text-[13.5px]">
              {basicInfo.email && (
                <p className="flex items-center gap-2">
                  <Mail size={14} className="mt-0.5 flex-none" />
                  <span className="break-all">{basicInfo.email}</span>
                </p>
              )}
              {fullAddress && (
                <p className="flex items-center gap-2">
                  <MapPin size={14} className="mt-0.5 flex-none" />
                  <span className="break-all">{fullAddress}</span>
                </p>
              )}
              {basicInfo.phoneNumber && (
                <p className="flex items-center gap-2">
                  <Phone size={14} className="mt-0.5 flex-none" />
                  <span className="break-all">{basicInfo.phoneNumber}</span>
                </p>
              )}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="border-b border-slate-900 py-4">
              <h2 className="mb-2 text-lg font-bold">Skills</h2>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div className="pt-4">
              <h2 className="mb-2 text-lg font-bold">Languages</h2>
              <div className="space-y-1 text-sm font-bold text-slate-800">
                {languages.map((l) => (
                  <p key={l.name} className="uppercase">
                    {l.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {additionalSections.length > 0
            ? additionalSections.map((section, idx) => (
                <div className="pt-4">
                  <h2 className="mb-2 text-lg font-bold">{section.title}</h2>
                  <div className="space-y-1 text-sm text-slate-800">
                    <HtmlList html={section.description} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Quantum;
