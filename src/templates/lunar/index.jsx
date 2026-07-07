import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-3 border-b border-slate-900 pb-1 text-lg font-bold uppercase tracking-wide text-slate-900">{children}</h2>;
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Lunar = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode].filter(Boolean).join(', ');

  return (
    <div className="mx-auto w-full max-w-4xl bg-neutral-100 p-10 font-sans text-slate-900">
      <div className="mx-auto mb-8 w-fit border-2 border-slate-900 px-10 py-4 text-center">
        <h1 className="text-2xl font-bold tracking-wide">{fullName.toUpperCase()}</h1>
        <p className="mt-1 text-sm uppercase tracking-widest">{basicInfo.currentJobTitle}</p>
      </div>

      <div className="grid grid-cols-[28%_1fr] gap-x-8">
        <div>
          <section className="mb-8">
            <SectionHeading>Details</SectionHeading>
            <div className="space-y-3 text-sm text-slate-700">
              {fullAddress && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase">
                    <MapPin size={12} />
                    Address
                  </p>
                  <p>{fullAddress}</p>
                </div>
              )}
              {basicInfo.phoneNumber && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase">
                    <Phone size={12} />
                    Phone
                  </p>
                  <p>{basicInfo.phoneNumber}</p>
                </div>
              )}
              {basicInfo.email && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase">
                    <Mail size={12} />
                    Email
                  </p>
                  <p className="break-all">{basicInfo.email}</p>
                </div>
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
              <p className="text-sm leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: summary }} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-5">
                {experienceList.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-bold">
                        {exp.title}, {exp.employer}
                      </p>
                      <span className="text-sm font-bold">{exp.location}</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {exp.start} - {exp.isCurrentJob ? 'Current' : exp.end}
                    </p>
                    <HtmlList html={exp.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {educationList.length > 0 && (
            <section>
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-3">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-bold">
                        {edu.schoolName}, {edu.degree}
                      </p>
                      <span className="text-sm font-bold">{edu.location}</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {edu.start} - {edu.isPursuing ? 'Current' : edu.end}
                    </p>
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

export default Lunar;
