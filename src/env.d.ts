declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // ENVIRONMENT
      NODE_ENV: string;
      ENV?: 'development' | 'production';

      // SERVER
      HOST: string;
      PORT: string;

      RATE_MAX_REQUEST?: string;
      RATE_INTERVAL?: string;

      // Database
      DB_HOST: string;
      DB_PORT?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_DATABASE: string;

      // PokeApi
      POKEAPI_BASE_URL: string;
    }
  }
}

export {};
