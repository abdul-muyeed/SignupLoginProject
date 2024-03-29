import mongoose from 'mongoose';
export const MongoDB = async () => {
    try{
      const res =  mongoose.connect(process.env.MONGOOSE_URI).then(()=>{
            console.log('Connected to MongoDB');
})
    }catch(err){
        console.log('Error connecting to MongoDB', err)
    }
}

