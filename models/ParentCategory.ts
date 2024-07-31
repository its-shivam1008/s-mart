import mongoose, {Schema, Types, Document} from "mongoose";

export interface SubCategoryArray{
    name:string;
    description:string;
    properties:[];
    subCategoryId:Types.ObjectId;
}

interface ParentCategory extends Document {
    name:string;
    description:string;
    subCategory:SubCategoryArray[];
    createdAt:Date;
    updatedAt:Date;
}

const ParentCategorySchema:Schema<ParentCategory>=new Schema({
    name:{
        type:String,
        unique:true,
        reqired:[true, "Category name is required"]
    },
    description:{
        type:String,
        reqired:[true, "description is required"]
    }, 
    subCategory:[
        {
            name:String,
            description:String,
            properties:[],
            subCategoryId:{
                type:Schema.Types.ObjectId,
                ref:'SubCategory'
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
})

const ParentCategoryModel = (mongoose.models.ParentCategory as mongoose.Model<ParentCategory>) || mongoose.model<ParentCategory>("ParentCategory", ParentCategorySchema);
export default ParentCategoryModel;

// I am giving you  list of ParentCategories with there SubCategories extract all the Parent Categories from it and make a json object having its name, description                  
// ### Electronics
// 1. **Mobile Phones**
//    - Smartphones
//    - Feature Phones
// 2. **Computers & Accessories**
//    - Laptops
//    - Desktops
//    - Monitors
//    - Keyboards
//    - Mice
// 3. **Cameras**
//    - DSLR Cameras
//    - Mirrorless Cameras
//    - Point & Shoot Cameras
//    - Camera Accessories
// 4. **Home Appliances**
//    - Refrigerators
//    - Washing Machines
//    - Air Conditioners
//    - Microwave Ovens

// ### Fashion
// 1. **Men's Clothing**
//    - T-Shirts
//    - Shirts
//    - Jeans
//    - Trousers
// 2. **Women's Clothing**
//    - Dresses
//    - Tops
//    - Jeans
//    - Skirts
// 3. **Footwear**
//    - Men's Footwear
//    - Women's Footwear
//    - Kids' Footwear
// 4. **Accessories**
//    - Watches
//    - Sunglasses
//    - Bags
//    - Belts
// ### Home & Furniture
// 1. **Furniture**
//    - Sofas
//    - Beds
//    - Dining Tables
//    - Chairs
// 2. **Home Decor**
//    - Wall Art
//    - Clocks
//    - Curtains
//    - Lighting
// 3. **Kitchenware**
//    - Cookware
//    - Dinnerware
//    - Storage & Containers
// 4. **Bedding**
//    - Bedsheets
//    - Blankets
//    - Pillows
//    - Mattresses
// ### Books
// 1. **Fiction**
//    - Mystery
//    - Romance
//    - Science Fiction
//    - Fantasy
// 2. **Non-Fiction**
//    - Biographies
//    - Self-Help
//    - Business
//    - Health & Wellness
// 3. **Educational**
//    - Textbooks
//    - Reference Books
//    - Language Learning
// 4. **Children's Books**
//    - Picture Books
//    - Early Learning
//    - Young Adult

// ### Beauty & Personal Care
// 1. **Skincare**
//    - Moisturizers
//    - Cleansers
//    - Sunscreens
// 2. **Haircare**
//    - Shampoos
//    - Conditioners
//    - Hair Treatments
// 3. **Makeup**
//    - Foundations
//    - Lipsticks
//    - Eyeshadows
// 4. **Fragrances**
//    - Perfumes
//    - Deodorants
//    - Body Mists
// ### Sports & Outdoors
// 1. **Fitness Equipment**
//    - Treadmills
//    - Exercise Bikes
//    - Dumbbells
// 2. **Outdoor Gear**
//    - Tents
//    - Sleeping Bags
//    - Backpacks
// 3. **Sportswear**
//    - Running Shoes

// [
//     {
//       "name": "Electronics",
//       "description": "Devices and gadgets including mobile phones, computers, cameras, and home appliances."
//     },
//     {
//       "name": "Fashion",
//       "description": "Clothing, footwear, and accessories for men, women, and children."
//     },
//     {
//       "name": "Home & Furniture",
//       "description": "Furniture, home decor, kitchenware, and bedding items for the home."
//     },
//     {
//       "name": "Books",
//       "description": "A variety of books including fiction, non-fiction, educational, and children's books."
//     },
//     {
//       "name": "Beauty & Personal Care",
//       "description": "Products for skincare, haircare, makeup, and fragrances."
//     },
//     {
//       "name": "Sports & Outdoors",
//       "description": "Fitness equipment, outdoor gear, and sportswear."
//     }
//   ]



// sub

// I am giving you  list of ParentCategories with there SubCategories extract all the Sub Categories from it and make a json object having its name, description,  pareCategory{parentName}, properties[(those properties only that can be used to retrieve or sort the respective product for example properties of Mobile Phone will be the array of object of its {color}, {ram}, {rom})]
// ### Electronics
// 1. **Mobile Phones**
// 2. **Computers & Accessories**
// 3. **Cameras**
// 4. **Home Appliances**
// ### Fashion
// 1. **Men's Clothing**
// 2. **Women's Clothing**
// 3. **Footwear**
// 4. **Accessories**
// ### Home & Furniture
// 1. **Furniture**
// 2. **Home Decor**
// 3. **Kitchenware**
// 4. **Bedding**
// ### Books
// 1. **Fiction**
// 2. **Non-Fiction**
// 3. **Educational**
// 4. **Children's Books**
// ### Beauty & Personal Care
// 1. **Skincare**
// 2. **Haircare**
// 3. **Makeup**
// 4. **Fragrances**
// ### Sports & Outdoors
// 1. **Fitness Equipment**
// 2. **Outdoor Gear**
// 3. **Sportswear**

// [
//     {
//       "name": "Mobile Phones",
//       "description": "Devices used for communication, internet browsing, and multimedia.",
//       "parentCategory": "Electronics",
//       "properties": [
//         {"color": "string"},
//         {"ram": "number"},
//         {"rom": "number"}
//       ]
//     },
//     {
//       "name": "Computers & Accessories",
//       "description": "Devices and peripherals for computing needs.",
//       "parentCategory": "Electronics",
//       "properties": [
//         {"type": "string"},
//         {"brand": "string"},
//         {"processor": "string"},
//         {"ram": "number"},
//         {"storage": "number"}
//       ]
//     },
//     {
//       "name": "Cameras",
//       "description": "Devices for capturing photos and videos.",
//       "parentCategory": "Electronics",
//       "properties": [
//         {"type": "string"},
//         {"megapixels": "number"},
//         {"lensType": "string"}
//       ]
//     },
//     {
//       "name": "Home Appliances",
//       "description": "Electrical machines used in household tasks.",
//       "parentCategory": "Electronics",
//       "properties": [
//         {"type": "string"},
//         {"brand": "string"},
//         {"capacity": "number"}
//       ]
//     },
//     {
//       "name": "Men's Clothing",
//       "description": "Apparel for men including shirts, trousers, and more.",
//       "parentCategory": "Fashion",
//       "properties": [
//         {"size": "string"},
//         {"color": "string"},
//         {"material": "string"}
//       ]
//     },
//     {
//       "name": "Women's Clothing",
//       "description": "Apparel for women including dresses, tops, and more.",
//       "parentCategory": "Fashion",
//       "properties": [
//         {"size": "string"},
//         {"color": "string"},
//         {"material": "string"}
//       ]
//     },
//     {
//       "name": "Footwear",
//       "description": "Shoes for men, women, and children.",
//       "parentCategory": "Fashion",
//       "properties": [
//         {"size": "string"},
//         {"color": "string"},
//         {"material": "string"}
//       ]
//     },
//     {
//       "name": "Accessories",
//       "description": "Fashion accessories like watches, sunglasses, and bags.",
//       "parentCategory": "Fashion",
//       "properties": [
//         {"type": "string"},
//         {"brand": "string"},
//         {"material": "string"}
//       ]
//     },
//     {
//       "name": "Furniture",
//       "description": "Items used to make a room or building suitable for living or working.",
//       "parentCategory": "Home & Furniture",
//       "properties": [
//         {"type": "string"},
//         {"material": "string"},
//         {"dimensions": "string"}
//       ]
//     },
//     {
//       "name": "Home Decor",
//       "description": "Items used to decorate a home.",
//       "parentCategory": "Home & Furniture",
//       "properties": [
//         {"type": "string"},
//         {"material": "string"},
//         {"color": "string"}
//       ]
//     },
//     {
//       "name": "Kitchenware",
//       "description": "Utensils and appliances used in the kitchen.",
//       "parentCategory": "Home & Furniture",
//       "properties": [
//         {"type": "string"},
//         {"material": "string"},
//         {"brand": "string"}
//       ]
//     },
//     {
//       "name": "Bedding",
//       "description": "Items used on a bed for comfort and decoration.",
//       "parentCategory": "Home & Furniture",
//       "properties": [
//         {"size": "string"},
//         {"material": "string"},
//         {"color": "string"}
//       ]
//     },
//     {
//       "name": "Fiction",
//       "description": "Books that contain stories created from the imagination.",
//       "parentCategory": "Books",
//       "properties": [
//         {"genre": "string"},
//         {"author": "string"},
//         {"publicationYear": "number"}
//       ]
//     },
//     {
//       "name": "Non-Fiction",
//       "description": "Books that are based on facts and real events.",
//       "parentCategory": "Books",
//       "properties": [
//         {"genre": "string"},
//         {"author": "string"},
//         {"publicationYear": "number"}
//       ]
//     },
//     {
//       "name": "Educational",
//       "description": "Books used for learning and education.",
//       "parentCategory": "Books",
//       "properties": [
//         {"subject": "string"},
//         {"author": "string"},
//         {"publicationYear": "number"}
//       ]
//     },
//     {
//       "name": "Children's Books",
//       "description": "Books written for children.",
//       "parentCategory": "Books",
//       "properties": [
//         {"ageGroup": "string"},
//         {"author": "string"},
//         {"publicationYear": "number"}
//       ]
//     },
//     {
//       "name": "Skincare",
//       "description": "Products used to care for the skin.",
//       "parentCategory": "Beauty & Personal Care",
//       "properties": [
//         {"type": "string"},
//         {"brand": "string"},
//         {"skinType": "string"}
//       ]
//     },
//     {
//       "name": "Haircare",
//       "description": "Products used to care for the hair.",
//       "parentCategory": "Beauty & Personal Care",
//       "properties": [
//         {"type": "string"},
//         {"brand": "string"},
//         {"hairType": "string"}
//       ]
//     },
//     {
//       "name": "Makeup",
//       "description": "Cosmetic products used to enhance appearance.",
//       "parentCategory": "Beauty & Personal Care",
//       "properties": [
//         {"type": "string"},
//         {"brand": "string"},
//         {"shade": "string"}
//       ]
//     },
//     {
//       "name": "Fragrances",
//       "description": "Products used to give a pleasant smell.",
//       "parentCategory": "Beauty & Personal Care",
//       "properties": [
//         {"type": "string"},
//         {"brand": "string"},
//         {"scent": "string"}
//       ]
//     },
//     {
//       "name": "Fitness Equipment",
//       "description": "Equipment used for physical exercise.",
//       "parentCategory": "Sports & Outdoors",
//       "properties": [
//         {"type": "string"},
//         {"brand": "string"},
//         {"weight": "number"}
//       ]
//     },
//     {
//       "name": "Outdoor Gear",
//       "description": "Equipment used for outdoor activities.",
//       "parentCategory": "Sports & Outdoors",
//       "properties": [
//         {"type": "string"},
//         {"brand": "string"},
//         {"material": "string"}
//       ]
//     },
//     {
//       "name": "Sportswear",
//       "description": "Clothing worn for sports and physical exercise.",
//       "parentCategory": "Sports & Outdoors",
//       "properties": [
//         {"size": "string"},
//         {"material": "string"},
//         {"brand": "string"}
//       ]
//     }
//   ]
    