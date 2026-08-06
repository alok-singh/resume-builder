import { Download } from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '../../components/button';
import { downloadBase64PDF } from '../../utils/helper.util';
import { postResource } from '../../utils/http.util';

const DownloadPdfButton = (props) => {
  const { targetRef, fileName = 'document.pdf' } = props;
  const [isGenerating, setIsGenerating] = useState(false);

  const onPrint = async () => {
    const html = encodeURIComponent(document.getElementById('a4-preview').innerHTML);
    const response = await postResource('http://localhost:3000/api/generate-pdf', { html });
    downloadBase64PDF(response.data);
  };

  return (
    <PrimaryButton disabled={isGenerating} onClick={onPrint} className="download-button inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5">
      <Download className="h-4 w-4" />
      {isGenerating ? 'Generating PDF...' : 'Download PDF'}
    </PrimaryButton>
  );
};

export default DownloadPdfButton;
