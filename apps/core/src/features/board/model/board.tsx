import React from 'react';
import '@tldraw/tldraw/tldraw.css';
import { Tldraw } from '@tldraw/tldraw';
import { BlockShapeUtil } from 'entities/block-shape';
import { uiOverrides } from 'features/board/model/overrides';
import { CardShapeTool } from 'features/board/model/tool';
import { BlockTool } from 'features/block-tool';

export const Board = () => {
    const CustomShapes = [BlockShapeUtil];
    const customTools = [CardShapeTool];

    return (
        <div className='tldraw__editor'>
            <Tldraw autoFocus shapeUtils={CustomShapes} tools={customTools} overrides={uiOverrides}>
                <BlockTool />
            </Tldraw>
        </div>
    );
};
