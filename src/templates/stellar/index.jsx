import React from 'react';
import { FileText, Briefcase, GraduationCap, Trophy, Mail, Phone, MapPin, Star } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ icon: Icon, children }) => {
 return (
    <div className="border-b-2 border-slate-200 mb-4">
      <div className="flex items-center gap-2 border-b-2 border-slate-900 w-fit -mb-0.5">
        {Icon ? <Icon size={16} className="text-black" /> : null}
        <h2 className="text-lg font-bold uppercase tracking-wide text-slate-900">{children}</h2>
      </div>
    </div>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Stellar = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');

 return (
    <div style={props.style} className="bg-white p-10 font-open-sans text-slate-900 h-full">
      <h1 className="text-2xl font-extrabold border-t-4 border-slate-900 tracking-wide pt-4 pb-2">{fullName.toUpperCase()}</h1>
      <p className="text-sm uppercase tracking-widest border-b-4 border-slate-900 text-slate-600 pb-4">{basicInfo.currentJobTitle}</p>

      <div className="flex">
        <div className="pt-16 grow do-not-hide">
          {summary && (
            <section className="mb-8">
              <SectionHeading icon={FileText}>Summary</SectionHeading>
              <div className="mt-3 text-sm leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: summary }} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mb-8">
              <SectionHeading icon={Briefcase}>Experience</SectionHeading>
              <div className="mt-3 space-y-5">
                {experienceList.map((exp, idx) => (
                  <div key={idx} className="grid grid-cols-[130px_1fr] gap-4 border-l border-slate-200 pl-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500">
                        {exp.start} &mdash; {exp.isCurrentJob ? 'Current' : exp.end}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold mb-4 leading-none">{exp.title}</p>
                      <p className="text-sm font-semibold text-slate-700">{exp.employer}</p>
                      <HtmlList html={exp.description} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {educationList.length > 0 && (
            <section>
              <SectionHeading icon={GraduationCap}>Education</SectionHeading>
              <div className="mt-3 space-y-3">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="grid grid-cols-[130px_1fr] gap-4 border-l border-slate-200 pl-4">
                    <p className="text-xs font-bold text-slate-500">
                      {edu.start} - {edu.isPursuing ? 'Current' : edu.end}
                    </p>
                    <div>
                      <p className="font-bold">{edu.schoolName}</p>
                      <p className="text-sm text-slate-700">{edu.degree}</p>
                      {edu.description ? <HtmlList html={edu.description} /> : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="w-65 pl-4 pt-16 border-l-2 border-slate-200 do-not-hide">
          <div className="mb-6 space-y-3 text-sm text-slate-700">
            {basicInfo.email && (
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-black" />
                {basicInfo.email}
              </p>
            )}
            {basicInfo.phoneNumber && (
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-black" />
                {basicInfo.phoneNumber}
              </p>
            )}
            {fullAddress && (
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-black" />
                <p className="flex-1">{fullAddress}</p>
              </div>
            )}
          </div>
          {skills.length > 0 && (
            <section className="mb-6">
              <SectionHeading icon={Trophy}>Skills</SectionHeading>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s.name} className="rounded-full border border-slate-400 px-3 py-1 text-xs font-semibold text-slate-700">
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {additionalSections.length > 0 &&
            additionalSections.map((additionalSection, idx) => (
              <section className="mb-6">
                <SectionHeading icon={Star}>{additionalSection.title}</SectionHeading>
                <HtmlList html={additionalSection.description} />
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Stellar;
