'use client';
import LogoImage from '@/assets/skore_logo.svg';

export default function LogoOnly() {
  return (
    <div className="flex justify-center items-center w-full h-full ml-2">
      <LogoImage width={300} height={180} />
    </div>
  );
}
