import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from "dotenv"


dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0', // Set to allow connections from all IPs
  },
  define: {
    'process.env.PEPSALES_BASEURL': JSON.stringify(process.env.PEPSALES_BASEURL),
  },
})

dotenv.config();