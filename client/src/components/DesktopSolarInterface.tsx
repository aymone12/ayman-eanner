import React from 'react';
import { DesktopSolarFlow } from './desktop/DesktopSolarFlow';

interface DesktopSolarInterfaceProps {
  onNext: () => void;
  onBack: () => void;
}

export function DesktopSolarInterface({ onNext, onBack }: DesktopSolarInterfaceProps) {
  return <DesktopSolarFlow onBack={onBack} />;
}