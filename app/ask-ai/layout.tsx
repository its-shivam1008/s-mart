// app/ai/layout.tsx

export const metadata = {
    title: 's-mart | AI-Powered Recommendations',
    description:
      "Leverage s-mart's AI-powered recommendations for a personalized shopping experience. Discover products tailored to your preferences and make smarter buying decisions.",
  };
  
  export default function AILayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        {children}
      </div>
    );
  }
  