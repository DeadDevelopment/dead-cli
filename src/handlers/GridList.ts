import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Tiles {
    colspan: number,
    rowspan: number,
    content: string,
};

export interface GridList {
    name: string,
    cols: number,
    rowHeight: string,
    tiles: Tiles[],
}

export async function generateGl(options: any): Promise<void> {
    try{
        
        const payload: GridList = {
            name: options.name || 'dead-grid-list',
            cols: options.cols ? parseInt(options.cols) : 2,
            rowHeight: options.rowHeight || '32rem',
            tiles: options.tiles || [{"colspan": 1, "rowspan": 1, "content": "A"}, {"colspan": 1, "rowspan": 1, "content": "B"} ]
        };

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateGridList',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated GridList.');
            const baseName = options.name; // Use the CLI name option
            // Make a copy of the result to modify if needed
            const result: GenerationResult = { ...response.data.result };
      
            // If you want to generate a SCSS file even if not provided:
            if (!result.scss) {
                result.scss = ''; // create an empty SCSS file
            }
      
            // Define filename templates. You can customize these as needed.
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
            console.error('Response indicated failure or missing result.');
          }

    } catch (error: any) {
        console.error('Error:', error.message);
    }
}
