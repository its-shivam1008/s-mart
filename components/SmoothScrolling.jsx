"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { usePathname } from 'next/navigation'

function SmoothScrolling({ children }) {
  const pathname = usePathname();
  const pathsWithoutLenis = ['/ask-ai','/store/allProducts'];
  const disableLenis = pathsWithoutLenis.includes(pathname);
  if (disableLenis) {
    // console.log('ye return hua hai')
    return <>{children}</>;
  }else{
    // console.log('lenis lag gya hai ', pathname)
    return (
      <ReactLenis root options={{ lerp: 0.03, duration: 1.7, smoothTouch: true }}>
        {children}
      </ReactLenis>
  );
  }
}

export default SmoothScrolling;