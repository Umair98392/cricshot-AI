import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    define: {
      'process.env': process.env
    },
    plugins: [react()],
  }
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   // server:{
//   //   proxy:{
//   //     '/lol':'';
//   //   },
//   // },
//   plugins: [react()],
// })


