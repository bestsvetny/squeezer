import React from 'react';
import '@tldraw/tldraw/tldraw.css';
import { defineShape, Tldraw } from '@tldraw/tldraw';
import { BlockShapeUtil } from 'entities/block-shape';

export const Board = () => {
    const BlockShape = defineShape('block', { util: BlockShapeUtil });
    const CustomShapes = [BlockShape];

    return (
        <div className='tldraw__editor'>
            <Tldraw hideUi shapes={CustomShapes}>
                {/*<Canvas />*/}
            </Tldraw>
        </div>
    );
};
