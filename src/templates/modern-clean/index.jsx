import { BookOpenText, BriefcaseBusiness, FileTextIcon, Globe, Link, Mail, MapPin, Phone, Sparkles, Trophy } from 'lucide-react';
import resumeData from '../../data/candidate-1-data.json';
import EuropeanUnionIcon from '../../icons/european-union';
import { getLanguageProficiency } from '../../utils/helper.util';

const SectionHeading = ({ children, style }) => {
  return (
    <div className="border-b border-[#b5c5dc]">
      <h2 style={style} className="w-fit pr-2 pb-1 -mb-0.5 flex items-center gap-1 text-xs  font-bold text-slate-900 border-b-2 uppercase">
        {children}
      </h2>
    </div>
  );
};

const HtmlList = ({ html }) => {
  return <div className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-800 [&_ul]:list-disc [&_ul]:pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

const ModernClean = (props) => {
  const data = props?.basicInfo ? props : resumeData;
  const { basicInfo, summary, skills = [], experienceList = [], educationList = [], languages = [], additionalSections = [] } = data;

  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;
  const fullAddress = [basicInfo.address, basicInfo.postCode, basicInfo.city, basicInfo.country].filter(Boolean).join(', ');

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#3685fc';
  const themeStyleSideBgColor = props?.templateThemeColor?.sideBg || '#d6eaff';
  return (
    <div className="h-full bg-white font-open-sans text-slate-900 shadow-sm" style={props.style}>
      <div className="px-8 py-5" style={{ background: themeStyleSideBgColor }}>
        <div className="flex items-center gap-4">
          {basicInfo.profileImage && <img src={basicInfo.profileImage} alt={fullName} style={{ borderColor: themeStyleBgColor }} className="h-20 w-20 rounded-full object-cover border-2" />}
          <div className="grow">
            <div className="flex items-start justify-between">
              <div className="mb-2">
                <h1 className="text-2xl font-bold uppercase">{fullName}</h1>
                <p className="text-xs">{basicInfo.currentJobTitle}</p>
              </div>
              <div className="flex justify-end items-center gap-3">
                <EuropeanUnionIcon style={{ width: '32px', marginTop: '4px' }} />
                <span className="leading-1 text-[#6d3089] font-bold text-[24px]">europass</span>
              </div>
            </div>
            <div className="flex gap-2 text-[10px]">
              {basicInfo.phoneNumber && (
                <p className="flex items-center gap-0.5">
                  <Phone size={14} className="mt-0.5 flex-none" />
                  <span className="break-all">{basicInfo.phoneNumber}</span>
                </p>
              )}
              {basicInfo.email && (
                <p className="flex items-center gap-0.5">
                  <Mail size={14} className="mt-0.5 flex-none" />
                  <span className="break-all">{basicInfo.email}</span>
                </p>
              )}
              {fullAddress && (
                <p className="flex items-center gap-0.5">
                  <MapPin size={14} className="mt-0.5 flex-none" />
                  <span className="break-all">{fullAddress}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_260px] h-full">
        <div className="p-6">
          {summary && (
            <section className="mb-6">
              <SectionHeading style={{ borderColor: themeStyleBgColor }}>
                <FileTextIcon width={18} />
                <span className="tracking-widest">Summary</span>
              </SectionHeading>
              <HtmlList html={summary} />
            </section>
          )}

          {experienceList.length > 0 && (
            <section className="mb-6">
              <SectionHeading style={{ borderColor: themeStyleBgColor }}>
                <BriefcaseBusiness width={18} />
                <span className="tracking-widest">Experience</span>
              </SectionHeading>
              <div className="space-y-4 mt-3 border-l-2 pl-4 border-[#b5c5dc]">
                {experienceList.map((exp, idx) => (
                  <div key={idx} className="relative">
                    <div style={{ borderColor: themeStyleBgColor }} className="w-2.5 h-2.5 rounded-full bg-white border-2 absolute -left-5.5 top-1.25" />
                    <p className="text-sm text-slate-500">
                      {exp.start} &ndash; {exp.isCurrentJob ? 'Current' : exp.end} &nbsp;{exp.location}
                    </p>
                    <p className="font-bold">
                      {exp.title} | {exp.employer}
                    </p>
                    {exp.description ? <HtmlList html={exp.description} /> : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {educationList.length > 0 && (
            <section>
              <SectionHeading style={{ borderColor: themeStyleBgColor }}>
                <BookOpenText width={18} />
                <span className="tracking-widest">Education</span>
              </SectionHeading>
              <div className="space-y-4 mt-3 border-l-2 pl-4 border-[#b5c5dc]">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="relative">
                    <div style={{ borderColor: themeStyleBgColor }} className="w-2.5 h-2.5 rounded-full bg-white border-2 absolute -left-5.5 top-1.25" />
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

        <div className="bg-neutral-50 p-6 do-not-hide">
          <div className="mb-6">
            <SectionHeading style={{ borderColor: themeStyleBgColor }}>
              <Link width={18} />
              <span className="tracking-widest">Social Links</span>
            </SectionHeading>
            {basicInfo.linkedIn && (
              <div className="mt-2">
                <div className="font-bold">LinkedIn:</div>
                <p className="text-xs underline">{basicInfo.linkedIn.replace('https://', '')}</p>
              </div>
            )}
          </div>

          {skills.length > 0 && (
            <div className="mb-6">
              <SectionHeading style={{ borderColor: themeStyleBgColor }}>
                <Trophy width={18} />
                <span className="tracking-widest">Skills</span>
              </SectionHeading>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s.name} className="rounded-full border border-indigo-300 px-3 py-1 text-xs">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {additionalSections.length > 0 &&
            additionalSections.map((additionalSection, idx) => (
              <section className="mb-6">
                <SectionHeading style={{ borderColor: themeStyleBgColor }}>
                  <Sparkles width={18} />
                  <span className="tracking-widest">{additionalSection.title}</span>
                </SectionHeading>
                <HtmlList html={additionalSection.description} />
              </section>
            ))}

          {languages.length > 0 && (
            <div>
              <SectionHeading style={{ borderColor: themeStyleBgColor }}>
                <Globe width={18} />
                <span className="tracking-widest">Languages</span>
              </SectionHeading>
              <div className="text-xs mt-2">
                Mother tongue: <span className="font-bold uppercase">{languages[0]?.name}</span>
              </div>
              {languages.length > 1 && (
                <div className="mt-1 text-xs">
                  <div className="mt-2">Other Language(s):</div>
                  {languages.slice(1).map((l) => (
                    <div key={l.name} className="mt-1">
                      <span className="font-bold uppercase">{l.name}</span> {getLanguageProficiency(l.level)}{' '}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernClean;
