export function useLockScroll(){
  const lockScroll = (sw: boolean) => document.body.style.overflow = sw ? 'hidden' : 'auto';
  return { lockScroll };
}