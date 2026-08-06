import React from 'react';
import { Mail, Phone, MapPin, Link } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="text-sm font-semibold tracking-widest text-slate-700 uppercase pb-2 mb-4 border-b border-slate-300">{children}</h2>;
};

const HtmlBlock = ({ html, className = '' }) => {
  return <div className={`text-slate-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
};

const Celestial = (props) => {
  const data = props.basicInfo ? props : resumeData;
  const { basicInfo, experienceList = [], educationList = [], skills = [], summary, additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.postCode, basicInfo.country].filter(Boolean).join(', ');

  return (
    <div style={props.style} className={`flex font-montserrat text-[14px] ${props.fullView ? '' : 'h-full'}`}>
      {/* Sidebar */}
      <aside className="w-[34%] px-7 py-10 do-not-hide" style={{ backgroundColor: props?.templateThemeColor?.bg || 'rgb(242, 242, 242)', color: props?.templateThemeColor?.txt || '#333333' }}>
        <h1 className="text-3xl uppercase leading-tight break-all" style={{ color: props?.templateThemeColor?.txt || '#2e404a' }}>
          {basicInfo.firstName}
          <br />
          {basicInfo.lastName}
        </h1>
        <p className="mt-3 text-base" style={{ color: props?.templateThemeColor?.txt || '#45556c' }}>
          {basicInfo.currentJobTitle}
        </p>

        {/* Details */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold tracking-widest uppercase pb-2 mb-4 border-b border-slate-300" style={{ color: props?.templateThemeColor?.txt || '#314158' }}>
            Details
          </h2>
          <div className="space-y-3 text-sm" style={{ color: props?.templateThemeColor?.txt || '#45556c' }}>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full" style={{ backgroundColor: props?.templateThemeColor?.txt || '#314158', color: props?.templateThemeColor?.bg || '#ffffff' }}>
                <Mail size={14} />
              </span>
              <a href={`mailto:${basicInfo.email}`} className="break-all hover:underline">
                {basicInfo.email}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full" style={{ backgroundColor: props?.templateThemeColor?.txt || '#314158', color: props?.templateThemeColor?.bg || '#ffffff' }}>
                <Phone size={14} />
              </span>
              <span>{basicInfo.phoneNumber}</span>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full" style={{ backgroundColor: props?.templateThemeColor?.txt || '#314158', color: props?.templateThemeColor?.bg || '#ffffff' }}>
                <MapPin size={14} />
              </span>
              <span>{fullAddress}</span>
            </div>

            {basicInfo.linkedIn && (
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full" style={{ backgroundColor: props?.templateThemeColor?.txt || '#314158', color: props?.templateThemeColor?.bg || '#ffffff' }}>
                  <Link size={14} />
                </span>
                <a href={basicInfo.linkedIn} target="_blank" rel="noreferrer" className="break-all hover:underline">
                  {basicInfo.linkedIn.replace('https://', '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold tracking-widest uppercase pb-2 mb-4 border-b border-slate-300" style={{ color: props?.templateThemeColor?.txt || '#314158' }}>
              Skills
            </h2>
            <ul className="space-y-2 text-sm" style={{ color: props?.templateThemeColor?.txt || '#45556c' }}>
              {skills.map((skill) => (
                <li key={skill.name} className="flex items-center gap-2">
                  <span className="text-slate-400">&middot;</span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="w-[66%] px-9 py-10 bg-white">
        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <SectionHeading>Summary</SectionHeading>
            <HtmlBlock html={summary} />
          </section>
        )}

        {/* Experience */}
        {experienceList.length > 0 && (
          <section className="mb-8">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-6">
              {experienceList.map((exp, idx) => (
                <div key={idx}>
                  <p className="text-sm text-slate-500">
                    {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                  </p>
                  <h3 className="my-2 font-semibold text-[#2e404a]">{exp.title}</h3>
                  <p className="text-sm text-slate-600">
                    {exp.employer}
                    {exp.location ? `, ${exp.location}` : ''}
                  </p>
                  <HtmlBlock html={exp.description} className="mt-2 text-sm" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <section className="mb-8">
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-6">
              {educationList.map((edu, idx) => (
                <div key={idx}>
                  <p className="text-sm text-slate-500">
                    {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                  </p>
                  <h3 className="mt-1 font-semibold text-[#2e404a]">{edu.degree}</h3>
                  <p className="text-sm text-slate-600">
                    {edu.schoolName}
                    {edu.location ? `, ${edu.location}` : ''}
                  </p>
                  <HtmlBlock html={edu.description} className="mt-2 text-sm" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional sections (e.g. Achievements) */}
        {additionalSections.map((sec, idx) => (
          <section className="mb-8" key={idx}>
            <SectionHeading>{sec.title}</SectionHeading>
            <HtmlBlock html={sec.description} className="text-sm" />
          </section>
        ))}
      </main>
    </div>
  );
};

export default Celestial;
