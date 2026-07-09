import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-3 text-xl font-bold text-slate-900">{children}</h2>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Cosmos = (props) => {
  const data = props.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#a3bb95';
  return (
    <div className="mx-auto w-full max-w-4xl bg-white font-sans text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md px-8 py-6 text-white m-2" style={{ backgroundColor: themeStyleBgColor }}>
        <h1 className="text-2xl font-bold">{fullName}</h1>
        <div className="space-y-1 text-right text-sm">
          {basicInfo.email && (
            <p className="flex items-center justify-end gap-1.5">
              {basicInfo.email}
              <Mail size={13} />
            </p>
          )}
          {basicInfo.phoneNumber && (
            <p className="flex items-center justify-end gap-1.5">
              {basicInfo.phoneNumber}
              <Phone size={13} />
            </p>
          )}
          {fullAddress && (
            <p className="flex items-center justify-end gap-1.5">
              {fullAddress}
              <MapPin size={13} />
            </p>
          )}
        </div>
      </div>

      <div className="px-8 py-8">
        <p className="mb-6 text-sm font-bold">{basicInfo.currentJobTitle}</p>

        {summary && (
          <section className="mb-8">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
          </section>
        )}

        {experienceList.length > 0 && (
          <section className="mb-8">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-5">
              {experienceList.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between">
                    <p className="font-bold">{exp.title}</p>
                    <span className="text-sm">
                      {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                    </span>
                  </div>
                  <HtmlList html={exp.description} />
                </div>
              ))}
            </div>
          </section>
        )}

        {educationList.length > 0 && (
          <section className="mb-8">
            <SectionHeading>Education</SectionHeading>
            {educationList.map((edu, idx) => (
              <>
                <div className="flex items-baseline justify-between" key={idx}>
                  <p className="font-bold">{edu.schoolName}</p>
                  <span className="text-sm">
                    {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                  </span>
                </div>
                {edu.description ? <HtmlList html={edu.description} /> : null}
              </>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 mb-8">
            <SectionHeading>Skills</SectionHeading>
            <ul className="space-y-1.5 text-sm">
              {skills.map((s) => (
                <li key={s.name}>{s.name}</li>
              ))}
            </ul>
          </section>
        )}

        {additionalSections.length > 0 &&
          additionalSections.map((section, idx) => (
            <section className="mb-8" key={idx}>
              <SectionHeading>{section.title}</SectionHeading>
              {section.description ? <HtmlList html={section.description} /> : null}
            </section>
          ))}
      </div>
    </div>
  );
};

export default Cosmos;
