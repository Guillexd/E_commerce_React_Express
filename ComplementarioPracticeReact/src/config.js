import dotenv from "dotenv";

//.ENV MUST BE OUTSIDE of src directory
dotenv.config();

const obj = {
  port: process.env.PORT,
  uri_mongodb: process.env.URI_MONGODB,
  secret_key_jwt: process.env.SECRET_KEY_JWT
};

export default obj;
