import React from 'react';
import { Phone, Mail, MapPin, Link2 } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';
import EuropeanUnionIcon from '../../icons/european-union';
import { getLanguageProficiency } from '../../utils/helper.util';

const SectionHeading = ({ children, style, showStar }) => {
  return (
    <div className="mb-2 flex gap-2 items-center">
      <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 uppercase">
        {showStar ? <span className="inline-block h-2.5 w-2.5 rotate-45 bg-[#5a61a9]" style={style} /> : null}
        {children}
      </h2>
      <div className="h-px grow bg-[#bdbfdd]" />
    </div>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800" dangerouslySetInnerHTML={{ __html: html }} />;
};

const TwoColumnBalanced = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], languages = [], additionalSections = [] } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.postCode, basicInfo.city, basicInfo.country].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#5a61a9';
  return (
    <div className="bg-white font-open-sans text-slate-900 h-full flex flex-col [&_ul]:list-disc [&_ul]:pl-4" style={{ ...(props.style || {}) }}>
      <div className="flex items-center justify-between p-6 text-white" style={{ background: themeStyleBgColor }}>
        <div>
          <h1 className="text-2xl font-bold uppercase">{fullName}</h1>
          <p className="text-sm mt-2">{basicInfo.currentJobTitle}</p>
        </div>
        <div className="flex justify-end items-center gap-3">
          <EuropeanUnionIcon style={{ width: '32px', marginTop: '4px' }} />
          <span className="leading-1 text-white text-[24px]">europass</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr] grow">
        <div className="bg-[#f2f2f8] p-6 do-not-hide">
          {summary && (
            <div className="mb-6">
              <SectionHeading showStar={true} style={{ background: themeStyleBgColor }}>
                Summary
              </SectionHeading>
              <HtmlList html={summary} />
            </div>
          )}

          <div className="mb-6">
            <SectionHeading showStar={true} style={{ background: themeStyleBgColor }}>
              Contacts
            </SectionHeading>
            <div className="space-y-2 text-sm">
              {basicInfo.phoneNumber && (
                <p className="flex items-center gap-2">
                  <b className="uppercase">Phone Number: </b>
                  {basicInfo.phoneNumber}
                </p>
              )}
              {basicInfo.email && (
                <p className="flex items-center gap-2">
                  <b className="uppercase">Email: </b>
                  {basicInfo.email}
                </p>
              )}
              {fullAddress && (
                <p className="flex items-start gap-2">
                  <b className="uppercase">Address: </b>
                  {fullAddress}
                </p>
              )}
            </div>
          </div>

          {basicInfo.linkedIn && (
            <div className="mb-6">
              <SectionHeading showStar={true} style={{ background: themeStyleBgColor }}>
                Social Links
              </SectionHeading>
              <p className="flex items-center gap-1.5 text-sm">
                <b className="uppercase">Linkedin: </b>
                <span className="underline" style={{ color: themeStyleBgColor }}>
                  {basicInfo.linkedIn.replace('https://', '')}
                </span>
              </p>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mb-6">
              <SectionHeading showStar={true} style={{ background: themeStyleBgColor }}>
                Skills
              </SectionHeading>
              <ul className="space-y-1.5 text-sm">
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <SectionHeading showStar={true} style={{ background: themeStyleBgColor }}>
                Languages
              </SectionHeading>
              <p className="text-sm">
                Mother: <span className="font-bold">{languages[0]?.name}</span>
              </p>
              {languages.length > 1 && (
                <div className="mt-1 text-sm">
                  <div className="mt-2">Other Language(s):</div>
                  {languages.slice(1).map((l) => (
                    <div key={l.name} className="mt-1">
                      <span className="font-bold">{l.name}</span> {getLanguageProficiency(l.level)}{' '}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6">
          {experienceList.length > 0 && (
            <section className="mb-6">
              <SectionHeading style={{ background: themeStyleBgColor }}>Experience</SectionHeading>
              <div className="space-y-4 border-l-2 border-[#f2f2f8]">
                {experienceList.map((exp, idx) => (
                  <div key={idx} className="relative pl-4">
                    <span className="absolute -left-1.25 top-1 h-2 w-2 border-2 rounded-full bg-white" style={{ borderColor: themeStyleBgColor }} />
                    <p className="text-sm text-slate-500">
                      {exp.start} &ndash; {exp.isCurrentJob ? 'Current' : exp.end} &nbsp;{exp.location}
                    </p>
                    <p className="font-bold text-base">
                      {exp.title} | {exp.employer}
                    </p>
                    <HtmlList html={exp.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {educationList.length > 0 && (
            <section>
              <SectionHeading style={{ background: themeStyleBgColor }}>Education</SectionHeading>
              <div className="space-y-4 border-l-2 border-[#f2f2f8]">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="relative pl-4">
                    <span className="absolute -left-1.25 top-1 h-2 w-2 border-2 rounded-full bg-white" style={{ borderColor: themeStyleBgColor }} />
                    <p className="text-sm text-slate-500">
                      {edu.start} &ndash; {edu.isPursuing ? 'Current' : edu.end}
                    </p>
                    <p className="font-bold">{edu.degree}</p>
                    <p className="text-sm">{edu.schoolName}</p>
                    {edu.description ? <HtmlList html={edu.description} /> : null}
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

export default TwoColumnBalanced;
