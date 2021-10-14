import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export function useDeviceStatus() {
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setMobile(isMobile);
  }, []);

  return { isMobile: mobile };
}
