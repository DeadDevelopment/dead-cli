import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Theme {
    name: string,
    headingFont: string,
    headingTypeface: string,
    regularFont: string,
    regularTypeface: string,
    regularWeight: number,
    boldWeight: number,
    colors: {
        primary: string,
        primaryLight: string,
        primaryDark: string,
        secondary: string,
        background: string,
        error: string
    },
    density: string
}

export async function generateTh(options: any): Promise<void> {
    try{
        const payload: Theme = {
            name: options.name || 'DeadTheme',
            headingFont: options.headingFont || 'Nunito Sans',
            headingTypeface: options.headingTypeface || 'sans-serif',
            regularFont: options.regularFont || 'Nunito Sans',
            regularTypeface: options.regularTypeface || 'sans-serif',
            regularWeight: options.regularWeight ? parseInt(options.regularWeight) : 400,
            boldWeight: options.boldWeight ? parseInt(options.boldWeight): 700,
            colors: options.colors || {
                "primary": "#a784c2",
                "primaryLight": "#f5f5f5",
                "primaryDark": "#666",
                "secondary": "#cf929a",
                "background": "#0a0908",
                "error": "#f94144"
            },
            density: options.density || '0'
        }

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateTheme',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated GridList.');
            const baseName = options.name; // Use the CLI name option
            // Make a copy of the result to modify if needed
            const result: GenerationResult = { ...response.data.result };
            // Define filename templates. You can customize these as needed.
            const filenameMap = {
                scss: '{name}.component.scss'
            };
      
            await writeGeneratedFiles({
                outputDir: './', // or use an option to let the user specify the directory
                baseName,
                result,
                filenameMap
            });
          } else {
            console.error('Response indicated failure or missing result.');
          }
    } catch (error: any) {
        console.error('Error', error.message);
    }
}
