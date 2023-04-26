import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';



const vitestConfig: VitestUserConfigInterface = {
  test: {
    include: ['**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
  },
};


/// <reference types="vitest" />
export default defineConfig({
  plugins: [react()],
  
  test: vitestConfig.test,
  // and now: just vite config
});