// Set the NODE_ENV to 'development' by default
import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },


  /**
   * AWS Configuration
   */
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  awsRegion: "ap-northeast-2",

}