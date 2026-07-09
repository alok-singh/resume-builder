import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children, style }) => {
  return (
    <div className="mb-3">
      <div className="mb-1 h-1 w-10" style={style} />
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">{children}</h2>
    </div>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Nova = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');
  const mid = Math.ceil(skills.length / 2);

  const themeStyleBgColor = props?.templateThemeColor?.bg || 'oklch(94.1% 0.03 12.58)';

  return (
    <div className="mx-auto w-full max-w-4xl bg-white font-sans text-slate-900">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-8 py-3 text-sm" style={{ backgroundColor: themeStyleBgColor }}>
        {basicInfo.phoneNumber && (
          <span className="flex items-center gap-1.5">
            <Phone size={13} />
            {basicInfo.phoneNumber}
          </span>
        )}
        {basicInfo.email && (
          <span className="flex items-center gap-1.5">
            <Mail size={13} />
            {basicInfo.email}
          </span>
        )}
        {fullAddress && (
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            {fullAddress}
          </span>
        )}
      </div>

      <div className="px-8 py-6 text-center">
        <h1 className="text-3xl font-bold tracking-wide">{fullName.toUpperCase()}</h1>
        <p className="mt-1 text-base">{basicInfo.currentJobTitle}</p>
      </div>

      <div className="px-8 pb-10">
        {summary && (
          <section className="mb-6 border-t border-slate-800 pt-4">
            <SectionHeading style={{ backgroundColor: themeStyleBgColor }}>Summary</SectionHeading>
            <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-6 border-t border-slate-800 pt-4">
            <SectionHeading style={{ backgroundColor: themeStyleBgColor }}>Skills</SectionHeading>
            <div className="grid grid-cols-2 gap-x-10 text-sm">
              <ul className="space-y-1.5">
                {skills.slice(0, mid).map((s) => (
                  <li key={s.name} className="flex gap-2">
                    <span>&middot;</span>
                    {s.name}
                  </li>
                ))}
              </ul>
              <ul className="space-y-1.5">
                {skills.slice(mid).map((s) => (
                  <li key={s.name} className="flex gap-2">
                    <span>&middot;</span>
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {experienceList.length > 0 && (
          <section className="mb-6 border-t border-slate-800 pt-4">
            <SectionHeading style={{ backgroundColor: themeStyleBgColor }}>Experience</SectionHeading>
            <div className="space-y-4">
              {experienceList.map((exp, idx) => (
                <div key={idx}>
                  <p className="text-sm font-bold uppercase">
                    {exp.title} at {exp.employer}
                  </p>
                  <p className="text-sm font-bold">
                    {exp.location}, {exp.start} - {exp.isCurrentJob ? 'Current' : exp.end}
                  </p>
                  <HtmlList html={exp.description} />
                </div>
              ))}
            </div>
          </section>
        )}

        {educationList.length > 0 && (
          <section className="mb-8 border-t border-slate-800 pt-4">
            <SectionHeading style={{ backgroundColor: themeStyleBgColor }}>Education</SectionHeading>
            <div className="space-y-2">
              {educationList.map((edu, idx) => (
                <div key={idx}>
                  <p className="text-sm font-bold uppercase">{edu.schoolName}</p>
                  <p className="text-sm font-bold">
                    {edu.location}, {edu.start} - {edu.isPursuing ? 'Current' : edu.end}
                  </p>
                  <p className="text-sm">{edu.degree}</p>
                  {edu.description ? <HtmlList html={edu.description} /> : null}
                </div>
              ))}
            </div>
          </section>
        )}

        {additionalSections.length > 0 &&
          additionalSections.map((additionalSection, idx) => (
            <section className="mb-8 border-t border-slate-800 pt-4" key={idx}>
              <SectionHeading style={{ backgroundColor: themeStyleBgColor }}>{additionalSection.title}</SectionHeading>
              <HtmlList html={additionalSection.description} />
            </section>
          ))}
      </div>
    </div>
  );
};

export default Nova;
