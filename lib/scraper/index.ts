import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractPrice } from '../utils';

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
        const $ = cheerio.load(response.data);
        
        //Extract product details
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a.-color-price'),
            $('.a-button-selected .a-color-base'),
            $('a-price-whole'),
            $('.a-price.a-text')
        );

        console.log({title, currentPrice});
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`);
    }
}