const DB_URI = `mongodb+srv://brianzrte:${process.env.DB_PASSWORD}@proyectocoderhouse.bl78j.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

export default  {
    mongodb: {
        uri: DB_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
}