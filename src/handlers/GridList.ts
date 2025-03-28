import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
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
            ENDPOINTS.gridList,
            payload
        );

        if (response.data.success && response.data.result) {
            
            const baseName = options.name;
            const result: GenerationResult = { ...response.data.result };

            if (!result.scss) {
                result.scss = ''; // create an empty SCSS file
            }
      
            // Define filename templates. You can customize these as needed.
            const filenameMap = {
                html: '{name}.component.html',
                ts: '{name}.component.ts',
                scss: '{name}.component.scss',
                spec: '{name}.component.spec.ts'
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
