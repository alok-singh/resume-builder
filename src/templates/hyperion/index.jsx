import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <span className="inline-block bg-slate-100 px-4 py-2 text-sm font-bold uppercase tracking-wide text-slate-900">{children}</span>;
};

const DateBadge = ({ children, style }) => {
  return (
    <span className="inline-block px-3 py-1 text-xs font-semibold text-white" style={style}>
      {children}
    </span>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Hyperion = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.postCode, basicInfo.country].filter(Boolean).join(', ');
  const themeStyleBgColor = props?.templateThemeColor?.bg || 'oklch(70.4% 0.04 256.788)';

  return (
    <div className="font-roboto-slab mx-auto w-full max-w-4xl bg-white p-10 text-slate-900">
      <h1 className="text-2xl font-extrabold tracking-wide">{fullName.toUpperCase()}</h1>
      <p className="text-sm font-bold text-right">{basicInfo.currentJobTitle}</p>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-slate-300 pb-4 text-sm text-slate-700">
        {fullAddress && (
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            {fullAddress}
          </span>
        )}
        {basicInfo.phoneNumber && (
          <>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Phone size={13} />
              {basicInfo.phoneNumber}
            </span>
          </>
        )}
        {basicInfo.email && (
          <>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} />
              {basicInfo.email}
            </span>
          </>
        )}
      </div>

      {summary && (
        <section className="mt-6">
          <SectionHeading>Summary</SectionHeading>
          <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} style={{ color: themeStyleBgColor }} />
        </section>
      )}

      {experienceList.length > 0 && (
        <section className="mt-6">
          <SectionHeading>Experience</SectionHeading>
          <div className="mt-3 space-y-5">
            {experienceList.map((exp, idx) => (
              <div key={idx}>
                <DateBadge style={{ backgroundColor: themeStyleBgColor }}>
                  {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                </DateBadge>
                <p className="mt-2 text-sm">
                  <span className="font-bold">{exp.title}</span> | {exp.employer}
                </p>
                <HtmlList html={exp.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {educationList.length > 0 && (
        <section className="mt-6">
          <SectionHeading>Education</SectionHeading>
          <div className="mt-3 space-y-3">
            {educationList.map((edu, idx) => (
              <div key={idx}>
                <DateBadge style={{ backgroundColor: themeStyleBgColor }}>
                  {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                </DateBadge>
                <p className="mt-2 text-sm font-bold">{edu.degree}</p>
                <p className="text-sm">{edu.schoolName}</p>
                <HtmlList html={edu.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-6">
          <SectionHeading>Skills</SectionHeading>
          <div className="mt-3 flex flex-wrap gap-3">
            {skills.map((s) => (
              <span key={s.name} className="rounded border px-4 py-2 text-sm font-semibold" style={{ color: themeStyleBgColor, borderColor: themeStyleBgColor }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {additionalSections.length > 0
        ? additionalSections.map((section, idx) => {
            return (
              <section className="mt-6">
                <SectionHeading>{section.title.toLowerCase()}</SectionHeading>
                <HtmlList html={section.description} />
              </section>
            );
          })
        : null}
    </div>
  );
};

export default Hyperion;
