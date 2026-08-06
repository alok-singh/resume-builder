import React from 'react';
import { Phone, Mail, MapPin, Link2 } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';
import EuropeanUnionIcon from '../../icons/european-union';
import { getLanguageProficiency } from '../../utils/helper.util';

const SectionHeading = ({ children, style }) => {
  return (
    <div className="mb-2 flex items-center gap-3">
      <h2 className="text-base font-bold text-[#09296A] uppercase" style={{ color: style.color }}>
        {children}
      </h2>
      <div className="h-4 flex-1 bg-slate-200" style={{ background: style.background }} />
    </div>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const ProfessionalSidebar = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], languages = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.postCode, basicInfo.city, basicInfo.country].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#092969';
  const themeStyleSideBgColor = props?.templateThemeColor?.sideBg || '#ebeef3';
  return (
    <div className="bg-white font-open-sans text-slate-900 shadow-sm h-full" style={{ ...(props.style || {}) }}>
      <div className="flex items-center justify-end px-8 py-3 gap-2" style={{ background: themeStyleBgColor }}>
        <EuropeanUnionIcon style={{ width: '32px', marginTop: '4px' }} />
        <span className="leading-1 text-white text-[18px]">europass</span>
      </div>

      <div className="grid grid-cols-[1fr_240px] gap-8 p-8">
        <div>
          <p className="text-sm text-slate-500">{basicInfo.currentJobTitle}</p>
          <h1 className="text-3xl font-extrabold uppercase">{fullName}</h1>
          <div className="my-3 border-b border-slate-800" />

          {summary && (
            <section className="mb-3 pb-3 border-b border-slate-800">
              <SectionHeading style={{ color: themeStyleBgColor, background: themeStyleSideBgColor }}>Summary</SectionHeading>
              <HtmlList html={summary} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mb-3 pb-3 border-b border-slate-800">
              <SectionHeading style={{ color: themeStyleBgColor, background: themeStyleSideBgColor }}>Experience</SectionHeading>
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <p className="text-sm text-slate-500">
                      {exp.start} &ndash; {exp.isCurrentJob ? 'Current' : exp.end} &nbsp;{exp.location}
                    </p>
                    <p className="font-bold">
                      {exp.title} | {exp.employer}
                    </p>
                    <HtmlList html={exp.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {educationList.length > 0 && (
            <section className="mb-3 pb-3 border-b border-slate-800">
              <SectionHeading style={{ color: themeStyleBgColor, background: themeStyleSideBgColor }}>Education</SectionHeading>
              <div className="space-y-3">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-sm text-slate-500">
                      {edu.start} &ndash; {edu.isPursuing ? 'Current' : edu.end}
                    </p>
                    <p className="font-bold">{edu.degree}</p>
                    <p className="text-sm">{edu.schoolName}</p>
                    {edu.description ? <HtmlList html={edu.description} /> : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {additionalSections.length > 0 &&
            additionalSections.map((additionalSection, idx) => (
              <section className="mb-3 pb-3 border-b border-slate-800">
                <SectionHeading style={{ color: themeStyleBgColor, background: themeStyleSideBgColor }}>{additionalSection.title}</SectionHeading>
                <HtmlList html={additionalSection.description} />
              </section>
            ))}
        </div>

        <div>
          {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="mb-4 h-60 w-60 object-cover" />}
          <div className="border-t border-slate-800 pt-4">
            <h2 className="mb-2 text-base font-bold uppercase" style={{ color: themeStyleBgColor }}>
              Details
            </h2>
            <div className="space-y-2 text-xs text-slate-700">
              {basicInfo.phoneNumber && (
                <>
                  <div className="font-bold text-black mb-0">Phone Number:</div>
                  <div className="mb-4">{basicInfo.phoneNumber}</div>
                </>
              )}
              {basicInfo.email && (
                <>
                  <div className="font-bold text-black mb-0">Email Address:</div>
                  <div className="mb-4">{basicInfo.email}</div>
                </>
              )}
              {basicInfo.linkedIn && (
                <>
                  <div className="font-bold text-black mb-0">LinkedIn</div>
                  <div className="mb-4">{basicInfo.linkedIn.replace('https://', '')}</div>
                </>
              )}
              {fullAddress && (
                <>
                  <div className="font-bold text-black mb-0">Address</div>
                  <div className="mb-4">{fullAddress}</div>
                </>
              )}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="mt-6 border-t border-slate-800 pt-4">
              <h2 className="mb-2 text-base font-bold uppercase" style={{ color: themeStyleBgColor }}>
                Skills
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div className="mt-6 border-t border-slate-800 pt-4">
              <h2 className="mb-2 text-base font-bold uppercase" style={{ color: themeStyleBgColor }}>
                Languages
              </h2>
              <p className="text-sm">
                Mother language(s): <span className="font-bold">{languages[0]?.name}</span>
              </p>
              {languages.length > 1 && (
                <div className="mt-1 text-xs">
                  <div className="mt-2">Other Language(s):</div>
                  {languages.slice(1).map((l) => (
                    <div key={l.name} className="mt-1">
                      <span className="font-bold uppercase">{l.name}</span> {getLanguageProficiency(l.level)}{' '}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSidebar;
