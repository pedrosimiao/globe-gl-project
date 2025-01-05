import { onCLS, onFCP, onLCP, onFID, onTTFB } from 'web-vitals';

const reportWebVitals = (metric: any) => {
  switch (metric.name) {
    case 'CLS':
      onCLS(metric);
      break;
    case 'FCP':
      onFCP(metric);
      break;
    case 'LCP':
      onLCP(metric);
      break;
    case 'FID':
      onFID(metric);
      break;
    case 'TTFB':
      onTTFB(metric);
      break;
    default:
      break;
  }
};

export default reportWebVitals;

