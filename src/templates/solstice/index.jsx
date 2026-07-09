import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children, style }) => {
  return (
    <h2 className="mb-3 font-serif text-lg font-bold text-slate-900" style={style}>
      {children}
    </h2>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-1 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Solstice = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.city, basicInfo.address, basicInfo.postCode, basicInfo.country].filter(Boolean).join(', ');
  const mid = Math.ceil(skills.length / 2);

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#02061b';

  return (
    <div className="mx-auto w-full max-w-4xl bg-white px-10 py-10 font-serif text-slate-900">
      <div className="text-center">
        <h1 className="text-4xl" style={{ color: themeStyleBgColor }}>
          {fullName}
        </h1>
        <p className="mt-1 text-base font-bold">{basicInfo.currentJobTitle}</p>
      </div>

      <div className="my-5 h-0.75" style={{ backgroundColor: themeStyleBgColor }} />

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
        {fullAddress && (
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            {fullAddress}
          </span>
        )}
        {basicInfo.phoneNumber && (
          <>
            <span className="text-slate-400">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Phone size={13} />
              {basicInfo.phoneNumber}
            </span>
          </>
        )}
        {basicInfo.email && (
          <>
            <span className="text-slate-400">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} />
              {basicInfo.email}
            </span>
          </>
        )}
      </div>

      {summary && (
        <section className="mt-8">
          <SectionHeading style={{ color: themeStyleBgColor }}>Summary</SectionHeading>
          <p className="text-sm leading-relaxed text-slate-800" dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}

      {experienceList.length > 0 && (
        <section className="mt-8">
          <SectionHeading style={{ color: themeStyleBgColor }}>Experience</SectionHeading>
          <div className="space-y-5">
            {experienceList.map((exp, idx) => (
              <div key={idx}>
                <p className="text-sm">
                  <span className="font-bold">{exp.title}</span>, {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                </p>
                <p className="text-sm font-bold">
                  {exp.employer}, {exp.location}
                </p>
                <HtmlList html={exp.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {educationList.length > 0 && (
        <section className="mt-8">
          <SectionHeading style={{ color: themeStyleBgColor }}>Education</SectionHeading>
          <div className="space-y-2">
            {educationList.map((edu, idx) => (
              <div key={idx}>
                <p className="text-sm font-bold">
                  {edu.degree}, {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                </p>
                <p className="text-sm">
                  {edu.schoolName}, {edu.location}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-8">
          <SectionHeading style={{ color: themeStyleBgColor }}>Skills</SectionHeading>
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
        additionalSections.map((section, idx) => (
          <section className="mt-8" key={`additional-solstice-${idx}`}>
            <SectionHeading style={{ color: themeStyleBgColor }}>{section.title}</SectionHeading>
            <HtmlList html={section.description} />
          </section>
        ))}
    </div>
  );
};

export default Solstice;
