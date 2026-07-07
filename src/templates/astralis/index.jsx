import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';
import TrapezoidIcon from '../../icons/trapezoid';

const SectionHeading = ({ children }) => {
  return <h2 className="mb-3 text-lg font-bold text-teal-800 capitalize">{children}</h2>;
};

const HtmlBullets = ({ html }) => {
  return <div className="space-y-2 text-sm leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Astralis = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;

  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.city, basicInfo.address, basicInfo.postCode, basicInfo.country].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#005f5a';
  const themeStyleTagBgColor = props?.templateThemeColor?.txt || '#f4f55d';

  return (
    <div className="mx-auto w-full max-w-4xl border-10 bg-white p-2" style={{ borderColor: themeStyleBgColor }}>
      <div className="border-2 border-white p-8">
        {/* Yellow blob header */}
        <div className="relative mb-8 flex h-40 w-64 flex-col items-start justify-center">
          <div className="absolute w-75 z-0 -left-5">
            <TrapezoidIcon fill={themeStyleTagBgColor} />
          </div>
          <div className="relative">
            <h1 className="text-2xl font-extrabold leading-tight text-slate-900">
              {basicInfo.firstName}
              <br />
              {basicInfo.lastName}
            </h1>
            <p className="mt-1 text-sm font-bold text-slate-900">{basicInfo.currentJobTitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-[62%_1px_1fr] gap-x-8">
          {/* Left column */}
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
                <div className="space-y-5">
                  {experienceList.map((exp, idx) => (
                    <div key={idx} className="grid grid-cols-[110px_1fr] gap-4">
                      <p className="text-sm font-bold text-slate-900">
                        {exp.start}-
                        <br />
                        {exp.isCurrentJob ? 'Current' : exp.end}
                      </p>
                      <div>
                        <h3 className="font-bold text-slate-900">{exp.title}</h3>
                        <p className="text-sm font-semibold text-slate-700">
                          {exp.employer}
                          {exp.location ? `, ${exp.location}` : ''}
                        </p>
                        <div className="mt-1">
                          <HtmlBullets html={exp.description} />
                        </div>
                      </div>
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
                    <div key={idx} className="grid grid-cols-[110px_1fr] gap-4">
                      <p className="text-sm font-bold text-slate-900">
                        {edu.start}-
                        <br />
                        {edu.isPursuing ? 'Current' : edu.end}
                      </p>
                      <div>
                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                        <p className="text-sm font-semibold text-slate-700">
                          {edu.schoolName}
                          {edu.location ? `, ${edu.location}` : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {additionalSections.length > 0
              ? additionalSections.map((section, idx) => {
                  return (
                    <section key={idx} className="mb-8">
                      <SectionHeading>{section?.title?.toLowerCase()}</SectionHeading>
                      <div className="space-y-4">
                        <HtmlBullets html={section.description} />
                      </div>
                    </section>
                  );
                })
              : null}
          </div>

          {/* Divider */}
          <div className="border-l border-dotted border-slate-400" />

          {/* Right sidebar */}
          <div>
            <section className="mb-8">
              <SectionHeading>Details</SectionHeading>
              <div className="space-y-3 text-sm text-slate-700">
                {basicInfo.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-slate-900" style={{ backgroundColor: themeStyleTagBgColor }}>
                      <Phone size={12} />
                    </span>
                    {basicInfo.phoneNumber}
                  </div>
                )}
                {basicInfo.email && (
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-slate-900" style={{ backgroundColor: themeStyleTagBgColor }}>
                      <Mail size={12} />
                    </span>
                    <span className="break-all">{basicInfo.email}</span>
                  </div>
                )}
                {fullAddress && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-slate-900" style={{ backgroundColor: themeStyleTagBgColor }}>
                      <MapPin size={12} />
                    </span>
                    <span>{fullAddress}</span>
                  </div>
                )}
              </div>
            </section>

            {skills.length > 0 && (
              <section>
                <SectionHeading>Skills</SectionHeading>
                <div className="flex flex-col items-start gap-2.5">
                  {skills.map((skill) => (
                    <span key={skill.name} className="rounded-full px-4 py-1.5 text-sm font-semibold text-white" style={{ backgroundColor: themeStyleBgColor }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Astralis;
