import { useSelector } from 'react-redux';
import { buildingTemplates } from '../../features/build-resume-slice';
import Celestial from '../../templates/celestial';
import Executive from '../../templates/executive';
import Galaxy from '../../templates/galaxy';
import Astral from '../../templates/astral';
import Astralis from '../../templates/astralis';
import Eclipse from '../../templates/eclipse';
import Orbit from '../../templates/orbit';
import Comet from '../../templates/comet';
import Solstice from '../../templates/solstice';
import Pulsar from '../../templates/pulsar';
import Quasar from '../../templates/quasar';
import Nebular from '../../templates/nebular';
import Nova from '../../templates/nova';
import Aurora from '../../templates/aurora';
import Hyperion from '../../templates/hyperion';
import Lunar from '../../templates/lunar';
import Stellar from '../../templates/stellar';
import Zenith from '../../templates/zenith';
import Aether from '../../templates/aether';
import Nebula from '../../templates/nebula';
import Eon from '../../templates/eon';
import Cosmos from '../../templates/cosmos';
import Starburst from '../../templates/starburst';
import Exoplanet from '../../templates/exoplanet';
import Axis from '../../templates/axis';

export const templateMap = {
  celestial: (props) => <Celestial {...props} />,
  galaxy: (props) => <Galaxy {...props} />,
  astral: (props) => <Astral {...props} />,
  eclipse: (props) => <Eclipse {...props} />,
  astralis: (props) => <Astralis {...props} />,
  orbit: (props) => <Orbit {...props} />,
  comet: (props) => <Comet {...props} />,
  solstice: (props) => <Solstice {...props} />,
  pulsar: (props) => <Pulsar {...props} />,
  quasar: (props) => <Quasar {...props} />,
  nebular: (props) => <Nebular {...props} />,
  nova: (props) => <Nova {...props} />,
  aurora: (props) => <Aurora {...props} />,
  hyperion: (props) => <Hyperion {...props} />,
  lunar: (props) => <Lunar {...props} />,
  stellar: (props) => <Stellar {...props} />,
  zenith: (props) => <Zenith {...props} />,
  aether: (props) => <Aether {...props} />,
  nebula: (props) => <Nebula {...props} />,
  eon: (props) => <Eon {...props} />,
  cosmos: (props) => <Cosmos {...props} />,
  starburst: (props) => <Starburst {...props} />,
  exoplanet: (props) => <Exoplanet {...props} />,
  axis: (props) => <Axis {...props} />,

  // to do
  keystone: (props) => <Galaxy {...props} />,
  helix: (props) => <Galaxy {...props} />,
  horizon: (props) => <Galaxy {...props} />,
  quantum: (props) => <Galaxy {...props} />,
  classic_europass: (props) => <Galaxy {...props} />,
  modern_clean: (props) => <Galaxy {...props} />,
  professional_sidebar: (props) => <Galaxy {...props} />,
  two_column_balanced: (props) => <Galaxy {...props} />,
  executive: (props) => <Executive {...props} />
};

const ResumePreview = () => {
  const buildPage = useSelector((state) => state.buildPage);
  const { selectedTemplateId, activeThemeMap } = buildPage;
  const SelectedTemplate = templateMap[selectedTemplateId] || Galaxy;
  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="glass rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium">Live preview</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-700">Auto-saved</span>
        </div>
        <div className="aspect-[1/1.414] bg-white overflow-scroll zoom-[0.7] scrollbar-none">
          <SelectedTemplate {...buildPage} templateThemeColor={activeThemeMap[selectedTemplateId]} />
        </div>
      </div>
    </aside>
  );
};

export default ResumePreview;
