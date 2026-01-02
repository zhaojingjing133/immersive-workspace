import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, IconButton, Typography, Stack } from '@mui/material';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from '@mui/icons-material';
import { useWorkspace } from '../../context/WorkspaceContext';
import { readFileAsArrayBuffer } from '../../utils/fileHandlers';
import { useTranslation } from '../../hooks/useTranslation';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

const PDFViewer: React.FC = () => {
  const { pdfFile } = useWorkspace();
  const t = useTranslation();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);

  // Load PDF data when pdfFile changes
  useEffect(() => {
    const loadPDF = async () => {
      if (pdfFile) {
        const data = await readFileAsArrayBuffer(pdfFile);
        setPdfData(data);
        setPageNumber(1);
      } else {
        setPdfData(null);
      }
    };
    loadPDF();
  }, [pdfFile]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(2.0, prev + 0.2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.2));
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
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'auto',
          padding: '24px',
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
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </Box>

      {/* PDF Controls - Fixed at bottom */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          padding: '16px 24px',
          backgroundColor: 'rgba(34, 34, 34, 0.9)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1001,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <IconButton 
            onClick={goToPrevPage} 
            disabled={pageNumber <= 1} 
            sx={{ 
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:disabled': {
                opacity: 0.5,
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography sx={{ color: '#ffffff', minWidth: '60px', textAlign: 'center', fontSize: '14px' }}>
            {pageNumber} / {numPages}
          </Typography>
          <IconButton 
            onClick={goToNextPage} 
            disabled={pageNumber >= numPages} 
            sx={{ 
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:disabled': {
                opacity: 0.5,
              },
            }}
          >
            <ChevronRight />
          </IconButton>
          <IconButton 
            onClick={zoomOut} 
            sx={{ 
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ZoomOut />
          </IconButton>
          <IconButton 
            onClick={zoomIn} 
            sx={{ 
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ZoomIn />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default PDFViewer;
