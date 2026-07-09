import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import candidateData from '../../data/candidate-1-data.json';
import LinkedInIcon from '../../icons/linkedin';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-3 inline-block border-b-2 border-slate-800 pb-0.5 font-serif text-lg font-bold tracking-wide text-slate-900">{children}</h2>;
};

const HtmlBullets = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700 [&_ul]:list-none [&_ul]:space-y-1.5 [&_ul]:pl-0 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:content-['·']" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Astral = (props) => {
  const data = props?.basicInfo ? props : candidateData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const locationLine = [basicInfo.city, basicInfo.postCode].filter(Boolean).join(', ');
  
  const themeStyleBgColor = props?.templateThemeColor?.bg || '#f2f2f2';
  const themeStyleTxtColor = props?.templateThemeColor?.txt || '#333333';

  return (
    <div className={`mx-auto w-full max-w-4xl bg-white font-serif text-slate-800 shadow-sm`}>
      {/* Header band */}
      <header className="flex items-center gap-16 px-9 py-8" style={{ backgroundColor: themeStyleBgColor, color: themeStyleTxtColor }}>
        {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} className="h-40 w-40 flex-none object-cover" />}
        <div>
          <h1 className="text-4xl leading-tight text-slate-900">{fullName}</h1>
          <p className="mt-2 font-bold">{basicInfo.currentJobTitle}</p>
          <div className="mt-3 space-y-1 text-sm">
            {locationLine && (
              <p className="flex items-center gap-2">
                <MapPin size={14} className="flex-none text-slate-700" />
                {locationLine}
              </p>
            )}
            {basicInfo.email && (
              <p className="flex items-center gap-2">
                <Mail size={14} className="flex-none text-slate-700" />
                {basicInfo.email}
              </p>
            )}
            {basicInfo.phoneNumber && (
              <p className="flex items-center gap-2">
                <Phone size={14} className="flex-none text-slate-700" />
                {basicInfo.phoneNumber}
              </p>
            )}
            {basicInfo.linkedIn && (
              <p className="flex items-center gap-2">
                <LinkedInIcon size={14} className="flex-none text-slate-700" />
                {basicInfo.linkedIn.replace('https://', '')}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="grid grid-cols-[34%_1px_1fr]">
        {/* Left column */}
        <div className="px-9 py-8">
          {summary && (
            <section className="mb-8">
              <SectionHeading>Summary</SectionHeading>
              <div className="text-sm leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: summary }} />
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <SectionHeading>Skills</SectionHeading>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {skills.map((skill) => (
                  <li key={skill.name} className="flex gap-2">
                    <span>&middot;</span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Divider */}
        <div className="bg-slate-200" />

        {/* Right column */}
        <div className="px-9 py-8">
          {experienceList.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-6">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="italic font-bold text-slate-900">{exp.title}</h3>
                      <span className="whitespace-nowrap text-sm italic font-bold text-slate-900">
                        {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">
                      {exp.employer}
                      {exp.location ? ` - ${exp.location}` : ''}
                    </p>
                    <HtmlBullets html={exp.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {educationList.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-4">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="italic font-bold text-slate-900">{edu.schoolName}</h3>
                      <span className="whitespace-nowrap text-sm italic font-bold text-slate-900">
                        {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">
                      {edu.location} | {edu.degree}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {additionalSections.map((sec, idx) => (
            <section className="mb-8" key={idx}>
              <SectionHeading>{sec.title}</SectionHeading>
              <HtmlBullets html={sec.description} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Astral;
