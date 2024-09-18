import dbConnect from "@/Db/Db";
import OrderModel from "@/models/Order";


const getTimeFrames = () => {
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).setHours(0, 0, 0, 0);

    return { startOfToday, startOfWeek, startOfMonth };
};

export const getOrderStatsForAdmin = async () => {
    await dbConnect()
    const { startOfToday, startOfWeek, startOfMonth } = getTimeFrames();

    try {
        const todayOrders = await OrderModel.find({
            orderDate: { $gte: startOfToday }
        });

        const weekOrders = await OrderModel.find({
            orderDate: { $gte: startOfWeek }
        });

        const monthOrders = await OrderModel.find({
            orderDate: { $gte: startOfMonth }
        });

        const todayRevenue = todayOrders.reduce((total:any, order:any) => total + order.totalPrice, 0);
        const weekRevenue = weekOrders.reduce((total:any, order:any) => total + order.totalPrice, 0);
        const monthRevenue = monthOrders.reduce((total:any, order:any) => total + order.totalPrice, 0);

        return {
            today: { count: todayOrders.length, revenue: todayRevenue },
            week: { count: weekOrders.length, revenue: weekRevenue },
            month: { count: monthOrders.length, revenue: monthRevenue }
        };
    } catch (error) {
        console.error("Error fetching order stats:", error);
        throw error; // or handle it as needed
    }
};
export const getOrderStatsForStore = async (storeId:any) => {
    await dbConnect()
    const { startOfToday, startOfWeek, startOfMonth } = getTimeFrames();

    try {
        const todayOrders = await OrderModel.find({
            orderDate: { $gte: startOfToday },
            storeId:storeId
        });

        const weekOrders = await OrderModel.find({
            orderDate: { $gte: startOfWeek },
            storeId:storeId
        });

        const monthOrders = await OrderModel.find({
            orderDate: { $gte: startOfMonth },
            storeId:storeId
        });

        const todayRevenue = todayOrders.reduce((total:any, order:any) => total + order.totalPrice, 0);
        const weekRevenue = weekOrders.reduce((total:any, order:any) => total + order.totalPrice, 0);
        const monthRevenue = monthOrders.reduce((total:any, order:any) => total + order.totalPrice, 0);

        return {
            today: { count: todayOrders.length, revenue: todayRevenue },
            week: { count: weekOrders.length, revenue: weekRevenue },
            month: { count: monthOrders.length, revenue: monthRevenue }
        };
    } catch (error) {
        console.error("Error fetching order stats:", error);
        throw error; // or handle it as needed
    }
};