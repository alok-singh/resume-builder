import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">{children}</h2>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Quasar = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');
  const mid = Math.ceil(skills.length / 2);

  return (
    <div className="mx-auto w-full max-w-4xl bg-white px-10 py-10 font-serif text-slate-900">
      <p className="text-sm font-bold uppercase tracking-widest">{basicInfo.currentJobTitle}</p>
      <h1 className="mt-1 text-5xl font-extrabold uppercase">{fullName}</h1>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm uppercase tracking-wide text-slate-700">
        {fullAddress}
        {basicInfo.phoneNumber && (
          <>
            <span>&nbsp;</span>
            <Phone size={12} className="inline" /> {basicInfo.phoneNumber}
          </>
        )}
        {basicInfo.email && (
          <>
            <span>&nbsp;</span>
            <Mail size={12} className="inline" /> {basicInfo.email}
          </>
        )}
      </p>
      <div className="my-6 h-1 bg-slate-800" />
      {summary && (
        <section className="mb-8 grid grid-cols-[110px_1fr] gap-6">
          <SectionHeading>Summary</SectionHeading>
          <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}
      {skills.length > 0 && (
        <section className="mb-8 grid grid-cols-[110px_1fr] gap-6">
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
      {experienceList.length > 0 && (
        <section className="mb-8 grid grid-cols-[110px_1fr] gap-6">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-5">
            {experienceList.map((exp, idx) => (
              <div key={idx}>
                <p className="text-sm text-slate-500">
                  {exp.start} - {exp.isCurrentJob ? 'Current' : exp.end}
                </p>
                <p className="font-bold">
                  {exp.title} | {exp.employer} | {exp.location}
                </p>
                <HtmlList html={exp.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {educationList.length > 0 && (
        <section className="mb-8 grid grid-cols-[110px_1fr] gap-6">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-2">
            {educationList.map((edu, idx) => (
              <div key={idx}>
                <p className="text-sm text-slate-500">
                  {edu.start} - {edu.isPursuing ? 'Current' : edu.end}
                </p>
                <p>
                  <span className="font-bold">{edu.degree}:</span> {edu.schoolName}
                </p>
                <p className="font-bold">{edu.location}</p>
                {edu.description ? <HtmlList html={edu.description} /> : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {additionalSections.length > 0 &&
        additionalSections.map((additionalSection, idx) => (
          <section key={idx} className="mb-8 grid grid-cols-[110px_1fr] gap-6">
            <SectionHeading>{additionalSection.title}</SectionHeading>
            <div className="-mt-2">{additionalSection.description ? <HtmlList html={additionalSection.description} /> : null}</div>
          </section>
        ))}
    </div>
  );
};

export default Quasar;
