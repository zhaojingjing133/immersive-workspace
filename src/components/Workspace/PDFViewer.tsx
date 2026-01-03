import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Typography } from '@mui/material';
import { useWorkspace } from '../../context/WorkspaceContext';
import { WorkspaceSize } from '../../utils/constants';
import { readFileAsArrayBuffer } from '../../utils/fileHandlers';
import { useTranslation } from '../../hooks/useTranslation';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

const PDFViewer: React.FC = () => {
  const { pdfFile, size, pdfScale } = useWorkspace();
  const t = useTranslation();
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);

  // Load PDF data when pdfFile changes
  useEffect(() => {
    const loadPDF = async () => {
      if (pdfFile) {
        const data = await readFileAsArrayBuffer(pdfFile);
        setPdfData(data);
      } else {
        setPdfData(null);
      }
    };
    loadPDF();
  }, [pdfFile]);

  const onDocumentLoadSuccess = () => {
    // PDF loaded successfully
  };


  if (!pdfData) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <Typography variant="h6" sx={{ color: '#ffffff' }}>
          {t('uploadPDFFile')}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '8px', color: '#a1a1aa' }}>
          {t('useUploadButton')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
      {/* PDF Document */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: size === WorkspaceSize.SMALL || size === WorkspaceSize.EXTRA_SMALL ? 'flex-start' : 'center',
          alignItems: 'flex-start',
          overflow: 'auto',
          padding: '24px',
          paddingBottom: '24px',
        }}
      >
        <Document
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <Typography sx={{ color: '#ffffff' }}>{t('loading')}</Typography>
          }
          error={
            <Typography sx={{ color: '#ff0000' }}>{t('loadPDFFailed')}</Typography>
          }
        >
          <Page
            pageNumber={1}
            scale={pdfScale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </Box>
    </Box>
  );
};

export default PDFViewer;
