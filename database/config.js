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
    firebase: {
        "type": "service_account",
        "project_id": "ecommerce-456c5",
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY,
        "client_email": "firebase-adminsdk-kwm5c@ecommerce-456c5.iam.gserviceaccount.com",
        "client_id": "106052953804616056659",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kwm5c%40ecommerce-456c5.iam.gserviceaccount.com"
    }
}