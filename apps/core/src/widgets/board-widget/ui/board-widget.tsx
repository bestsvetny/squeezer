import React from 'react';
import '@tldraw/tldraw/tldraw.css';
import { Tldraw } from '@tldraw/tldraw';
import { BlockShapeUtil } from 'entities/block-shape';
import { BlockTool } from 'features/block-tool';
import { CardShapeTool } from 'widgets/board-widget/model/tool';
import { uiOverrides } from 'widgets/board-widget/model';

export const BoardWidget = () => {
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
