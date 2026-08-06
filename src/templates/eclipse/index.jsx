import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-3 font-serif text-base font-bold uppercase tracking-wide text-slate-900">{children}</h2>;
};

const HtmlBullets = ({ html }) => {
  return <div className="space-y-2 text-[15px] leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Eclipse = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;

  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.city, basicInfo.postCode].filter(Boolean).join(', ');

  // split skills into two columns like the design
  const mid = Math.ceil(skills.length / 2);
  const skillsLeft = skills.slice(0, mid);
  const skillsRight = skills.slice(mid);

  return (
    <div style={props.style} className="h-full font-time-new-roman bg-white p-8 text-slate-900">
      {/* Centered header */}
      <div className="text-center">
        <p className="text-base font-bold">{basicInfo.currentJobTitle}</p>
        <h1 className="mt-1 text-5xl">{fullName}</h1>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px]">
          {fullAddress && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-700" />
              <span className="font-bold">Address:</span> {fullAddress}
            </span>
          )}
          {fullAddress && basicInfo.email && <span className="text-slate-400">&middot;</span>}
          {basicInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-slate-700" />
              <span className="font-bold">Email address:</span> {basicInfo.email}
            </span>
          )}
        </div>
        {basicInfo.phoneNumber && (
          <p className="mt-1 flex items-center justify-center gap-1.5 text-[15px]">
            <Phone size={14} className="text-slate-700" />
            <span className="font-bold">Phone number:</span> {basicInfo.phoneNumber}
          </p>
        )}
      </div>

      <div className="my-8 border-t border-dashed border-slate-300" />

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <SectionHeading>Summary</SectionHeading>
          <div className="ml-6 text-[15px] leading-relaxed text-slate-800" dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}

      {/* Experience */}
      {experienceList.length > 0 && (
        <section className="mb-8">
          <SectionHeading>Experience</SectionHeading>
          <div className="ml-6 space-y-6">
            {experienceList.map((exp, idx) => (
              <div key={idx}>
                <p className="text-[15px] font-bold uppercase">
                  {exp.title}{' '}
                  <span className="font-normal normal-case">
                    | {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                  </span>
                </p>
                <p className="mt-1 text-[15px] text-slate-800">
                  {exp.employer}
                  {exp.location ? ` - ${exp.location}` : ''}
                </p>
                <div className="mt-2">
                  <HtmlBullets html={exp.description} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {educationList.length > 0 && (
        <section className="mb-8">
          <SectionHeading>Education</SectionHeading>
          <div className="ml-6 space-y-4">
            {educationList.map((edu, idx) => (
              <div key={idx}>
                <p className="text-[15px] font-bold">
                  {edu.schoolName}
                  {edu.location ? ` - ${edu.location}` : ''} | {edu.degree}
                </p>
                <p className="mt-1 text-[15px] text-slate-800">
                  {edu.start} - {edu.isPursuing ? 'Current' : edu.end}
                </p>
                {edu.description ? (
                  <div className="mt-2">
                    <HtmlBullets html={edu.description} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <SectionHeading>Skills</SectionHeading>
          <div className="ml-6 grid grid-cols-2 gap-x-10 gap-y-2 text-[15px] text-slate-800">
            {[skillsLeft, skillsRight].map((column, colIdx) => (
              <ul key={colIdx} className="space-y-2">
                {column.map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      )}

      {/* Additional sections (e.g. Achievements) */}
      {additionalSections.map((sec, idx) => (
        <section className="mb-8" key={idx}>
          <SectionHeading>{sec.title}</SectionHeading>
          <div className="ml-6">
            <HtmlBullets html={sec.description} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default Eclipse;
