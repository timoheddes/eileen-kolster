export const isDeviceTouchFriendly = (): boolean => {
  let isMobile =
    (navigator?.maxTouchPoints > 0 ||
      navigator?.maxTouchPoints > 0) ??
    false;
  if (!isMobile) {
    const mQ =
      (window.matchMedia !== undefined &&
        matchMedia('(pointer:coarse)')) ||
      null;
    if (mQ?.media === '(pointer:coarse)') {
      isMobile = !!mQ.matches;
    } else {
      // Finally, fall back to user agent sniffing
      const UA = navigator?.userAgent;
      isMobile =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }

  return isMobile;
};
