import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import sampleData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="capitalize mb-3 text-lg font-bold text-slate-900 border-b-2 border-slate-900">{children}</h2>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Aether = (props) => {
  const data = props.basicInfo ? props : sampleData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.city, basicInfo.address, basicInfo.postCode, basicInfo.country].filter(Boolean).join(', ');

  return (
    <div className="mx-auto w-full max-w-4xl font-eb-garamond bg-white px-10 py-10 text-black">
      <h1 className="text-4xl font-bold">{fullName}</h1>
      <p className="mt-2 text-base font-bold">{basicInfo.currentJobTitle}</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 text-sm">
        {fullAddress && <span className="flex items-center gap-1.5">{fullAddress}</span>}
        {basicInfo.email && <span className="flex items-center gap-1.5">{basicInfo.email}</span>}
      </div>
      {basicInfo.phoneNumber && <span className="flex items-center gap-1.5">{basicInfo.phoneNumber}</span>}

      {summary && (
        <section className="mb-8 mt-8">
          <SectionHeading>Summary</SectionHeading>
          <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}

      {experienceList.length > 0 && (
        <section className="mb-8">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-5">
            {experienceList.map((exp, idx) => (
              <div key={idx}>
                <p className="text-sm font-bold">{exp.title}</p>
                <div className="text-sm italic flex justify-between align-middle">
                  <div>
                    {exp.employer}, {exp.location}
                  </div>
                  <div>
                    {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                  </div>
                </div>
                <HtmlList html={exp.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {educationList.length > 0 && (
        <section className="mb-8">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-2">
            {educationList.map((edu, idx) => (
              <div key={idx}>
                <p className="text-sm font-bold">{edu.schoolName}</p>
                <div className="text-sm italic flex justify-between align-middle">
                  <div>
                    {edu.location} | {edu.degree}
                  </div>
                  <div>
                    {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                  </div>
                </div>
                {edu.description ? <HtmlList html={edu.description} /> : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <SectionHeading>Skills</SectionHeading>
          <ul className="space-y-1.5 text-sm">
            {skills.map((s) => (
              <li key={s.name} className="flex gap-2">
                <span>&bull;</span>
                {s.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {additionalSections.length > 0 &&
        additionalSections.map((additionalSection, idx) => (
          <section className="mb-8">
            <SectionHeading>{additionalSection?.title?.toLowerCase()}</SectionHeading>
            <HtmlList html={additionalSection.description} />
          </section>
        ))}
    </div>
  );
};

export default Aether;
