export { isValidPDFFile, isValidImageFile, isValidVideoFile, isValidAudioFile } from './fileValidation';

export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        resolve(e.target.result);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer'));
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        resolve(e.target.result);
      } else {
        reject(new Error('Failed to read file as DataURL'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const exportTextToPDF = async (
  content: string,
  filename: string = 'workspace-content.pdf',
  title: string = '标题',
  date: string = ''
): Promise<void> => {
  try {
    const [jsPDFModule, html2canvasModule] = await Promise.all([
      import('jspdf'),
      import('html2canvas'),
    ]);

    const jsPDF = jsPDFModule.default;
    const html2canvas = html2canvasModule.default;

    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '210mm'; // A4 width
    tempDiv.style.padding = '20mm';
    tempDiv.style.fontFamily = '"PingFang SC", "Microsoft YaHei", "SimSun", sans-serif';
    tempDiv.style.color = '#000000';
    tempDiv.style.backgroundColor = '#ffffff';

    // Create title element
    const titleDiv = document.createElement('div');
    titleDiv.style.fontSize = '24px';
    titleDiv.style.fontWeight = 'bold';
    titleDiv.style.marginBottom = '12px';
    titleDiv.style.color = '#000000';
    titleDiv.textContent = title || '标题';
    tempDiv.appendChild(titleDiv);

    // Create date element
    if (date) {
      const dateDiv = document.createElement('div');
      dateDiv.style.fontSize = '12px';
      dateDiv.style.color = '#666666';
      dateDiv.style.marginBottom = '16px';
      dateDiv.textContent = date;
      tempDiv.appendChild(dateDiv);
    }

    // Create divider
    const divider = document.createElement('div');
    divider.style.borderBottom = '1px solid #cccccc';
    divider.style.marginBottom = '16px';
    tempDiv.appendChild(divider);

    // Create content element
    const contentDiv = document.createElement('div');
    contentDiv.style.fontSize = '14px';
    contentDiv.style.lineHeight = '1.6';
    contentDiv.style.whiteSpace = 'pre-wrap';
    contentDiv.style.wordWrap = 'break-word';
    contentDiv.style.color = '#000000';
    contentDiv.textContent = content || ' ';
    tempDiv.appendChild(contentDiv);

    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: tempDiv.offsetWidth,
      height: tempDiv.scrollHeight,
    });
    document.body.removeChild(tempDiv);

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    doc.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
  }
};

