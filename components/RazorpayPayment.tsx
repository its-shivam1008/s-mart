'use client'
import { findStoreByProduct, initiate } from '@/actions/paymentInitiation';
import { useEffect, useState } from 'react';

const useRazorpay = () => {
    // useEffect(() => {
        // Check if Razorpay script is loaded
        const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

        useEffect(() => {
            // Check if Razorpay script is already loaded
            if (typeof window !== 'undefined' && window.Razorpay) {
                setIsRazorpayLoaded(true);
            } else {
                // Dynamically load the Razorpay script if not loaded
                const script = document.createElement('script');
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => setIsRazorpayLoaded(true);
                script.onerror = () => console.error("Failed to load Razorpay script");
                document.body.appendChild(script);
            }
        }, []);
    
        const Pay = async (amount: number, productId: string, productName: string, userEmail: string) => {
            if (!isRazorpayLoaded) {
                console.error('Razorpay is not loaded yet.');
                return;
            }
            const paymentForm = {
                productId, productName, userEmail
            };
            const store = await findStoreByProduct(productId);
            if (!store.storeId) {
                // console.log(store.storeId);
                return { message: 'no store found' };
            }
            let a = await initiate(amount, store.storeId as any, paymentForm);
            if (!('id' in a)) {
                return { message: 'nothing found' };
            }
            let order_id = a.id;
            // console.log(store.storeId, store.razorpayId);
            
            const options: any = {
                key: store.razorpayId, // Enter the Key ID generated from the Dashboard
                amount: amount * 100, // Amount is in currency subunits. Convert to paise (100 paise = 1 INR)
                currency: "INR",
                name: "S-mart", // Your business name
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order_id, // This is the Order ID obtained in the response of Step 1
                callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                prefill: { // We recommend using the prefill parameter to auto-fill customer's contact information
                    name: paymentForm.userEmail, // Customer's name
                    email: "abc@example.com",
                    contact: "9000090000" // Provide the customer's phone number
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            // Initialize Razorpay checkout
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        };

        // Example of using the Pay function
        // Pay(50000, 'productId123', 'Product Name', 'user@example.com');

    // }, []);
    return {Pay};
    
};

export default useRazorpay;
