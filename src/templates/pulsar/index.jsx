import React from 'react';
import { ArrowDownRight, Sparkle } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return (
    <div className="mb-2 flex items-center justify-between border-b border-slate-900 pb-2">
      <h2 className="text-2xl font-bold text-slate-900">{children}</h2>
      <Sparkle size={18} className="text-slate-900" />
    </div>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Pulsar = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || 'oklch(96.7% 0.067 122.328)';
  return (
    <div className="font-montserrat mx-auto w-full max-w-4xl p-10 text-slate-900" style={{ backgroundColor: themeStyleBgColor }}>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            {basicInfo.firstName}
            <br />
            {basicInfo.lastName}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-900">
              <ArrowDownRight size={16} />
            </span>
            <p className="text-lg">{basicInfo.currentJobTitle}</p>
          </div>
        </div>

        <div className="w-72 flex-none">
          <h2 className="mb-1 text-xl font-bold">Details</h2>
          <div className="border-t border-slate-900" />
          {basicInfo.phoneNumber && (
            <div className="flex items-center justify-between border-b border-slate-900 py-2 text-sm">
              <span>Phone</span>
              <span className="font-bold">{basicInfo.phoneNumber}</span>
            </div>
          )}
          {basicInfo.email && (
            <div className="flex items-center justify-between border-b border-slate-900 py-2 text-sm">
              <span>Email</span>
              <span className="font-bold">{basicInfo.email}</span>
            </div>
          )}
          {fullAddress && (
            <div className="flex items-center justify-between border-b border-slate-900 py-2 text-sm">
              <span>Location</span>
              <span className="text-right font-bold">{fullAddress}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 border-t border-slate-900" />

      {summary && (
        <section className="mt-8">
          <SectionHeading>Summary</SectionHeading>
          <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}

      {experienceList.length > 0 && (
        <section className="mt-8">
          <SectionHeading>Experience</SectionHeading>
          <div className="mt-3 space-y-5">
            {experienceList.map((exp, idx) => (
              <div key={idx}>
                <p className="text-sm">
                  {exp.start} &middot; {exp.isCurrentJob ? 'Current' : exp.end}
                </p>
                <p className="font-bold">{exp.employer}</p>
                <p className="text-sm">
                  {exp.title}, {exp.location}
                </p>
                <HtmlList html={exp.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {educationList.length > 0 && (
        <section className="mt-8">
          <SectionHeading>Education</SectionHeading>
          <div className="mt-3 space-y-3">
            {educationList.map((edu, idx) => (
              <div key={idx}>
                <p className="text-sm">
                  {edu.start} &middot; {edu.isPursuing ? 'Current' : edu.end}
                </p>
                <p className="font-bold">{edu.degree}</p>
                <p className="text-sm">
                  {edu.schoolName}, {edu.location}
                </p>
                {edu.description && <HtmlList html={edu.description} />}
              </div>
            ))}
          </div>
        </section>
      )}

      {additionalSections.length > 0 &&
        additionalSections.map((additionalSection, idx) => (
          <section className="mt-8" key={idx}>
            <SectionHeading>{additionalSection.title}</SectionHeading>
            <div className="mt-3 space-y-3">{additionalSection.description && <HtmlList html={additionalSection.description} />}</div>
          </section>
        ))}

      {skills.length > 0 && (
        <section className="mt-8">
          <SectionHeading>Skills</SectionHeading>
          <ul className="mt-3 space-y-2 text-sm">
            {skills.map((s) => (
              <li key={s.name} className="flex gap-2">
                <span>&bull;</span>
                {s.name}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Pulsar;
