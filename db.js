import mongoose from 'mongoose'

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

    console.log('db connected')
  } catch (e) {
    console.log(`error while connecting to db: ${e.message}`)
  }
}

export default connectMongo