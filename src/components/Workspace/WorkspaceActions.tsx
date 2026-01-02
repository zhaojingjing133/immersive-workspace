import React, { useState, useRef } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { CloudUpload, CloudDownload, Delete } from '@mui/icons-material';
import { useWorkspace } from '../../context/WorkspaceContext';
import { isValidPDFFile, exportTextToPDF } from '../../utils/fileHandlers';
import ConfirmDialog from '../Common/ConfirmDialog';
import { useTranslation } from '../../hooks/useTranslation';

const WorkspaceActions: React.FC = () => {
  const { mode, pdfFile, setPdfFile, setMode, content, setContent, title } = useWorkspace();
  const t = useTranslation();
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
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Check if user has interacted (typed text or uploaded PDF)
  React.useEffect(() => {
    if (content || pdfFile) {
      setHasInteracted(true);
    }
  }, [content, pdfFile]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidPDFFile(file)) {
      alert('请上传有效的PDF文件');
      return;
    }

    // If there's already a PDF, show confirmation dialog
    if (pdfFile) {
      setConfirmDialog({
        open: true,
        title: t('replacePDF'),
        message: t('newPDFWillReplace'),
        onConfirm: () => {
          setPdfFile(file);
          setMode('pdf');
          setConfirmDialog({ ...confirmDialog, open: false });
        },
      });
    } else {
      setPdfFile(file);
      setMode('pdf');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = async () => {
    if (mode === 'text' && content) {
      const filename = `${title || 'workspace-content'}-${new Date().toISOString().split('T')[0]}.pdf`;
      const currentDate = new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      await exportTextToPDF(content, filename, title, currentDate);
    } else if (mode === 'pdf' && pdfFile) {
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
    if (mode === 'text') {
      setConfirmDialog({
        open: true,
        title: t('deleteContent'),
        message: t('confirmDeleteContent'),
        onConfirm: () => {
          setContent('');
          localStorage.removeItem('workspace-content');
          setConfirmDialog({ ...confirmDialog, open: false });
        },
      });
    } else if (mode === 'pdf') {
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
    }
  };

  const isDownloadDisabled = !hasInteracted || (mode === 'text' && !content) || (mode === 'pdf' && !pdfFile);
  const isDeleteDisabled = (mode === 'text' && !content) || (mode === 'pdf' && !pdfFile);

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
          position: 'absolute',
          right: '40px',
          bottom: '24px',
          zIndex: 1002,
        }}
      >
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={handleUploadClick}
            sx={{
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <CloudUpload />
          </IconButton>
          <IconButton
            onClick={handleDownload}
            disabled={isDownloadDisabled}
            sx={{
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
            disabled={isDeleteDisabled}
            sx={{
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
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

export default WorkspaceActions;

