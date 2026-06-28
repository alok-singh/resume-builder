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

const MinimalResume = (props) => {
  const { basicInfo } = props;
  const skillChunks = generateChunks(props.skills);
  const addressLine = `${[basicInfo?.address, basicInfo?.city, basicInfo?.country].join(', ')} ${basicInfo?.postCode || ''}`;

  // console.log(props.experienceList[0].description);
  return (
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
        {props.summary ? <h2 className="bg-gray-200 text-center font-bold py-1 tracking-wide">SUMMARY</h2> : null}
        <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: props.summary }}></p>
      </div>

      {/* <!-- Experience --> */}
      <div className="mt-6">
        {props?.experienceList?.length ? <h2 className="bg-gray-200 text-center font-bold py-1 tracking-wide">EXPERIENCE</h2> : null}
        {props?.experienceList?.length
          ? props.experienceList.map((experience, index) => {
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
      <div className="mt-6">
        {props?.educationList?.length ? <h2 className="bg-gray-200 text-center font-bold py-1 tracking-wide">EDUCATION</h2> : null}
        {props?.educationList?.length
          ? props.educationList.map((item, index) => {
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
                    <span className="italic text-gray-600">{props.degree}</span>
                    <span className="text-gray-500 text-xs">{props.location}</span>
                  </div>
                  {item.description ? <div dangerouslySetInnerHTML={{ __html: item.description }}></div> : null}
                </div>
              );
            })
          : null}
      </div>

      {/* <!-- Skills --> */}
      <div className="mt-6">
        {props?.skills?.length ? <h2 className="bg-gray-200 text-center font-bold py-1 tracking-wide">SKILLS</h2> : null}
        <div className="grid grid-cols-2 gap-4 mt-3 text-sm ">
          {props?.skills?.length
            ? skillChunks.map((chunk, index) => {
                return (
                  <ul key={`skill-chunk-${index}`} className="space-y-1">
                    {chunk.map((skill, innerIndex) => {
                      return <li key={`skill-${innerIndex}`}>{skill.name}</li>;
                    })}
                  </ul>
                );
              })
            : null}
        </div>
      </div>

      {props?.additionalSections?.length
        ? props.additionalSections.map((section, index) => {
            return (
              <div key={`additional-${index}`} className="mt-6">
                {section.title ? <h2 className="bg-gray-200 text-center font-bold py-1 tracking-wide">{section.title}</h2> : null}
                {section.description ? <div className="mt-4" dangerouslySetInnerHTML={{ __html: section.description }} /> : null}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default MinimalResume;
