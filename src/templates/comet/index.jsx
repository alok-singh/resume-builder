import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const Badge = ({ children }) => {
  return <span className="bg-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">{children}</span>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Comet = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');
  const themeStyleBgColor = props?.templateThemeColor?.bg || '#ffe14d';
 return (
    <div style={props.style} className="h-full text-[14px] bg-white font-open-sans shadow-sm">
      {/* Yellow header */}
      <div className="flex items-center gap-6 px-8 py-4" style={{ backgroundColor: themeStyleBgColor }}>
        {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={basicInfo.firstName} className="h-30 w-30 flex-none rounded object-cover" />}
        <div>
          <h1 className="text-3xl font-extrabold uppercase leading-tight text-slate-900">
            {basicInfo.firstName} <br /> {basicInfo.lastName}{' '}
          </h1>
          <p className="mt-1 text-lg text-slate-800">{basicInfo.currentJobTitle}</p>
        </div>
      </div>

      <div className="px-8 py-8">
        <div className="mb-6">
          <Badge>Details</Badge>
          <div className="mt-3 space-y-1.5 text-sm text-slate-800">
            {fullAddress && (
              <p className="flex items-center gap-2">
                <MapPin size={14} />
                {fullAddress}
              </p>
            )}
            {basicInfo.phoneNumber && (
              <p className="flex items-center gap-2">
                <Phone size={14} />
                {basicInfo.phoneNumber}
              </p>
            )}
            {basicInfo.email && (
              <p className="flex items-center gap-2">
                <Mail size={14} />
                {basicInfo.email}
              </p>
            )}
          </div>
        </div>

        {summary && (
          <div className="mb-6">
            <Badge>Summary</Badge>
            <HtmlList html={summary} />
          </div>
        )}

        {experienceList.length > 0 && (
          <div className="mb-6">
            <Badge>Experience</Badge>
            <div className="mt-3 space-y-5">
              {experienceList.map((exp, idx) => (
                <div key={idx}>
                  <p className="text-sm font-bold text-slate-900">
                    {exp.title}, {exp.employer}, {exp.location}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                  </p>
                  <HtmlList html={exp.description} />
                </div>
              ))}
            </div>
          </div>
        )}

        {educationList.length > 0 && (
          <div className="mb-6">
            <Badge>Education</Badge>
            <div className="mt-3 space-y-4">
              {educationList.map((edu, idx) => (
                <div key={idx}>
                  <p className="text-sm font-bold text-slate-900">
                    {edu.degree}, {edu.schoolName}, {edu.location}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {edu.start} &mdash; {edu.isPursuing ? 'Current' : edu.end}
                  </p>
                  {edu.description && <HtmlList html={edu.description} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {additionalSections.length > 0 &&
          additionalSections.map((section, idx) => (
            <div className="mb-6" key={idx}>
              <Badge>{section.title}</Badge>
              <HtmlList html={section.description} />
            </div>
          ))}

        {skills.length > 0 && (
          <div>
            <Badge>Skills</Badge>
            <ul className="mt-3 space-y-2 text-sm font-bold text-slate-900">
              {skills.map((skill) => (
                <li key={skill.name} className="flex gap-2">
                  <span>&bull;</span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comet;
