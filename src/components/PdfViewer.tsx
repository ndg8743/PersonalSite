import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 90vw;
  height: 90vh;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  background: #f5f5f5;
  border-radius: 8px 8px 0 0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;

const IframeContainer = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: 0 0 8px 8px;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

interface PdfViewerProps {
  onClose: () => void;
  pdfUrl: string;
}

export const PdfViewer = ({ onClose, pdfUrl }: PdfViewerProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick} ref={overlayRef}>
      <ModalContainer>
        <Header>
          <Title>Resume</Title>
          <CloseButton aria-label="Close PDF viewer" onClick={onClose}>
            ×
          </CloseButton>
        </Header>
        <IframeContainer>
          <StyledIframe
            loading="eager"
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Resume PDF"
          />
        </IframeContainer>
      </ModalContainer>
    </Overlay>
  );
};
