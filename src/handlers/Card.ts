import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Card {
    name: string
}

export async function generateC(options: any): Promise<void> {
    try {
        const payload: Card = {
            name: options.name || 'dead-card'
        }

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateCard',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated Card component.');
            const baseName = options.name;
            const result: GenerationResult = { ...response.data.result };

            if (!result.scss) {
                result.scss = '';
            }

            const filenameMap = {
                html: '{name}.component.html',
                ts: '{name}.component.ts',
                scss: '{name}.component.scss'
              };

            await writeGeneratedFiles({
                outputDir: './', // or use an option to let the user specify the directory
                baseName,
                result,
                filenameMap
            });
        } else {
            console.error('Response indicated failure or missing result.')
        }
    } catch (error: any) {
        console.error('Error', error.message);
    }
}
