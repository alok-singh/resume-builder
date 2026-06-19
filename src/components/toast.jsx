import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { Toaster as Sonner } from 'sonner';

const Toaster = (props) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5" color="#00c951" />,
        info: <InfoIcon className="size-5" color="#3131dd" />,
        warning: <TriangleAlertIcon className="size-5" color='#dac820' />,
        error: <OctagonXIcon className="size-5" color="#fb2c36" />,
        loading: <Loader2Icon className="size-5 animate-spin" />
      }}
      style={{
        '--normal-bg': '#fff',
        '--normal-text': '#333',
        '--normal-border': '#ededed',
        '--border-radius': '8px',
      }}
      {...props}
    />
  );
};

export { Toaster };