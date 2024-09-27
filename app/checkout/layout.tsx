// app/checkout/layout.tsx

export const metadata = {
    title: 's-mart | Checkout',
    description:
      "Complete your purchase at s-mart. Enjoy a smooth, secure checkout process with multiple payment options and fast shipping. Shop confidently at s-mart!",
  };
  
  export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        {children}
      </div>
    );
  }
  