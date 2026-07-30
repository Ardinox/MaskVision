
import {
  Upload,
  ScanSearch,
  Crosshair,
  ShieldCheck,
  Download
} from 'lucide-react'

export const workflow = [
  {
    title: "Upload",
    description: "Image or Video",
    icon: Upload,
  },
  {
    title: "Detect",
    description: "OCR + QR Detection",
    icon: ScanSearch,
  },
  {
    title: "Track",
    description: "OpenCV Tracking",
    icon: Crosshair,
  },
  {
    title: "Mask",
    description: "Dynamic Blur",
    icon: ShieldCheck,
  },
  {
    title: "Download",
    description: "Processed Media",
    icon: Download,
  },
];