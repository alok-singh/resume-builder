import { useSelector } from 'react-redux';
import Aether from '../../templates/aether';
import Astral from '../../templates/astral';
import Astralis from '../../templates/astralis';
import Aurora from '../../templates/aurora';
import Axis from '../../templates/axis';
import Celestial from '../../templates/celestial';
import Comet from '../../templates/comet';
import Cosmos from '../../templates/cosmos';
import Eclipse from '../../templates/eclipse';
import Eon from '../../templates/eon';
import Executive from '../../templates/executive';
import Exoplanet from '../../templates/exoplanet';
import Galaxy from '../../templates/galaxy';
import Hyperion from '../../templates/hyperion';
import Lunar from '../../templates/lunar';
import Nebula from '../../templates/nebula';
import Nebular from '../../templates/nebular';
import Nova from '../../templates/nova';
import Orbit from '../../templates/orbit';
import Pulsar from '../../templates/pulsar';
import Quasar from '../../templates/quasar';
import Solstice from '../../templates/solstice';
import Starburst from '../../templates/starburst';
import Stellar from '../../templates/stellar';
import Zenith from '../../templates/zenith';
import Keystone from '../../templates/keystone';
import Helix from '../../templates/helix';
import Horizon from '../../templates/horizon';
import Quantum from '../../templates/quantum';
import ClassicEuroPass from '../../templates/classic-europass';
import ModernClean from '../../templates/modern-clean';
import ProfessionalSidebar from '../../templates/professional-sidebar';
import TwoColumnBalanced from '../../templates/two-column-balanced';
import ConvertToA4 from '../../components/convert-to-a4';
import { buildingTemplates } from '../../features/build-resume-slice';

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
  keystone: (props) => <Keystone {...props} />,
  helix: (props) => <Helix {...props} />,
  horizon: (props) => <Horizon {...props} />,
  quantum: (props) => <Quantum {...props} />,
  classic_euro_pass: (props) => <ClassicEuroPass {...props} />,
  modern_clean: (props) => <ModernClean {...props} />,
  professional_sidebar: (props) => <ProfessionalSidebar {...props} />,

  // to do
  two_column_balanced: (props) => <TwoColumnBalanced {...props} />,

  executive: (props) => <Executive {...props} />
};

export const templateConfigMap = {
  // done
  celestial: { padding: 64, zoom: 1.4 },
  galaxy: { padding: 64, zoom: 1.4 },
  eclipse: { padding: 64, zoom: 1.4 },
  comet: { padding: 64, zoom: 1.4 },
  solstice: { padding: 64, zoom: 1.4 },
  pulsar: { padding: 64, zoom: 1.4 },
  quasar: { padding: 64, zoom: 1.4 },
  nebular: { padding: 64, zoom: 1.4 },
  nova: { padding: 64, zoom: 1.4 },
  aurora: { padding: 64, zoom: 1.4 },
  hyperion: { padding: 64, zoom: 1.4 },
  aether: { padding: 64, zoom: 1.4 },
  cosmos: { padding: 64, zoom: 1.4 },
  starburst: { padding: 64, zoom: 1.4 },
  exoplanet: { padding: 64, zoom: 1.4 },
  axis: { padding: 64, zoom: 1.4 },
  keystone: { padding: 64, zoom: 1.4 },
  helix: { padding: 64, zoom: 1.4 },
  horizon: { padding: 84, zoom: 1.4 },
  classic_euro_pass: { padding: 64, zoom: 1.4 },
  quantum: { padding: 64, zoom: 1.4 },
  modern_clean: { padding: 64, zoom: 1.4 },
  professional_sidebar: { padding: 64, zoom: 1.4 },
  two_column_balanced: { padding: 48, zoom: 1.4 },
  orbit: { padding: 64, zoom: 1.4 },
  zenith: { padding: 64, zoom: 1.4 },
  eon: { padding: 64, zoom: 1.4 },
  nebula: { padding: 64, zoom: 1.4 },

  // stub
  astralis: { padding: 64, zoom: 1.4 },
  astral: { padding: 0, zoom: 1.4 },
  lunar: { padding: 64, zoom: 1.4 },
  stellar: { padding: 64, zoom: 1.4 },
  executive: { padding: 64, zoom: 1.4 }
};

const ResumePreview = (props) => {
  const buildPage = useSelector((state) => state.buildPage);
  const { selectedTemplateId, activeThemeMap, step } = buildPage;
  const SelectedTemplate = templateMap[selectedTemplateId] || Galaxy;
  const templateConfig = templateConfigMap[selectedTemplateId] || templateConfigMap.galaxy;
  const activeTemplate = buildingTemplates.find((item) => item.id === selectedTemplateId) || buildingTemplates[0];

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="glass rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium">Live preview</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-700">Auto-saved</span>
        </div>
        <div className="aspect-[1/1.414] bg-white overflow-scroll scrollbar-none">
          {step !== 8 ? (
            <SelectedTemplate {...buildPage} style={{ zoom: 0.7 }} fullView={true} templateThemeColor={activeThemeMap[selectedTemplateId]} />
          ) : (
            <ConvertToA4 pagePadding={templateConfig.padding} style={{ zoom: 0.54 }}>
              <SelectedTemplate {...buildPage} style={{ zoom: templateConfig.zoom }} templateThemeColor={activeThemeMap[selectedTemplateId]} />
            </ConvertToA4>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ResumePreview;
