import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';

const Nebula = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.city, basicInfo.postCode].filter(Boolean).join(', ');
  const additionalSections = data.additionalSections || [];

  return (
    <div className="mx-auto w-full max-w-4xl bg-white font-roboto text-slate-900">
      <div className="grid grid-cols-2 bg-slate-400/70">
        <div className="border-r border-slate-500/40 p-8">
          <h1 className="text-2xl font-bold">{fullName}</h1>
          <p className="text-sm font-bold">{basicInfo.currentJobTitle}</p>
          <div className="mt-4 space-y-1.5 text-sm">
            {basicInfo.email && (
              <p className="flex items-center gap-2">
                <Mail size={14} />
                {basicInfo.email}
              </p>
            )}
            {basicInfo.phoneNumber && (
              <p className="flex items-center gap-2">
                <Phone size={14} />
                {basicInfo.phoneNumber}
              </p>
            )}
            {fullAddress && (
              <p className="flex items-center gap-2">
                <MapPin size={14} />
                {fullAddress}
              </p>
            )}
          </div>
        </div>
        <div className="p-8">
          <h2 className="mb-2 border-b border-slate-500/40 pb-1 text-sm font-bold uppercase tracking-wide">Summary</h2>
          <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="border-r border-slate-200 p-8">
          {educationList.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wide">Education</h2>
              {educationList.map((edu, idx) => (
                <div key={`nebula-education-${idx}`}>
                  <p className="font-bold">{edu.schoolName}</p>
                  <p className="text-sm italic text-slate-600">
                    {edu.location} &middot; {edu.start} - {edu.isPursuing ? 'Current' : edu.end}
                  </p>
                  <p className="mt-1 font-bold">{edu.degree}</p>
                  <p className="text-sm">{edu.field}</p>
                </div>
              ))}
            </section>
          )}
          {skills.length > 0 && (
            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wide">Skills</h2>
              <ul className="space-y-1.5 text-sm">
                {skills.map((s) => (
                  <li key={`nebula-skill-${s.name}`}>{s.name}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="p-8">
          {experienceList.length > 0 && (
            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wide">Experience</h2>
              <div className="space-y-4">
                {experienceList.map((exp, idx) => (
                  <div key={`nebula-experience-${idx}`}>
                    <p className="font-bold">{exp.title}</p>
                    <p className="text-sm italic text-slate-600">
                      {exp.location} &middot; {exp.start} - {exp.isCurrentJob ? 'Current' : exp.end}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description }} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {additionalSections.length > 0 &&
          experienceList.map((exp, idx) => (
            <div key={`nebula-additional-${idx}`} className="p-8">
              <section className="mb-8">
                <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wide">{exp.title}</h2>
                <p className="mt-1 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description }} />
              </section>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Nebula;
