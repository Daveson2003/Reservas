import Hotel from "../models/Hotel.js";

export const createHotel = async(req,res,next) => {
    const newHotel = new Hotel(req.body);
    try{
        const savedHotel =  await newHotel.save();
        res.status(201).json(savedHotel);
    }catch(err){
        next(err)
    }
}

export const updateHotel = async(req,res,next) => {
    try{
        const updateHotel =  await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updateHotel);
    }catch(err){
        next(err)
    }
}


// DELETE
export const deleteHotel = async(req,res,next) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({"message": "Hotel eliminado con exito"});
    }catch(err){
        next(err)
    }
}

// GET
export const getHotel = async(req,res,next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(err){
        next(err)
    }
}

// GET ALL
export const getHotels = async(req,res,next) => {
    const {min,max,limit,...others} = req.query
    try{
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice:{$gte:parseInt(min) | 1,$lte:parseInt(max) || 9999999}
        }).limit(parseInt(req.query.limit));
        res.status(200).json(hotels);
    }catch(err){
        next(err)
    }
}

export const countByCity = async(req,res,next) => {
    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
    }catch(err){
        next(err)
    }
}

export const countByType = async(req,res,next) => {
    const hotelCount = await Hotel.countDocuments({type:"hotel"});
    const apartmentCount = await Hotel.countDocuments({type:"apartment"});
    const resortCount = await Hotel.countDocuments({type:"resort"});
    const villaCount = await Hotel.countDocuments({type:"villa"});
    const cabinCount = await Hotel.countDocuments({type:"cabin"});
    try{
        res.status(200).json([
            {type:"hotels",count: hotelCount},
            {type:"apartments",count: apartmentCount},
            {type:"resort",count: resortCount},
            {type:"villa",count: villaCount},
            {type:"cabin",count: cabinCount}
        ]);
    }catch(err){
        next(err)
    }
}