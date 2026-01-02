import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(34, 34, 34, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '8px',
        },
      }}
    >
      <DialogTitle sx={{ color: '#ffffff', padding: '20px 24px 8px' }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ padding: '8px 24px' }}>
        <Typography sx={{ color: '#a1a1aa', fontSize: '14px' }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          onClick={onCancel}
          sx={{
            color: '#a1a1aa',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;


