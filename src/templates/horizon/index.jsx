import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children, style }) => {
  return (
    <div className="flex mb-2 pb-1 items-center">
      <h2 className="w-48 text-sm font-bold uppercase tracking-widest break-all" style={{ color: style.color }}>
        {children}
      </h2>
      <div className="bg-slate-900 h-0.5 w-full"></div>
    </div>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Horizon = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], languages = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#ccdfef';
  const sideBarTxtColor = props?.templateThemeColor?.sideTxt || '#0f172b';

  return (
    <div className="border-10 border-[#0b1b2b] bg-white p-8 font-tinos h-full" style={{ ...(props.style || {}), borderColor: themeStyleBgColor }}>
      <div className="flex items-start gap-6">
        {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="h-41 w-41 flex-none object-cover" />}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{fullName}</h1>
          <p className="mt-1 text-base">{basicInfo.currentJobTitle}</p>
          <div className="mt-4 border-t border-slate-300" />
          <div className="mt-3 space-y-1.5 text-sm">
            {basicInfo.email && (
              <p className="flex items-center gap-2">
                <Mail size={13} />
                {basicInfo.email}
              </p>
            )}
            {fullAddress && (
              <p className="flex items-center gap-2">
                <MapPin size={13} />
                {fullAddress}
              </p>
            )}
            {basicInfo.phoneNumber && (
              <p className="flex items-center gap-2">
                <Phone size={13} />
                {basicInfo.phoneNumber}
              </p>
            )}
          </div>
        </div>
      </div>

      {summary && (
        <section className="mt-6">
          <SectionHeading style={{ color: sideBarTxtColor }}>Summary</SectionHeading>
          <HtmlList html={summary} />
        </section>
      )}

      {experienceList.length > 0 && (
        <section className="mt-6">
          <SectionHeading style={{ color: sideBarTxtColor }}>Experience</SectionHeading>
          <div className="space-y-4">
            {experienceList.map((exp, idx) => (
              <div key={idx} className="grid grid-cols-[132px_1fr] gap-4">
                <p className="text-sm do-not-hide">
                  {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                </p>
                <div>
                  <p className="font-bold">{exp.title}</p>
                  <HtmlList html={exp.description} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {educationList.length > 0 && (
        <section className="mt-6">
          <SectionHeading style={{ color: sideBarTxtColor }}>Education</SectionHeading>
          <div className="space-y-2">
            {educationList.map((edu, idx) => (
              <div key={idx} className="grid grid-cols-[132px_1fr] gap-4">
                <p className="text-sm do-not-hide">
                  {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                </p>
                <div>
                  <p className="font-bold">
                    {edu.schoolName}, {edu.degree}
                  </p>
                  {edu ? <HtmlList html={edu.description} /> : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-6">
          <SectionHeading style={{ color: sideBarTxtColor }}>Skills</SectionHeading>
          <div className="grid grid-cols-[132px_1fr] gap-4 text-sm">
            <div></div>
            <ul className="space-y-1.5">
              {skills.map((s) => (
                <li key={s.name} className="flex gap-2">
                  <span>&bull;</span>
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section className="mt-6">
          <SectionHeading style={{ color: sideBarTxtColor }}>Languages</SectionHeading>
          <div className="grid grid-cols-[132px_1fr] gap-4">
            <div></div>
            <div className="flex gap-2 text-sm">
              {languages.map((l) => {
                return (
                  <span>
                    {'\u2022'} {l.name}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {additionalSections.length > 0
        ? additionalSections.map((section, idx) => {
            return (
              <section className="mt-6">
                <SectionHeading style={{ color: sideBarTxtColor }}>{section.title.toLowerCase()}</SectionHeading>
                <div className="grid grid-cols-[132px_1fr] gap-4">
                  <div></div>
                  <HtmlList html={section.description} />
                </div>
              </section>
            );
          })
        : null}
    </div>
  );
};

export default Horizon;
