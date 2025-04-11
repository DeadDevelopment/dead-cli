import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface indexhtml {
    title: string,
    description: string,
    links: {
        rel: string,
        href: string,
        type: string,
        attr: string
    }[],
    ogSEO: {
        content: string,
        property: string
    }[],
    twitterSEO: {
        content: string,
        name: string
    }[],
    scriptSEO: {
        context: string,
        type: string,
        url: string,
        logo: string
    }
}

export async function generateIC(options: any): Promise<void> {
    try {
        const payload: indexhtml = {
            title: options.title || "Dead-App",
            description: options.description || "A new way to build front end.",
            links: options.links || [
                {"rel": "canonical", "href": "https://deaddevelopment.com/"},
                {"rel": "preconnect", "href": "https://fonts.googleapis.com"},
                {"rel": "preconnect", "href": "https://fonts.googleapis.com", "attr": "crossorigin"},
                {"rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"},
                {"rel": "stylesheet", "href": "https://fonts.googleapis.com/icon?family=Material+Icons"}
            ],
            ogSEO: options.ogSEO || [
                {"property": "og:title", "content": "Dead Development | Webapp Development Automated"},
                {"property": "og:description", "content": "Build Angular frontends faster than ever before."},
                {"property": "og:image", "content": "https://example.com/"},
                {"property": "og:url", "content": "https://deaddevelopment.com/"},
                {"property": "og:type", "content": "website"},
            ],
            twitterSEO: options.twitterSEO || [
                {"name": "twitter:card", "content": "summary_image_large"},
                {"name": "twitter:title", "content": "Dead Development | Webapp Development Automated"},
                {"name": "twitter:description", "content": "Build Angular frontends faster than ever before."},
                {"name": "twitter:image", "content": "https://example.com/"},
                {"name": "twitter:site", "content": "https://deaddevelopment.com/"},
            ],
            scriptSEO: options.scriptSEO || {
                "context": "https://schema.org",
                "type": "Company",
                "url": "https://deaddevelopment.com/",
                "logo": "https://example.com"
            }
        };

        const response = await axios.post(
            ENDPOINTS.indexConfig,
            payload
        );

        if (response.data.success && response.data.result) {
            
            const baseName = 'index.html';
            const result: GenerationResult = { ...response.data.result };
      
            // Define filename templates. You can customize these as needed.
            const filenameMap = {
                html: 'index.html'
            };
      
            await writeGeneratedFiles({
                outputDir: './', // or use an option to let the user specify the directory
                baseName,
                result,
                filenameMap
            });

            console.log(MSGS.SUCCESS);
          } else {
            console.error(ERRORS.HANDLER_TRY);
          }

    } catch (error: any) {
        console.error('Error:', error.message);
    }
}
