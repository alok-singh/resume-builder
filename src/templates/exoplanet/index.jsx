import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children, style }) => {
  return (
    <h2 className="mb-3 border-b pb-1 text-sm font-bold uppercase tracking-widest text-slate-900" style={style}>
      {children}
    </h2>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Exoplanet = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const mid = Math.ceil(skills.length / 2);

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#303030';
  return (
    <div style={props.style} className="bg-white p-10 text-slate-900 font-roboto h-full">
      <div className="flex items-start justify-between border-b border-slate-300 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide font-montserrat">{fullName.toUpperCase()}</h1>
          <p className="mt-1 text-sm">{basicInfo.currentJobTitle}</p>
        </div>
        <div className="space-y-1 text-right text-sm">
          {basicInfo.phoneNumber && (
            <p className="flex items-center justify-end gap-1.5">
              {basicInfo.phoneNumber}
              <Phone size={13} />
            </p>
          )}
          {basicInfo.email && (
            <p className="flex items-center justify-end gap-1.5">
              {basicInfo.email}
              <Mail size={13} />
            </p>
          )}
          {basicInfo.city && (
            <p className="flex items-center justify-end gap-1.5">
              {basicInfo.city}
              <MapPin size={13} />
            </p>
          )}
        </div>
      </div>

      {summary && (
        <section className="mt-6">
          <SectionHeading style={{ borderColor: themeStyleBgColor }}>Summary</SectionHeading>
          <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}

      {experienceList.length > 0 && (
        <section className="mt-6">
          <SectionHeading style={{ borderColor: themeStyleBgColor }}>Experience</SectionHeading>
          <div className="space-y-5">
            {experienceList.map((exp, idx) => (
              <>
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="font-bold" style={{ color: themeStyleBgColor }}>
                      {exp.title}
                    </p>
                    <p className="text-sm text-slate-600">{exp.employer}</p>
                  </div>
                  <p className="text-sm text-slate-500">
                    {exp.start} - {exp.isCurrentJob ? 'Current' : exp.end}
                  </p>
                </div>
                <HtmlList html={exp.description} />
              </>
            ))}
          </div>
        </section>
      )}

      {educationList.length > 0 && (
        <section className="mt-6">
          <SectionHeading style={{ borderColor: themeStyleBgColor }}>Education</SectionHeading>
          <div className="space-y-2">
            {educationList.map((edu, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold" style={{ color: themeStyleBgColor }}>
                      {edu.degree}
                    </p>
                    <p className="text-sm text-slate-600">{edu.schoolName}</p>
                  </div>
                  <p className="text-sm text-slate-500">{edu.start}</p>
                </div>
                {edu.description ? <HtmlList html={edu.description} /> : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {additionalSections.length > 0 &&
        additionalSections.map((additionalSection, idx) => (
          <section className="mt-6">
            <SectionHeading style={{ borderColor: themeStyleBgColor }}>{additionalSection.title}</SectionHeading>
            {additionalSection.description ? <HtmlList html={additionalSection.description} /> : null}
          </section>
        ))}

      {skills.length > 0 && (
        <section className="mt-6">
          <SectionHeading style={{ borderColor: themeStyleBgColor }}>Skills</SectionHeading>
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
  );
};

export default Exoplanet;
