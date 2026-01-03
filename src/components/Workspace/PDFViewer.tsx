import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, IconButton, Typography, Stack } from '@mui/material';
import { ZoomIn, ZoomOut, CloudUpload, CloudDownload, Delete } from '@mui/icons-material';
import { useWorkspace } from '../../context/WorkspaceContext';
import { WorkspaceSize } from '../../utils/constants';
import { readFileAsArrayBuffer, isValidPDFFile } from '../../utils/fileHandlers';
import { useTranslation } from '../../hooks/useTranslation';
import ConfirmDialog from '../Common/ConfirmDialog';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

const PDFViewer: React.FC = () => {
  const { pdfFile, size, setPdfFile, setMode } = useWorkspace();
  const t = useTranslation();
  const [scale, setScale] = useState<number>(1.0);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const zoomIn = () => {
    setScale((prev) => Math.min(2.0, prev + 0.2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.2));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidPDFFile(file)) {
      alert('请上传有效的PDF文件');
      return;
    }

    if (pdfFile) {
      setConfirmDialog({
        open: true,
        title: t('replacePDF'),
        message: t('newPDFWillReplace'),
        onConfirm: () => {
          setPdfFile(file);
          setConfirmDialog({ ...confirmDialog, open: false });
        },
      });
    } else {
      setPdfFile(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = async () => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = () => {
    setConfirmDialog({
      open: true,
      title: t('deletePDF'),
      message: t('confirmDeletePDF'),
      onConfirm: () => {
        setPdfFile(null);
        setMode('text');
        setConfirmDialog({ ...confirmDialog, open: false });
      },
    });
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
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
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
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="row"
          spacing={size === WorkspaceSize.SMALL || size === WorkspaceSize.EXTRA_SMALL ? 0.5 : 1}
          alignItems="center"
        >
          <IconButton 
            onClick={zoomOut} 
            sx={{ 
              color: '#ffffff',
              padding: size === WorkspaceSize.SMALL || size === WorkspaceSize.EXTRA_SMALL ? '8px' : '12px',
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
              padding: size === WorkspaceSize.SMALL || size === WorkspaceSize.EXTRA_SMALL ? '8px' : '12px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ZoomIn />
          </IconButton>
          <IconButton
            onClick={handleUploadClick}
            sx={{
              color: '#ffffff',
              padding: size === WorkspaceSize.SMALL || size === WorkspaceSize.EXTRA_SMALL ? '8px' : '12px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloudUpload />
          </IconButton>
          <IconButton
            onClick={handleDownload}
            disabled={!pdfFile}
            sx={{
              color: '#ffffff',
              padding: size === WorkspaceSize.SMALL || size === WorkspaceSize.EXTRA_SMALL ? '8px' : '12px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:disabled': {
                opacity: 0.3,
                color: '#ffffff',
              },
            }}
          >
            <CloudDownload />
          </IconButton>
          <IconButton
            onClick={handleDelete}
            disabled={!pdfFile}
            sx={{
              color: '#ffffff',
              padding: size === WorkspaceSize.SMALL || size === WorkspaceSize.EXTRA_SMALL ? '8px' : '12px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:disabled': {
                opacity: 0.3,
                color: '#ffffff',
              },
            }}
          >
            <Delete />
          </IconButton>
        </Stack>
      </Box>
      </Box>
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={() => {
          confirmDialog.onConfirm();
        }}
        onCancel={() => {
          setConfirmDialog({ ...confirmDialog, open: false });
        }}
      />
    </>
  );
};

export default PDFViewer;
