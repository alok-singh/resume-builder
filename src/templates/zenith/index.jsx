import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-900">{children}</h2>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Zenith = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.country, basicInfo.address, basicInfo.city].filter(Boolean).join(', ');
  const mid = Math.ceil(skills.length / 2);

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#f0fdf4';
  return (
    <div className="mx-auto w-full max-w-4xl p-10 font-serif text-slate-900" style={{ backgroundColor: themeStyleBgColor }}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl">{fullName}</h1>
          <p className="mt-1 text-sm uppercase tracking-widest">{basicInfo.currentJobTitle}</p>
        </div>
        <div className="text-right text-sm">
          {basicInfo.phoneNumber && (
            <p className="flex items-center justify-end gap-1.5">
              {basicInfo.phoneNumber}
              <Phone size={13} />
            </p>
          )}
          {basicInfo.email && (
            <p className="flex items-center justify-end gap-1.5">
              {basicInfo.email}
              <Mail size={13} />
            </p>
          )}
          {fullAddress && (
            <p className="flex items-center justify-end gap-1.5">
              {fullAddress}
              <MapPin size={13} />
            </p>
          )}
        </div>
      </div>

      {summary && (
        <section className="mt-8 grid grid-cols-[120px_1fr] gap-6">
          <SectionHeading>Summary</SectionHeading>
          <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}

      {experienceList.length > 0 && (
        <section className="mt-8 grid grid-cols-[120px_1fr] gap-6">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-5">
            {experienceList.map((exp, idx) => (
              <div key={idx}>
                <p className="font-bold">
                  {exp.title}, {exp.employer}, {exp.location}
                </p>
                <p className="text-sm">
                  {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                </p>
                <HtmlList html={exp.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {educationList.length > 0 && (
        <section className="mt-8 grid grid-cols-[120px_1fr] gap-6">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-3">
            {educationList.map((edu, idx) => (
              <div key={idx}>
                <p className="font-bold">
                  {edu.schoolName}, {edu.degree}
                </p>
                <p className="text-sm">
                  {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                </p>
                {edu.description && <HtmlList html={edu.description} />}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-8 grid grid-cols-[120px_1fr] gap-6">
          <SectionHeading>Skills</SectionHeading>
          <div className="grid grid-cols-2 gap-x-10 text-sm">
            <ul className="space-y-1.5">
              {skills.slice(0, mid).map((s) => (
                <li key={s.name} className="flex gap-2">
                  <span>&bull;</span>
                  {s.name}
                </li>
              ))}
            </ul>
            <ul className="space-y-1.5">
              {skills.slice(mid).map((s) => (
                <li key={s.name} className="flex gap-2">
                  <span>&bull;</span>
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {additionalSections.length > 0 &&
        additionalSections.map((additional, idx) => (
          <section key={`additional-zenith-${idx}`} className="mt-8 grid grid-cols-[120px_1fr] gap-6">
            <SectionHeading>{additional.title}</SectionHeading>
            <div className="-mt-2">
              {additional.description && <HtmlList html={additional.description} />}
            </div>
          </section>
        ))}
    </div>
  );
};

export default Zenith;
