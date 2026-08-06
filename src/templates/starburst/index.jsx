import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-3 text-xl font-bold text-slate-900">{children}</h2>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const StarBurst = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');
  const mid = Math.ceil(skills.length / 2);

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#303030';
 return (
    <div style={props.style} className="overflow-hidden bg-white font-open-sans shadow-sm h-full">
      <div className="flex flex-col items-center px-8 py-6 text-white" style={{ backgroundColor: themeStyleBgColor }}>
        {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="mb-3 h-20 w-20 rounded object-cover" />}
        <h1 className="text-2xl font-bold">{fullName}</h1>
        <p className="text-sm uppercase tracking-widest">{basicInfo.currentJobTitle}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-2 py-2 text-sm text-white border-t" style={{ backgroundColor: themeStyleBgColor }}>
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
        {basicInfo.phoneNumber && (
          <span className="flex items-center gap-1.5">
            <Phone size={13} />
            {basicInfo.phoneNumber}
          </span>
        )}
      </div>

      <div className="px-12 py-8 text-slate-900">
        {summary && (
          <section className="mb-8">
            <SectionHeading>Summary</SectionHeading>
            <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
          </section>
        )}

        {experienceList.length > 0 && (
          <section className="mb-8">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-4">
              {experienceList.map((exp, idx) => (
                <div key={idx}>
                  <p className="font-bold">{exp.title}</p>
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
                    {edu.schoolName}, {edu.degree}
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

        {additionalSections.length > 0 &&
          additionalSections.map((additionalSection, idx) => (
            <section className="mb-8">
              <SectionHeading>{additionalSection.title}</SectionHeading>
              {additionalSection.description ? <HtmlList html={additionalSection.description} /> : null}
            </section>
          ))}

        {skills.length > 0 && (
          <section>
            <SectionHeading>Skills</SectionHeading>
            <div className="grid grid-cols-2 gap-x-10 text-sm">
              <ul className="space-y-1.5">
                {skills.slice(0, mid).map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
              <ul className="space-y-1.5">
                {skills.slice(mid).map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default StarBurst;
