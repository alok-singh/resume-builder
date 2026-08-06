import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wide text-slate-900">{children}</h2>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Nebular = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.country, basicInfo.address, basicInfo.city, basicInfo.postCode].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || 'oklch(97% 0 0)';
  return (
    <div className="p-10 font-open-sans text-slate-900 h-full" style={{ ...props.style, backgroundColor: themeStyleBgColor }}>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-wide">{fullName.toUpperCase()}</h1>
        <p className="mt-2 border-t border-b border-slate-400 py-1.5 text-sm uppercase tracking-widest">{basicInfo.currentJobTitle}</p>
      </div>

      <div className="mt-8 grid grid-cols-[30%_1fr] gap-x-10">
        <div className='do-not-hide'>
          <section className="mb-8">
            <SectionHeading>Details</SectionHeading>
            <div className="space-y-2 text-sm text-slate-700">
              {basicInfo.phoneNumber && (
                <p className="flex items-center gap-2">
                  <Phone size={13} />
                  {basicInfo.phoneNumber}
                </p>
              )}
              {basicInfo.email && (
                <p className="flex items-center gap-2">
                  <Mail size={13} />
                  {basicInfo.email}
                </p>
              )}
              {fullAddress && (
                <p className="flex items-start gap-2">
                  <MapPin size={13} className="mt-0.5" />
                  {fullAddress}
                </p>
              )}
            </div>
          </section>
          {skills.length > 0 && (
            <section>
              <SectionHeading>Skills</SectionHeading>
              <ul className="space-y-2 text-sm text-slate-700">
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div>
          {summary && (
            <section className="mb-8">
              <SectionHeading>Summary</SectionHeading>
              <div className="text-sm leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: summary }} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <p className="text-sm">
                      {exp.title}, {exp.employer}, {exp.location}
                    </p>
                    <p className="text-sm font-bold">
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
              <div className="space-y-3">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-sm">
                      {edu.schoolName}, {edu.degree}, {edu.location}
                    </p>
                    <p className="text-sm font-bold">
                      {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                    </p>
                    {edu ? <HtmlList html={edu.description} /> : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {additionalSections.length > 0 &&
            additionalSections.map((additionalSection, idx) => (
              <section className="mb-8" key={idx}>
                <SectionHeading>{additionalSection.title}</SectionHeading>
                <HtmlList html={additionalSection.description} />
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Nebular;
