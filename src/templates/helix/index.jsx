import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-2 text-sm font-bold uppercase tracking-widest">{children}</h2>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Helix = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], languages = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#ccdfef';
  const themeStyleTxtColor = props?.templateThemeColor?.txt || '#333';
  const mainTextColor = props?.templateThemeColor?.nameColor || props?.templateThemeColor?.bg;

  return (
    <div className="w-full bg-white font-open-sans h-full" style={{ ...(props.style || {}) }}>
      <div className="grid grid-cols-[240px_1fr] h-full">
        {/* Sidebar */}
        <div className="p-6 do-not-hide" style={{ background: themeStyleBgColor, color: themeStyleTxtColor }}>
          {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="mb-6 w-full h-auto rounded-full object-cover" />}
          {skills.length > 0 && (
            <div className="mb-6 border-t-2 pt-4">
              <SectionHeading>Skills</SectionHeading>
              <ul className="space-y-1.5 text-sm">
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}
          {languages.length > 0 && (
            <div className="border-t-2 pt-4">
              <SectionHeading>Languages</SectionHeading>
              <div className="space-y-1 text-sm font-bold">
                {languages.map((l) => (
                  <p key={l.name} className="uppercase">
                    {l.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main */}
        <div className="p-8">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide" style={{ color: mainTextColor }}>
            {fullName}
          </h1>
          <p className="mt-1 text-base text-slate-600">{basicInfo.currentJobTitle}</p>

          <div className="mt-3 space-y-1.5 text-sm text-slate-700">
            {basicInfo.email && (
              <p className="flex items-center gap-2">
                <Mail size={14} />
                {basicInfo.email}
              </p>
            )}
            {fullAddress && (
              <p className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5" />
                {fullAddress}
              </p>
            )}
            {basicInfo.phoneNumber && (
              <p className="flex items-center gap-2">
                <Phone size={14} />
                {basicInfo.phoneNumber}
              </p>
            )}
          </div>

          {summary && (
            <section className="mt-6 border-t pt-4" style={{ borderColor: themeStyleBgColor }}>
              <SectionHeading>Summary</SectionHeading>
              <HtmlList html={summary} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mt-6 border-t pt-4" style={{ borderColor: themeStyleBgColor }}>
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-bold">
                      {exp.title}, {exp.employer}, {exp.location}
                    </p>
                    <p className="text-sm text-slate-600">
                      {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                    </p>
                    <HtmlList html={exp.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {educationList.length > 0 && (
            <section className="mt-6 border-t pt-4" style={{ borderColor: themeStyleBgColor }}>
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-2">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <p className="font-bold">
                      {edu.degree}, {edu.schoolName}
                    </p>
                    <p className="text-sm text-slate-600">
                      {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                    </p>
                    {edu.description ? <HtmlList html={edu.description} /> : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {additionalSections.length > 0
            ? additionalSections.map((section, idx) => (
                <section className="mt-6 border-t pt-4" style={{ borderColor: themeStyleBgColor }}>
                  <SectionHeading>{section.title}</SectionHeading>
                  <HtmlList html={section.description} />
                </section>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Helix;
