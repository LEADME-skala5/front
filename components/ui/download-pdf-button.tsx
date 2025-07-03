import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const DownloadPDFButton = () => {
  const handleDownload = async () => {
    // 페이지 전체를 캡처 (document.body 또는 document.getElementById('__next') 사용 가능)
    const element = document.body; // 또는 document.getElementById('__next')
    if (!element) return;

    // 페이지 전체를 고해상도로 캡처
    const canvas = await html2canvas(element, { scale: 4 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // 첫 페이지 추가
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // 남은 부분이 있다면, 추가 페이지 생성
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('download.pdf');
  };

  return (
    <Button variant="outline" onClick={handleDownload}>
      <Download className="mr-2 h-4 w-4" />
      다운로드
    </Button>
  );
};

export default DownloadPDFButton;
