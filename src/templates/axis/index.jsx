import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import sampleData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children, style }) => {
  return (
    <h2 className="mb-2 text-[13px] font-bold uppercase tracking-wide" style={style}>
      {children}
    </h2>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Axis = (props) => {
  const data = props.basicInfo ? props : sampleData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], languages = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#ccdfef';
  const themeStyleTxtColor = props?.templateThemeColor?.txt || '#333';
 return (
    <div style={props.style} className="font-open-sans bg-white text-slate-900 shadow-sm text-[14px] h-full">
      <div className="flex min-h-full">
        {/* Sidebar */}
        <div className="min-w-[38%] do-not-hide min-h-full" style={{ backgroundColor: themeStyleBgColor, color: themeStyleTxtColor }}>
          {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="aspect-[1] w-full object-cover" />}

          <div className="px-5 pb-6 pt-5">
            <SectionHeading>Details</SectionHeading>
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
              <div className="mt-5 border-t-2 pt-4" style={{ borderColor: themeStyleTxtColor }}>
                <SectionHeading style={{ color: themeStyleTxtColor }}>Skills</SectionHeading>
                <ul className="space-y-2 text-[13.5px]">
                  {skills.map((s) => (
                    <li key={s.name} className="flex gap-2">
                      <span>&bull;</span>
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {languages.length > 0 && (
              <div className="mt-5 border-t-2 pt-4" style={{ borderColor: themeStyleTxtColor }}>
                <SectionHeading style={{ color: themeStyleTxtColor }}>Languages</SectionHeading>
                <div className="space-y-0.5 text-[13.5px] font-bold uppercase">
                  {languages.map((l) => (
                    <p key={l.name}>{l.name}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main */}
        <div className="p-8 min-h-full grow">
          <h1 className="text-4xl font-bold uppercase text-[#236295]">{fullName}</h1>
          <p className="mt-1 text-[15px] text-slate-800">{basicInfo.currentJobTitle}</p>

          {summary && (
            <section className="mt-6">
              <SectionHeading>Summary</SectionHeading>
              <div className="text-[13.5px] leading-relaxed text-slate-800" dangerouslySetInnerHTML={{ __html: summary }} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mt-6">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <p className="text-[14px] font-bold text-slate-900">
                      {exp.title}, {exp.employer}, {exp.location}
                    </p>
                    <p className="text-[13.5px] text-slate-600">
                      {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
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
              <div className="space-y-3">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-[14px] font-bold text-slate-900">
                      {edu.degree}, {edu.schoolName}
                    </p>
                    <p className="text-[13.5px] text-slate-600">
                      {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                    </p>
                    {edu.description ? <HtmlList html={edu.description} /> : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {additionalSections.length > 0 &&
            additionalSections.map((additionalSection, idx) => (
              <section className="mt-6">
                <SectionHeading>{additionalSection.title}</SectionHeading>
                {additionalSection.description ? <HtmlList html={additionalSection.description} /> : null}
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Axis;
