import { Command } from 'commander';
import { generateIC } from '../handlers/IndexConfig';

export function generateIndexConfig(program: Command) {
    program
    .command('generateIndexConfig')
    .alias('indexc')
    .description('Generate an index.html file.')
    .option(
        '-t, --title <title>',
        'Set the title for your webapp.',
        'Dead-App',
    )
    .option(
        '-l, --links <links>',
        'Configure your link elements.',
        (value) => JSON.parse(value),
        JSON.stringify([
            {rel: "canonical", href: "https://deaddevelopment.com/"},
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.googleapis.com", "attr": "crossorigin"},
            {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"},
            {rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons"}
        ])
    )
    .option(
        '-o, --ogSEO <ogSEO>',
        'Configure your SEO properties for instagram.',
        (value) => JSON.parse(value),
        JSON.stringify([
            {property: "og:title", context: "Dead Development | Webapp Development Automated"},
            {property: "og:description", context: "Build Angular frontends faster than ever before."},
            {property: "og:image", context: "https://example.com/"},
            {property: "og:url", context: "https://deaddevelopment.com/"},
            {property: "og:type", context: "website"},
        ])
    )
    .option(
        '--ts, --twitterSEO <twitterSEO>',
        'Configure your SEO properties for twitter (X).',
        (value) => JSON.parse(value),
        JSON.stringify([
            {name: "twitter:card", context: "summary_image_large"},
            {name: "twitter:title", context: "Dead Development | Webapp Development Automated"},
            {name: "twitter:description", context: "Build Angular frontends faster than ever before."},
            {name: "twitter:image", context: "https://example.com/"},
            {name: "twitter:site", context: "https://deaddevelopment.com/"},
        ])
    )
    .option(
        '-s, --scriptSEO <scriptSEO>',
        'Configure your json SEO script tag',
        (value) => JSON.parse(value),
        JSON.stringify({
            context: "https://schema.org",
            type: "Company",
            url: "https://deaddevelopment.com/",
            logo: "https://example.com"
        })
    )
    .action(async (options) => {
        try {
            await generateIC(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
