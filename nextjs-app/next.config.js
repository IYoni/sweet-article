/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // Separate build directory for production builds
  distDir: process.env.NODE_ENV === 'production' ? '.next-build' : '.next-dev',
  
  // Generate standalone output for easier deployment
  output: 'standalone',
  
  // Optimize builds
  experimental: {
    // Enable build cache
    turbotrace: {
      logLevel: 'error'
    }
  },
  
  // Custom webpack config to handle file conflicts and path resolution
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Use different cache directories for dev vs build
    if (dev) {
      config.cache = {
        type: 'filesystem',
        cacheDirectory: '/home/user/.next-cache-dev'
      }
    } else {
      config.cache = {
        type: 'filesystem', 
        cacheDirectory: '/home/user/.next-cache-build'
      }
    }
    
    // Enhanced path resolution for @/ imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/components': path.resolve(__dirname, 'components'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/utils': path.resolve(__dirname, 'lib/utils'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      '@/app': path.resolve(__dirname, 'app'),
      '@/src': path.resolve(__dirname, 'src')
    }
    
    // Ensure proper module resolution
    config.resolve.modules = [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ]
    
    // Handle missing modules gracefully
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false
    }
    
    return config
  },
  
  // Transpile packages that might cause issues
  transpilePackages: ['@radix-ui/react-accordion', 'lucide-react'],
  
  // Additional TypeScript configuration
  typescript: {
    // Allow build to continue even with TypeScript errors during development
    ignoreBuildErrors: process.env.NODE_ENV === 'development'
  },
  
  // ESLint configuration
  eslint: {
    // Allow build to continue even with ESLint errors during development
    ignoreDuringBuilds: process.env.NODE_ENV === 'development'
  }
}

module.exports = nextConfig