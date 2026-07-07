import { Mail, MapPin, Phone } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const SectionHeading = ({ children }) => {
  return (
    <div className="mb-3">
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">{children}</h2>
      <div className="mt-1.5 h-0.5 w-6 bg-slate-900" />
    </div>
  );
};

const HtmlBullets = ({ html }) => {
  return <div className="space-y-1.5 text-sm leading-relaxed text-slate-700 [&_ul]:list-none [&_ul]:space-y-1.5 [&_ul]:pl-0 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:content-['•']" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Orbit = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.postCode].filter(Boolean).join(', ');

  return (
    <div className="mx-auto w-full max-w-4xl bg-white p-10 font-sans text-slate-800">
      {/* Name header */}
      <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-slate-900">
        {basicInfo.firstName}
        <br />
        {basicInfo.lastName}
      </h1>
      <p className="mt-2 text-base text-slate-700">{basicInfo.currentJobTitle}</p>

      <div className="my-6 border-t border-slate-300" />

      {/* Two-column layout */}
      <div className="grid grid-cols-[30%_1px_1fr] gap-x-8">
        {/* Left column */}
        <div>
          <section className="mb-8">
            <SectionHeading>Details</SectionHeading>
            <div className="space-y-4 text-sm text-slate-700">
              {fullAddress && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-900">
                    <MapPin size={12} /> Address
                  </p>
                  <p className="mt-1">{fullAddress}</p>
                </div>
              )}
              {basicInfo.phoneNumber && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-900">
                    <Phone size={12} /> Phone
                  </p>
                  <p className="mt-1">{basicInfo.phoneNumber}</p>
                </div>
              )}
              {basicInfo.email && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-900">
                    <Mail size={12} /> Email
                  </p>
                  <p className="mt-1 break-all">{basicInfo.email}</p>
                </div>
              )}
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <SectionHeading>Skills</SectionHeading>
              <ul className="space-y-2 text-sm text-slate-700">
                {skills.map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Divider */}
        <div className="bg-slate-200" />

        {/* Right column */}
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
                  <div key={idx}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-bold text-slate-900">
                        {exp.title}, {exp.employer}
                      </h3>
                      <span className="whitespace-nowrap text-sm font-bold text-slate-900">{exp.location}</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {exp.start} - {exp.isCurrentJob ? 'Current' : exp.end}
                    </p>
                    <div className="mt-2">
                      <HtmlBullets html={exp.description} />
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
                  <div key={idx}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-bold text-slate-900">
                        {edu.schoolName}, {edu.degree}
                      </h3>
                      <span className="whitespace-nowrap text-sm font-bold text-slate-900">{edu.location}</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {edu.start} - {edu.isPursuing ? 'Current' : edu.end}
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

export default Orbit;
