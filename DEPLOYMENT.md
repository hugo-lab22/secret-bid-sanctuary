# Vercel Deployment Guide for Secret Bid Sanctuary

This guide provides step-by-step instructions for deploying the Secret Bid Sanctuary application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Domain name (optional, for custom domain)

## Step-by-Step Deployment Process

### 1. Prepare the Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub" to link your GitHub account
4. Authorize Vercel to access your repositories

### 3. Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select the `hugo-lab22/secret-bid-sanctuary` repository
3. Click "Import"

### 4. Configure Project Settings

#### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

**To add environment variables:**
1. In your project settings, go to "Environment Variables"
2. Click "Add New"
3. Add each variable with its value
4. Select "Production", "Preview", and "Development" environments
5. Click "Save"

### 5. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your application will be available at the provided Vercel URL

### 6. Custom Domain (Optional)

If you have a custom domain:

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (up to 24 hours)

## Post-Deployment Configuration

### 1. Update Contract Address

After deploying your smart contract:
1. Update the `contractAddress` in `config.ts`
2. Commit and push changes
3. Vercel will automatically redeploy

### 2. Verify Deployment

Test the following features:
- [ ] Wallet connection works
- [ ] Property listings display correctly
- [ ] Bidding modal opens and functions
- [ ] Responsive design works on mobile
- [ ] All pages load without errors

### 3. Monitor Performance

- Check Vercel Analytics for performance metrics
- Monitor error logs in the Vercel dashboard
- Set up alerts for build failures

## Troubleshooting

### Common Issues

#### Build Failures
- Check that all dependencies are in `package.json`
- Verify environment variables are set correctly
- Check build logs in Vercel dashboard

#### Wallet Connection Issues
- Verify WalletConnect Project ID is correct
- Check that RPC URLs are accessible
- Ensure chain ID matches your configuration

#### Environment Variables Not Loading
- Verify variable names match exactly (case-sensitive)
- Check that variables are set for the correct environment
- Redeploy after adding new variables

### Getting Help

1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review build logs in your Vercel dashboard
3. Check GitHub issues for similar problems

## Production Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Smart contract deployed and verified
- [ ] Contract address updated in configuration
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics tracking set up
- [ ] Error monitoring configured
- [ ] Performance optimization completed
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility verified

## Maintenance

### Regular Updates

1. **Dependencies**: Keep dependencies updated
2. **Security**: Monitor for security vulnerabilities
3. **Performance**: Regular performance audits
4. **Backups**: Ensure code is backed up in Git

### Monitoring

- Set up uptime monitoring
- Monitor error rates
- Track user engagement metrics
- Monitor gas costs for transactions

## Support

For deployment issues:
- Vercel Support: [vercel.com/help](https://vercel.com/help)
- GitHub Issues: Create an issue in the repository
- Documentation: Check project README.md

---

**Deployment URL**: Your app will be available at `https://secret-bid-sanctuary-[random].vercel.app`

**Custom Domain**: Configure in Vercel dashboard under "Domains" section
