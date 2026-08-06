import React from 'react';
import resumeData from '../../data/candidate-1-data.json';

const Executive = (props) => {
  const resume = props.basicInfo ? props : resumeData;
  const { basicInfo, summary, experienceList, educationList, skills, languages } = resume;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;

 return (
    <div style={props.style} className={`bg-[#f2f2f2] rounded-lg overflow-hidden shadow-sm text-[#111827]`}>
      {/* Header */}
      <div className="bg-[#dfe5ed] px-10 py-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold text-slate-900">{fullName}</h1>
            <p className="mt-2 text-xl text-slate-700">{basicInfo.currentJobTitle}</p>
          </div>

          <div className="text-4xl font-bold text-purple-700">europass</div>
        </div>

        <div className="mt-6 border-t border-slate-300 pt-4 text-lg">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>
              <strong>Email:</strong> {basicInfo.email}
            </span>
            <span className="text-slate-400">|</span>

            <span>
              <strong>Phone:</strong> {basicInfo.phoneNumber}
            </span>
            <span className="text-slate-400">|</span>

            {basicInfo.linkedIn ? (
              <span>
                <strong>LinkedIn:</strong>{' '}
                <a className="text-blue-600 underline" href={basicInfo.linkedIn}>
                  {basicInfo.linkedIn}
                </a>
              </span>
            ) : null}
          </div>

          <div className="mt-2">
            <strong>Address:</strong> {basicInfo.address}, {basicInfo.city}, {basicInfo.country}
          </div>
        </div>
      </div>

      <div className="p-10 space-y-10">
        {/* Summary */}
        <Section title="SUMMARY">
          <div className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
        </Section>

        {/* Experience */}
        <Section title="EXPERIENCE">
          <div className="space-y-8">
            {experienceList.map((exp, index) => (
              <div key={index}>
                <div className="text-sm text-slate-600">
                  {exp.start} – {exp.isCurrentJob ? 'Current' : exp.end} | {exp.location}
                </div>

                <div className="mt-1 text-2xl">
                  <span className="font-bold">{exp.title}</span>
                  <span className="mx-2 text-blue-300">|</span>
                  <span>{exp.employer}</span>
                </div>

                <div className="mt-2 prose max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }} />
              </div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="EDUCATION">
          <div className="space-y-6">
            {educationList.map((edu, index) => (
              <div key={index}>
                <div className="text-sm text-slate-600">
                  {edu.start} – {edu.end} | {edu.location}
                </div>

                <div className="mt-1 text-xl">
                  <span className="font-bold">{edu.degree}</span>
                  <span className="mx-2">|</span>
                  <span>{edu.schoolName}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title="SKILLS">
          <div className="flex flex-wrap gap-3 text-lg">
            {skills.map((skill, index) => (
              <React.Fragment key={skill.name}>
                <span>{skill.name}</span>
                {index < skills.length - 1 && <span className="text-slate-400">|</span>}
              </React.Fragment>
            ))}
          </div>
        </Section>

        {/* Languages */}
        <Section title="LANGUAGES">
          <div>
            {languages.map((lang, index) => (
              <span key={lang.name}>
                <strong>{lang.name.toUpperCase()}</strong>
                {index < languages.length - 1 && <span className="mx-3 text-slate-400">|</span>}
              </span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section>
    <div className="flex items-center gap-3 mb-4">
      <div className="h-3 w-3 rounded-full bg-blue-400" />
      <h2 className="text-2xl font-bold tracking-wide">{title}</h2>
    </div>

    <div className="border-t border-blue-200 pt-4">{children}</div>
  </section>
);

export default Executive;
