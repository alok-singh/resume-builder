import React from 'react';
import { Sparkle } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children, style }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-900 p-4">
      <h2 className="font-eb-garamond text-xl text-slate-900">{children}</h2>
      <Sparkle size={16} className="text-rose-300" style={style} />
    </div>
  );
};

const HtmlList = ({ html }) => {
  return (
    <div
      className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-none [&_ul]:space-y-1.5 [&_ul]:pl-0 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-rose-300 [&_li]:before:content-['•']"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const Aurora = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const templateThemeBgColor = props?.templateThemeColor?.bg || '#ffadcb';

  return (
    <div className="mx-auto w-full max-w-4xl font-eb-garamond text-slate-900" style={{backgroundColor: `${templateThemeBgColor}30`}}>
      <div className="grid grid-cols-2 border-b border-slate-900">
        <div className="border-r border-slate-900 px-2.5 py-6 relative text-center">
          <div class="absolute left-1/2 -translate-x-1/2 z-0 w-40.5 h-40.5 rounded-[50px] blur-[41px]" style={{ backgroundColor: templateThemeBgColor }}></div>
          <h1 className="text-5xl leading-tight relative">
            {basicInfo.firstName}
            <br />
            {basicInfo.lastName}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-widest relative">{basicInfo.currentJobTitle}</p>
        </div>
        <div className="pt-6">
          {basicInfo.phoneNumber && (
            <div className="border-b border-slate-900 py-2 text-sm px-8">
              <span className="font-bold">Phone:</span> {basicInfo.phoneNumber}
            </div>
          )}
          {basicInfo.email && (
            <div className="border-b border-slate-900 py-2 text-sm px-8">
              <span className="font-bold">Email:</span> {basicInfo.email}
            </div>
          )}
          {basicInfo.address && (
            <div className="border-b border-slate-900 py-2 text-sm px-8">
              <span className="font-bold">Address:</span> {basicInfo.address}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="border-r border-slate-900">
          {experienceList.length > 0 && (
            <section className="border-b border-slate-900">
              <SectionHeading style={{ color: templateThemeBgColor }}>Experience</SectionHeading>
              <div>
                {experienceList.map((exp, idx) => (
                  <div key={idx} className="px-8 py-4">
                    <p className="text-sm font-bold">
                      {exp.start} - {exp.isCurrentJob ? 'Current' : exp.end}
                    </p>
                    <p className="text-sm uppercase my-2">{exp.title}</p>
                    <p className="text-sm">
                      {exp.employer}, {exp.location}
                    </p>
                    {exp.description ? <HtmlList html={exp.description} /> : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {educationList.length > 0 && (
            <section className="border-b border-slate-900">
              <SectionHeading style={{ color: templateThemeBgColor }}>Education</SectionHeading>
              <div>
                {educationList.map((edu, idx) => (
                  <div key={idx} className="px-8 py-4">
                    <p className="text-sm font-bold">
                      {edu.start} - {edu.isPursuing ? 'Current' : edu.end}
                    </p>
                    <p className="text-sm uppercase my-2">{edu.degree}</p>
                    <p className="text-sm">
                      {edu.schoolName}, {edu.location}
                    </p>
                    {edu.description ? <HtmlList html={edu.description} /> : null}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {summary && (
            <section className="border-b border-slate-900">
              <SectionHeading style={{ color: templateThemeBgColor }}>Summary</SectionHeading>
              <p className="text-sm leading-relaxed px-8 py-4" dangerouslySetInnerHTML={{ __html: summary }} />
            </section>
          )}
          {skills.length > 0 && (
            <section className="border-b border-slate-900">
              <SectionHeading style={{ color: templateThemeBgColor }}>Skills</SectionHeading>
              <ul className="space-y-2 text-sm px-8 py-4">
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </section>
          )}
          {additionalSections.length > 0 &&
            additionalSections.map((additionalSection, idx) => (
              <section className="border-b border-slate-900">
                <SectionHeading style={{ color: templateThemeBgColor }}>{additionalSection.title}</SectionHeading>
                <div className="px-8 py-4">
                  <HtmlList html={additionalSection.description} />
                </div>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Aurora;
