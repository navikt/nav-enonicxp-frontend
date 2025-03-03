import { useLayoutEffect } from 'react';

// Hack to prevent irrelevant React warning for useLayoutEffect server-side
export const useLayoutEffectClientSide = typeof window !== 'undefined' ? useLayoutEffect : () => {};
