import { Mail, MapPin, Phone } from 'lucide-react';
import sampleData from '../../data/candidate-1-data.json';

const Axis = (props) => {
  const resumeData = props.basicInfo ? props : sampleData;
  const themeStyleBgColor = props?.templateThemeColor?.bg || '#001d34';
  const themeStyleTxtColor = props?.templateThemeColor?.txt || '#ffffff';
  return (
    <div className={`aspect-[1/1.4142] bg-white font-open-sans [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-blue-600 [&_a]:underline`}>
      <div className="flex min-h-full">
        <aside className="w-[38%]" style={{ backgroundColor: themeStyleBgColor, color: themeStyleTxtColor }}>
          {resumeData?.basicInfo?.profileImage ? (
            <div className="h-97.5 overflow-hidden">
              <img src={resumeData?.basicInfo?.profileImage} alt={resumeData?.basicInfo?.firstName} className="w-full h-full object-cover" />
            </div>
          ) : null}
          <div className="px-8 py-8">
            <h3 className="font-extrabold text-[20px] tracking-wide uppercase mb-8">Details</h3>
            <div className="space-y-4 text-[18px] leading-relaxed">
              {resumeData?.basicInfo?.email ? (
                <div className="flex items-center gap-3">
                  <div>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="break-all">{resumeData?.basicInfo?.email}</div>
                </div>
              ) : null}
              {resumeData?.basicInfo?.address ? (
                <div className="flex items-center gap-3">
                  <div>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="break-all">{resumeData?.basicInfo?.address}</div>
                </div>
              ) : null}
              {resumeData?.basicInfo?.phoneNumber ? (
                <div className="flex items-center gap-3">
                  <div>
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="break-all">{resumeData?.basicInfo?.phoneNumber}</div>
                </div>
              ) : null}
            </div>
            <hr className="border-white/60 my-10" />

            {resumeData?.skills?.length ? <h3 className="font-extrabold text-[20px] tracking-wide uppercase mb-6">Skills</h3> : null}
            {resumeData?.skills?.length ? (
              <ul className="space-y-4 text-[18px]">
                {resumeData?.skills?.map((skill) => {
                  return <li key={`skill-${skill.name}`}>{skill.name}</li>;
                })}
              </ul>
            ) : null}

            {resumeData?.languages?.length ? <hr className="border-white/60 my-10" /> : null}
            {resumeData?.languages?.length ? <h3 className="font-extrabold text-[20px] tracking-wide uppercase mb-5">Languages</h3> : null}
            {resumeData?.languages?.length ? (
              <div className="space-y-3">
                {resumeData?.languages?.map((language) => {
                  return <div className="font-bold text-[18px] uppercase">{language.name}</div>;
                })}
              </div>
            ) : null}
          </div>
        </aside>
        <main className="w-[62%] p-8 text-[#0f172a]">
          <h1 className="text-[60px] font-extrabold uppercase tracking-tight leading-none text-[#236295] break-all">
            {resumeData?.basicInfo?.firstName} {resumeData?.basicInfo?.lastName}
          </h1>
          <div className="text-[25px] mt-3 mb-10">{resumeData?.basicInfo?.currentJobTitle}</div>
          {resumeData?.summary ? (
            <section className="mb-12">
              <h2 className="font-extrabold uppercase text-[18px] mb-5">Summary</h2>
              <p className="text-[18px] leading-[1.35] max-w-180" dangerouslySetInnerHTML={{ __html: resumeData?.summary }} />
            </section>
          ) : null}
          {resumeData?.experienceList?.length ? (
            <section className="mb-12">
              <h2 className="font-extrabold uppercase text-[18px] mb-5">Experience</h2>
              {resumeData?.experienceList?.map((experience) => {
                return (
                  <div className="mb-8">
                    <h3 className="font-extrabold text-[19px]">
                      {experience.title}, {experience.employer}, {experience.location}
                    </h3>
                    <p className="text-[18px] mt-1 mb-4">
                      {experience.start} — {experience.end || 'Present'}
                    </p>
                    <div className="list-disc pl-5 space-y-3 text-[18px] leading-tight" dangerouslySetInnerHTML={{ __html: experience.description }} />
                  </div>
                );
              })}
            </section>
          ) : null}

          {resumeData?.educationList?.length ? (
            <section className="mb-12">
              <h2 className="font-extrabold uppercase text-[18px] mb-5">Education</h2>
              {resumeData?.educationList?.map((education) => {
                return (
                  <div className="mb-8">
                    <h3 className="font-extrabold text-[19px]">
                      {education.degree}, {education.location}
                    </h3>
                    <p className="text-[18px] mt-1 mb-4">
                      {education.start} — {education.end || 'Present'}
                    </p>
                    <div className="list-disc pl-5 space-y-3 text-[18px] leading-tight" dangerouslySetInnerHTML={{ __html: education.description }} />
                  </div>
                );
              })}
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default Axis;
