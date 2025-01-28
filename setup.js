import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function runCommand(command, cwd = process.cwd()) {
    try {
        const { stdout, stderr } = await execAsync(command, { cwd });
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        return true;
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error.message);
        return false;
    }
}

async function checkEnvFile() {
    const envPath = path.join(process.cwd(), '.env');
    try {
        await fs.access(envPath);
        console.log('✅ .env file exists');
    } catch {
        console.log('⚠️ Creating .env file with default configuration...');
        const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REDIS_URI=redis://localhost:6379
NODE_ENV=development`;
        
        await fs.writeFile(envPath, envContent);
        console.log('✅ Created .env file');
    }
}

async function setup() {
    console.log('🚀 Starting setup process...');

    // Check and create .env file
    await checkEnvFile();

    // Install root dependencies
    console.log('📦 Installing root dependencies...');
    if (!await runCommand('npm install')) return;

    // Install frontend dependencies
    console.log('📦 Installing frontend dependencies...');
    if (!await runCommand('npm install --prefix frontend')) return;

    // Check if MongoDB is installed (for Windows)
    console.log('🔍 Checking MongoDB installation...');
    try {
        await execAsync('mongod --version');
        console.log('✅ MongoDB is installed');
    } catch {
        console.log('⚠️ MongoDB is not installed. Please install MongoDB from: https://www.mongodb.com/try/download/community');
    }

    // Check if Redis is installed (for Windows)
    console.log('🔍 Checking Redis installation...');
    try {
        await execAsync('redis-cli --version');
        console.log('✅ Redis is installed');
    } catch {
        console.log('⚠️ Redis is not installed. Please install Redis from: https://github.com/microsoftarchive/redis/releases');
    }

    console.log('\n✨ Setup completed! You can now run the application with:');
    console.log('npm run dev');
}

setup().catch(console.error);
