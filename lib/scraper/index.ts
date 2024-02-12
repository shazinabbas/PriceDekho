export async function scrapeAmazonProduct(url: string) {
    if (!url) return;
    
    //BrightData proxy config 
    const username = String(process.env.BRIGHTDATA_USERNAME);
    const password = String(process.env.BRIGHTDATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password: password,
        },

        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,

        
    }

    try {
        //Fetch the product page
        const response = await axios.get(url, options);
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`);
    }
}