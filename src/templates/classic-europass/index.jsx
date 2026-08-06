import React from 'react';
import { Phone, Mail, MapPin, Link2 } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';
import EuropeanUnionIcon from '../../icons/european-union';

const SectionHeading = ({ children, style }) => {
  return (
    <h2 className="mb-3 text-lg font-bold uppercase" style={style}>
      {children}
    </h2>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const ClassicEuroPass = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], languages = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.postCode, basicInfo.city, basicInfo.country].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#E1F1FF';
  const themeStyleTxtColor = props?.templateThemeColor?.txt || '#3685FC';
  const sideBarTxtColor = props?.templateThemeColor?.sideTxt || '#333';
  return (
    <div className="bg-white font-open-sans text-slate-900 h-full" style={{ ...(props.style || {}) }}>
      <div className="grid grid-cols-[280px_1fr] h-full">
        {/* Sidebar */}
        <div className="p-6 do-not-hide h-full" style={{ background: themeStyleBgColor, color: sideBarTxtColor }}>
          <div className="flex flex-col items-center">
            {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="mb-4 h-40 w-40 rounded-full object-cover border-2" />}
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-sm">{basicInfo.currentJobTitle}</p>
          </div>

          <div className="mt-6 border-t-2 pt-4">
            <SectionHeading style={{ color: sideBarTxtColor }}>Details</SectionHeading>
            <div className="space-y-3 text-sm">
              {basicInfo.phoneNumber && (
                <div>
                  <p className="font-bold">Phone number:</p>
                  <p>{basicInfo.phoneNumber}</p>
                </div>
              )}
              {basicInfo.email && (
                <div>
                  <p className="font-bold">Email address:</p>
                  <p className="break-all">{basicInfo.email}</p>
                </div>
              )}
              {basicInfo.linkedIn && (
                <div>
                  <p className="font-bold">LinkedIn:</p>
                  <p className="break-all">{basicInfo.linkedIn.replace('https://', '')}</p>
                </div>
              )}
              {fullAddress && (
                <div>
                  <p className="font-bold">Address:</p>
                  <p>{fullAddress}</p>
                </div>
              )}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="mt-6 border-t-2 pt-4">
              <SectionHeading style={{ color: sideBarTxtColor }}>Skills</SectionHeading>
              <ul className="space-y-1.5 text-sm">
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div className="mt-6 border-t-2 pt-4">
              <SectionHeading style={{ color: sideBarTxtColor }}>Languages</SectionHeading>
              <ul className="space-y-1.5 text-sm">
                {languages.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main */}
        <div className="p-6">
          <div className="mb-4 flex justify-end items-center gap-2 h-4">
            <EuropeanUnionIcon style={{ width: '24px' }} />
            <span className="leading-1 text-[#6d3089] font-bold">europass</span>
          </div>

          {summary && (
            <section className="mb-3 pb-3 border-b-2">
              <SectionHeading style={{ color: themeStyleTxtColor }}>Summary</SectionHeading>
              <HtmlList html={summary} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mb-3 pb-3">
              <SectionHeading style={{ color: themeStyleTxtColor }}>Experience</SectionHeading>
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <p className="text-sm text-slate-500">
                      {exp.start} &ndash; {exp.isCurrentJob ? 'Current' : exp.end} &nbsp; {exp.location}
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
            <section className="mb-3 pb-3">
              <SectionHeading style={{ color: themeStyleTxtColor }}>Education</SectionHeading>
              <div className="space-y-3">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-sm text-slate-500">
                      {edu.start} &ndash; {edu.isPursuing ? 'Current' : edu.end} &nbsp; {edu.location}
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
            additionalSections.map((section, idx) => (
              <section className="mb-3 pb-3">
                <SectionHeading style={{ color: themeStyleTxtColor }}>{section.title}</SectionHeading>
                <HtmlList html={section.description} />
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClassicEuroPass;
