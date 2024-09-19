'use server'
import dbConnect from "@/Db/Db";
import OrderModel from "@/models/Order";
import StoreModel from "@/models/Store";


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
            message:'Found the stats', success:true,
            today: { count: todayOrders.length, revenue: todayRevenue },
            week: { count: weekOrders.length, revenue: weekRevenue },
            month: { count: monthOrders.length, revenue: monthRevenue }
        };
    } catch (error) {
        return {message: 'Some error occured', success:false , error: JSON.stringify(error)}
    }
};
export const getOrderStatsForStore = async (userEmail:string) => {
    // console.log({lol:'connection nahi hua'})
    await dbConnect()
    // console.log({lol:'connection ho gya hai'})
    const { startOfToday, startOfWeek, startOfMonth } = getTimeFrames();

    try {

        const store = await StoreModel.findOne({'associatedUser.userEmail':userEmail})
        if(!store){
            return {message: 'Unable to fetch store', success:false}
        }
        const todayOrders = await OrderModel.find({
            orderDate: { $gte: startOfToday },
            storeId:store._id
        });

        const weekOrders = await OrderModel.find({
            orderDate: { $gte: startOfWeek },
            storeId:store._id
        });

        const monthOrders = await OrderModel.find({
            orderDate: { $gte: startOfMonth },
            storeId:store._id
        });

        const todayRevenue = todayOrders.reduce((total:any, order:any) => total + order.totalPrice, 0);
        const weekRevenue = weekOrders.reduce((total:any, order:any) => total + order.totalPrice, 0);
        const monthRevenue = monthOrders.reduce((total:any, order:any) => total + order.totalPrice, 0);
        // console.log({
        //     message:'Found the stats', success:true,
        //     today: { count: todayOrders.length, revenue: todayRevenue },
        //     week: { count: weekOrders.length, revenue: weekRevenue },
        //     month: { count: monthOrders.length, revenue: monthRevenue }
        // })
        return {
            message:'Found the stats', success:true,
            today: { count: todayOrders.length, revenue: todayRevenue },
            week: { count: weekOrders.length, revenue: weekRevenue },
            month: { count: monthOrders.length, revenue: monthRevenue }
        };
    } catch (error) {
        return {message: 'Some error occured', success:false , error: JSON.stringify(error)}
    }
};