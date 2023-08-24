import React from 'react';
import '@tldraw/tldraw/tldraw.css';
import { Tldraw, track, useEditor } from '@tldraw/tldraw';
import { BlockShapeUtil } from 'entities/block-shape';
import { BlockTool } from 'features/block-tool';
import { CardShapeTool } from 'widgets/board-widget/model/tool';
import { uiOverrides } from 'widgets/board-widget/model';
import { useYjsStore } from 'widgets/board-widget/model/useYjsStore';

const HOST_URL = process.env.BOARD_HOST_URL;

export const BoardWidget = () => {
    const CustomShapes = [BlockShapeUtil];
    const customTools = [CardShapeTool];
    const store = useYjsStore({
        roomId: 'example6',
        hostUrl: HOST_URL,
        shapeUtils: CustomShapes
    });

    return (
        <div className='tldraw__editor'>
            <Tldraw
                autoFocus
                store={store}
                shareZone={<NameEditor />}
                shapeUtils={CustomShapes}
                tools={customTools}
                overrides={uiOverrides}
            >
                <BlockTool />
            </Tldraw>
        </div>
    );
};

const NameEditor = track(() => {
    const editor = useEditor();

    const { color, name } = editor.user;

    return (
        <div style={{ pointerEvents: 'all', display: 'flex' }}>
            <input
                type='color'
                value={color}
                onChange={(e) => {
                    editor.user.updateUserPreferences({
                        color: e.currentTarget.value
                    });
                }}
            />
            <input
                value={name}
                onChange={(e) => {
                    editor.user.updateUserPreferences({
                        name: e.currentTarget.value
                    });
                }}
            />
        </div>
    );
});
