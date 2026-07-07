import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const candidateData = {
  basicInfo: {
    firstName: "Subrmaniyamswamy",
    lastName: "Jaikishor",
    currentJobTitle: "Technical Lead",
    phoneNumber: "+60167648556",
    email: "aloksingh7131@gmail.com",
    address: "Link 2 Bukit Jalil",
    city: "Kuala Lumpur",
    country: "Malaysia",
    postCode: "57000",
  },
  experienceList: [
    { title: "Technical Lead, TCS Malaysia, Kuala Lumpur", start: "Oct 2021", end: "", isCurrentJob: true,
      description: "<ul><li>Led cross-functional teams comprising developers, QA engineers, UI designers, and business analysts.</li><li>Designed and implemented scalable microservices architecture using Node.js and AWS services.</li></ul>" },
    { title: "Founding Engineer, Traceable AI (Harness), San Fransisco", start: "May 2021", end: "Oct 2021", isCurrentJob: false,
      description: "<ul><li>Independently built major features including APIDetails and API Vulnerabilities pages.</li><li>Developed complex visualisations using D3.js.</li></ul>" },
  ],
  educationList: [
    { schoolName: "Indian Institute of Technology, New Delhi", degree: "B.Tech, Textile Technology", start: "04/2011", end: "04/2015", isPursuing: false },
  ],
  skills: [{ name: "TypeScript" }, { name: "React" }, { name: "Design Systems" }, { name: "AWS" }],
  summary:
    "Technical Lead with 10+ years delivering scalable web and cloud systems using NodeJs, React, AWS, and Microservices. Led teams of up to 14 engineers, cut infrastructure costs by 25%.",
};

function SectionHeading({ children }) {
  return <h2 className="mb-3 text-xl font-bold text-slate-900">{children}</h2>;
}

function HtmlList({ html }) {
  return (
    <div
      className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function ResumeTemplate20({ data = candidateData }) {
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.city, basicInfo.country, basicInfo.postCode]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto w-full max-w-4xl bg-white font-sans text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-t-md bg-slate-400 px-8 py-6 text-white">
        <h1 className="text-2xl font-bold">{fullName}</h1>
        <div className="space-y-1 text-right text-sm">
          {basicInfo.email && <p className="flex items-center justify-end gap-1.5">{basicInfo.email}<Mail size={13} /></p>}
          {basicInfo.phoneNumber && <p className="flex items-center justify-end gap-1.5">{basicInfo.phoneNumber}<Phone size={13} /></p>}
          {fullAddress && <p className="flex items-center justify-end gap-1.5">{fullAddress}<MapPin size={13} /></p>}
        </div>
      </div>

      <div className="px-8 py-8">
        <p className="mb-6 text-sm font-bold">{basicInfo.currentJobTitle}</p>

        {summary && (
          <section className="mb-8">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }}/>
          </section>
        )}

        {experienceList.length > 0 && (
          <section className="mb-8">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-5">
              {experienceList.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between">
                    <p className="font-bold">{exp.title}</p>
                    <span className="text-sm">{exp.start} &mdash; {exp.isCurrentJob ? "Current" : exp.end}</span>
                  </div>
                  <HtmlList html={exp.description} />
                </div>
              ))}
            </div>
          </section>
        )}

        {educationList.length > 0 && (
          <section className="mb-8">
            <SectionHeading>Education</SectionHeading>
            <div className="flex items-baseline justify-between">
              {educationList.map((edu, idx) => (
                <React.Fragment key={idx}>
                  <p className="font-bold">{edu.schoolName}</p>
                  <span className="text-sm">{edu.start} &mdash; {edu.isPursuing ? "Current" : edu.end}</span>
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <SectionHeading>Skills</SectionHeading>
            <ul className="space-y-1.5 text-sm">
              {skills.map((s) => <li key={s.name} className="flex gap-2"><span>&middot;</span>{s.name}</li>)}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
