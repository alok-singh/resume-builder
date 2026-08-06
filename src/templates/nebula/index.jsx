import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionTitle = ({ title, className = '' }) => {
  return <h2 className={`mb-2 border-b border-[#4f5f67] pb-1 text-sm font-bold uppercase tracking-wide ${className}`}>{title}</h2>;
};

const Nebula = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.city, basicInfo.postCode].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#9DBACA';
  return (
    <div style={props.style} className="bg-white font-roboto text-slate-900 h-full flex flex-col">
      <div className="grid grid-cols-[36.17%_1fr]" style={{ backgroundColor: themeStyleBgColor }}>
        <div className="border-r border-[#5a707d] p-8 text-[#2e404a]">
          <h1 className="text-3xl font-bold">{fullName}</h1>
          <p className="text-sm font-bold my-2">{basicInfo.currentJobTitle}</p>
          <div className="mt-4 space-y-1.5 text-sm">
            {basicInfo.email && (
              <div className="flex items-center gap-2">
                <div className="p-1.25 rounded-full text-white bg-black">
                  <Mail size={12} />
                </div>
                {basicInfo.email}
              </div>
            )}
            {basicInfo.phoneNumber && (
              <div className="flex items-center gap-2">
                <div className="p-1.25 rounded-full text-white bg-black">
                  <Phone size={12} />
                </div>
                {basicInfo.phoneNumber}
              </div>
            )}
            {fullAddress && (
              <div className="flex items-center gap-2">
                <div className="p-1.25 rounded-full text-white bg-black">
                  <MapPin size={12} />
                </div>
                {fullAddress}
              </div>
            )}
          </div>
        </div>
        <div className="px-4 py-12 text-black">
          <SectionTitle title="Summary" />
          <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
      </div>

      <div className="grid grid-cols-[36.17%_1fr] grow">
        <div className="border-r border-[#7e8c93] px-4 py-8 do-not-hide">
          {educationList.length > 0 && (
            <section className="mb-8">
              <SectionTitle title="Education" />
              {educationList.map((edu, idx) => (
                <div key={`nebula-education-${idx}`}>
                  <p className="font-bold">{edu.schoolName}</p>
                  <p className="text-sm italic text-slate-600 my-2">
                    {edu.location} &middot; {edu.start} - {edu.isPursuing ? 'Current' : edu.end}
                  </p>
                  <p className="mt-1 font-bold">{edu.degree}</p>
                  <p className="text-sm">{edu.field}</p>
                  {edu.description ? <div className="mt-1 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: edu.description }} /> : null}
                </div>
              ))}
            </section>
          )}
          {skills.length > 0 && (
            <section className="mb-8">
              <SectionTitle title="Skills" />
              <ul className="space-y-1.5 text-sm">
                {skills.map((s) => (
                  <li key={`nebula-skill-${s.name}`}>{s.name}</li>
                ))}
              </ul>
            </section>
          )}

          {additionalSections.length > 0 &&
            additionalSections.map((additionalSection, idx) => (
              <section className="mb-8" key={idx}>
                <SectionTitle title={additionalSection.title} />
                {additionalSection.description ? <div className="mt-1 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: additionalSection.description }} /> : null}
              </section>
            ))}
        </div>

        <div className="px-4 py-8">
          {experienceList.length > 0 && (
            <section>
              <SectionTitle title="Experience" />
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={`nebula-experience-${idx}`}>
                    <p className="font-bold">{exp.title}</p>
                    <p className="text-sm italic text-slate-600 my-2">
                      {exp.location} &middot; {exp.start} - {exp.isCurrentJob ? 'Current' : exp.end}
                    </p>
                    {exp.description ? <div className="mt-1 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: exp.description }} /> : null}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nebula;
