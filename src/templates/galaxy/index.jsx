import sampleData from '../../data/candidate-1-data.json';

const generateChunks = (list) => {
  return list?.reduce?.(
    (acc, skill, index) => {
      acc[acc.length - 1].push(skill);
      if ((index + 1) % 3 === 0) {
        acc.push([]);
      }
      return acc;
    },
    [[]]
  );
};

const Galaxy = (props) => {
  const resumeData = props.basicInfo ? props : sampleData;
  const { basicInfo } = resumeData;
  const skillChunks = generateChunks(resumeData.skills);
  const addressLine = `${[basicInfo?.address, basicInfo?.city, basicInfo?.country].join(', ')} ${basicInfo?.postCode || ''}`;

  const themeStyleBgColor = props?.templateThemeColor?.bg || '#e5e7eb';
  const themeStyleTxtColor = props?.templateThemeColor?.txt || '#1e2939';
  return (
    <div style={{ color: themeStyleTxtColor }} className={`p-8 shadow font-eb-garamond bg-white aspect-[1/1.414]`}>
      <div className="[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-blue-600 [&_a]:underline">
        {/* <!-- Header --> */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-wide uppercase">
            {basicInfo?.firstName} {basicInfo?.lastName}
          </h1>
          <p className="mt-1">{basicInfo?.currentJobTitle}</p>
          <p className="text-sm mt-1">{basicInfo?.address ? addressLine : null}</p>
          <div className="flex justify-center gap-6 mt-2 text-sm">
            <span>{basicInfo?.email}</span>
            <span>{basicInfo?.phoneNumber}</span>
          </div>
        </div>

        {basicInfo?.firstName ? <hr className="my-6 border-gray-400" /> : null}

        {/* <!-- Summary --> */}
        <div>
          {resumeData?.summary ? (
            <h2 style={{ backgroundColor: themeStyleBgColor }} className="text-center font-bold py-1 tracking-wide">
              SUMMARY
            </h2>
          ) : null}
          <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: resumeData?.summary }}></p>
        </div>

        {/* <!-- Experience --> */}
        <div className="mt-6">
          {resumeData?.experienceList?.length ? (
            <h2 style={{ backgroundColor: themeStyleBgColor }} className="text-center font-bold py-1 tracking-wide">
              EXPERIENCE
            </h2>
          ) : null}
          {resumeData?.experienceList?.length
            ? resumeData?.experienceList.map((experience, index) => {
                return (
                  <div key={`experience-${index}`} className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">
                        {experience.title}, {experience.employer}
                      </span>
                      <span>
                        {experience.start} — {experience.isCurrentJob ? 'Present' : experience.end}
                      </span>
                    </div>
                    <p className="text-right text-xs text-gray-500">{experience.location}</p>
                    {experience.description ? <div dangerouslySetInnerHTML={{ __html: experience.description }}></div> : null}
                  </div>
                );
              })
            : null}
        </div>

        {/* <!-- Education --> */}
        {resumeData?.educationList?.length ? (
          <div className="mt-6">
            <h2 style={{ backgroundColor: themeStyleBgColor }} className="text-center font-bold py-1 tracking-wide">
              EDUCATION
            </h2>
            {resumeData?.educationList.map((item, index) => {
              return (
                <div key={`education-${index}`} className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">
                      {item.schoolName}, {item.location}, {item.degree}
                    </span>
                    <span>
                      {item.start} — {item.isPursuing ? 'Present' : item.end}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="italic text-gray-600">{resumeData?.degree}</span>
                    <span className="text-gray-500 text-xs">{resumeData?.location}</span>
                  </div>
                  {item.description ? <div dangerouslySetInnerHTML={{ __html: item.description }}></div> : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* <!-- Skills --> */}
        {resumeData?.skills?.length ? (
          <div className="mt-6">
            <h2 style={{ backgroundColor: themeStyleBgColor }} className="text-center font-bold py-1 tracking-wide">
              SKILLS
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm ">
              {skillChunks.map((chunk, index) => {
                return (
                  <ul key={`skill-chunk-${index}`} className="space-y-1">
                    {chunk.map((skill, innerIndex) => {
                      return <li key={`skill-${innerIndex}`}>{skill.name}</li>;
                    })}
                  </ul>
                );
              })}
            </div>
          </div>
        ) : null}

        {resumeData?.additionalSections?.length
          ? resumeData?.additionalSections.map((section, index) => {
              return (
                <div key={`additional-${index}`} className="mt-6">
                  {section.title ? (
                    <h2 style={{ backgroundColor: themeStyleBgColor }} className="text-center font-bold py-1 tracking-wide uppercase">
                      {section.title}
                    </h2>
                  ) : null}
                  {section.description ? <div className="mt-4" dangerouslySetInnerHTML={{ __html: section.description }} /> : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Galaxy;
