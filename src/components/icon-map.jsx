import { Briefcase, Download, FileText, GraduationCap, Languages, ListChecks, Sparkles, Upload, User } from 'lucide-react';

const iconMap = {
  briefcase: (props) => <Briefcase {...props} />,
  download: (props) => <Download {...props} />,
  file_text: (props) => <FileText {...props} />,
  graduation_cap: (props) => <GraduationCap {...props} />,
  languages: (props) => <Languages {...props} />,
  list_checks: (props) => <ListChecks {...props} />,
  sparkles: (props) => <Sparkles {...props} />,
  upload: (props) => <Upload {...props} />,
  user: (props) => <User {...props} />
};

export default iconMap;
