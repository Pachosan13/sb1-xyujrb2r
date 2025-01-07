import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { ReceiptService } from '../services/receipt.service';
import { StorageService } from '../services/storage.service';
import { Alert } from './Alert';
import cv from 'opencv-ts';

interface ScanModalProps {
  onClose: () => void;
  onScanComplete: (data: any, imageUrl: string) => void;
}

export default function ScanModal({ onClose, onScanComplete }: ScanModalProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  
  const receiptService = ReceiptService.getInstance('openai');
  const storageService = StorageService.getInstance();

  const processImage = async (imageData: string) => {
    try {
      setIsProcessing(true);
      setError(null);

      const imageUrl = await storageService.uploadBase64Image(imageData, `receipt-${Date.now()}.jpg`);
      const analysis = await receiptService.processReceipt(imageData);

      onScanComplete(analysis, imageUrl);
    } catch (error) {
      console.error('Error processing receipt:', error);
      setError(error instanceof Error ? error.message : 'Error al procesar el documento');
    } finally {
      setIsProcessing(false);
    }
  };

  const capture = useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot(
      {
        height: 1920,
        width: 1080,
      }
    );
    if (!imageSrc) {
      setError('No se pudo capturar la imagen');
      return;
    }

    if (isImageBlurry(imageSrc)) {
      setError('La imagen es demasiado borrosa');
      return;
    }

    console.log('imageSrc', imageSrc);
    await processImage(imageSrc);
  }, []);

  // Assuming OpenCV.js is loaded and available as cv
  function isImageBlurry(imageSrc: any) {
    const img = cv.imread(imageSrc); // Read the image
    const gray = new cv.Mat();
    cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY, 0); // Convert to grayscale

    const laplacian = new cv.Mat();
    cv.Laplacian(gray, laplacian, cv.CV_64F, 1, 1, 0, cv.BORDER_DEFAULT);

    const mean = new cv.Mat();
    const stddev = new cv.Mat();
    cv.meanStdDev(laplacian, mean, stddev); // Calculate mean and standard deviation

    const variance = stddev.data64F[0] * stddev.data64F[0];
    img.delete(); gray.delete(); laplacian.delete(); mean.delete(); stddev.delete();

    return variance < 100; // Threshold for blurriness, adjust as needed
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);

      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      await processImage(base64Data);
    } catch (error) {
      console.error('Error processing file:', error);
      setError(error instanceof Error ? error.message : 'Error al procesar el archivo');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Escanear Documento</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isProcessing}
            >
              ✕
            </button>
          </div>

          {error && <Alert type="error" message={error} />}

          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 ${
                activeTab === 'camera'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('camera')}
              disabled={isProcessing}
            >
              📷 Cámara
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === 'upload'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('upload')}
              disabled={isProcessing}
            >
              📁 Subir Archivo
            </button>
          </div>

          {!isProcessing && (
            <div>
              {activeTab === 'camera' ? (
                <div className="relative">
                  <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-fit rounded-lg"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "environment",
                  aspectRatio: 16/9,
                  frameRate: 30
                }}
                screenshotQuality={1.0}
              />
              <div className="mt-4 flex justify-center">
                <button
                  onClick={capture}
                  disabled={isProcessing}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Procesando...' : 'Capturar'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
                disabled={isProcessing}
              />
              <div className="mb-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Procesando...' : 'Seleccionar Archivo'}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Formatos soportados: JPG, PNG (máx. 5MB)
              </p>
            </div>
          )}
          </div>
          )}

          {isProcessing && (
            <div className="mt-4">
              <div className="animate-pulse flex space-x-4 items-center justify-center">
                <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Procesando documento...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}