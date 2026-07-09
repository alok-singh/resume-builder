import React from 'react';
import { User, Briefcase, GraduationCap } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ icon: Icon, children }) => {
  return (
    <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-slate-900">
      <Icon size={16} />
      {children}
    </h2>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Eon = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');

  return (
    <div className="mx-auto w-full max-w-4xl bg-white p-8 font-sans text-slate-900">
      <div className="flex items-center gap-4">
        {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="h-16 w-16 rounded object-cover" />}
        <div>
          <h1 className="text-xl font-bold">{fullName}</h1>
          <p className="text-sm text-slate-500">{basicInfo.currentJobTitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_260px] gap-8 mt-6 space-y-6">
        <div>
          {summary && (
            <section className="mb-6">
              <SectionHeading icon={User}>Summary</SectionHeading>
              <HtmlList html={summary} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mb-6">
              <SectionHeading icon={Briefcase}>Experience</SectionHeading>
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-bold">{exp.title}</p>
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
            <section className="mb-6">
              <SectionHeading icon={GraduationCap}>Education</SectionHeading>
              <div className="space-y-2">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-bold">{edu.schoolName}</p>
                    <p className="text-sm text-slate-500">
                      {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                    </p>
                    <HtmlList html={edu.description} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          <h2 className="mb-2 text-sm font-bold">Details</h2>
          <div className="space-y-1.5 text-sm text-slate-700 mb-6">
            {fullAddress && <p>{fullAddress}</p>}
            {basicInfo.phoneNumber && <p>{basicInfo.phoneNumber}</p>}
            {basicInfo.email && <p className="break-all">{basicInfo.email}</p>}
          </div>
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-bold">Skills</h2>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}

          {additionalSections.length > 0 &&
            additionalSections.map((section) => {
              return (
                <div className="mb-6">
                  <h2 className="mb-2 text-sm font-bold">{section.title}</h2>
                  <HtmlList html={section.description} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Eon;
