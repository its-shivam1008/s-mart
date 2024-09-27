// app/product/layout.tsx (Server Component)

export const metadata = {
    title: 's-mart | Product ',
    description:
      "Discover top-rated products at s-mart. Shop premium items with fast shipping, secure payments, and excellent customer service. Explore our product selection now!",
  };
  
  export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        {children} 
      </div>
    );
  }
  