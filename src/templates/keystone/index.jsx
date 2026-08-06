import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children, className }) => {
  return <h2 className={`mb-3 text-lg font-bold ${className}`}>{children}</h2>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Keystone = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], languages = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#ccdfef';
  const themeStyleTxtColor = props?.templateThemeColor?.txt || '#333';
  const sideBarBgColor = props?.templateThemeColor?.sideBg || '#f5f5f5';
  const sideBarTxtColor = props?.templateThemeColor?.sideTxt || '#333';
  return (
    <div className="font-open-sans overflow-hidden bg-white h-full flex flex-col" style={{ ...props.style }}>
      {/* Dark header */}
      <div className="px-8 py-6 h-40 mb-px" style={{ backgroundColor: themeStyleBgColor, color: themeStyleTxtColor }}>
        <div className="flex items-center gap-5">
          {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="h-45 w-45 flex-none rounded object-cover z-1" />}
          <div>
            <h1 className="text-3xl font-light uppercase tracking-wide">{fullName}</h1>
            <p className="mt-1 text-base">{basicInfo.currentJobTitle}</p>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-slate-700" />

      <div className="grid grid-cols-[240px_1fr] grow">
        {/* Sidebar */}
        <div className="p-6 do-not-hide" style={{ background: sideBarBgColor, color: sideBarTxtColor }}>
          <SectionHeading className="pt-10">Details</SectionHeading>
          <div className="space-y-2.5 text-[13.5px]">
            {basicInfo.email && (
              <p className="flex items-center gap-2">
                <Mail size={14} className="mt-0.5 flex-none" />
                <span className="break-all">{basicInfo.email}</span>
              </p>
            )}
            {fullAddress && (
              <p className="flex items-center gap-2">
                <MapPin size={14} className="mt-0.5 flex-none" />
                <span className="break-all">{fullAddress}</span>
              </p>
            )}
            {basicInfo.phoneNumber && (
              <p className="flex items-center gap-2">
                <Phone size={14} className="mt-0.5 flex-none" />
                <span className="break-all">{basicInfo.phoneNumber}</span>
              </p>
            )}
          </div>

          {skills.length > 0 && (
            <div className="py-3 my-3 border-t-2">
              <SectionHeading>Skills</SectionHeading>
              <ul className="space-y-1.5 text-sm">
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div className="py-3 my-3 border-t-2">
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
        <div className="p-8 text-slate-900">
          {summary && (
            <section className="mb-8">
              <SectionHeading>Summary</SectionHeading>
              <HtmlList html={summary} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <p className="font-bold">
                      {exp.title}, {exp.employer}, {exp.location}
                    </p>
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
            <section className="mb-8">
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-2">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <p className="font-bold">
                      {edu.degree}, {edu.schoolName}
                    </p>
                    <p className="text-sm text-slate-500">
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
                <section className="mb-8">
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

export default Keystone;
