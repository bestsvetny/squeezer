import React, { useEffect } from 'react';
import '@tldraw/tldraw/tldraw.css';
import { Tldraw, track, useEditor } from '@tldraw/tldraw';
import { BlockShapeUtil } from 'entities/block-shape';
import { BlockTool } from 'features/block-tool';
import { CardShapeTool } from 'widgets/board-widget/model/tool';
import { uiOverrides } from 'widgets/board-widget/model';
import { useYjsStore } from 'widgets/board-widget/model/useYjsStore';
import { BOARD_HOST_URL } from 'shared/constants';
import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useAppStore } from 'app/app-store';

const HOST_URL = BOARD_HOST_URL;

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
                store={store}
                shareZone={<UserEditor />}
                shapeUtils={CustomShapes}
                tools={customTools}
                overrides={uiOverrides}
            >
                <BlockTool />
            </Tldraw>
        </div>
    );
};

const UserEditor = track(() => {
    const username = useAppStore.use.userSession().username;
    const editor = useEditor();

    const { color } = editor.user;
    useEffect(() => {
        editor.user.updateUserPreferences({
            name: username
        });
    }, [username]);

    return (
        <Flex pointerEvents='all'>
            <FormControl display='flex'>
                <FormLabel>Collaborator color</FormLabel>
                <Input
                    width='75px'
                    type='color'
                    value={color}
                    onChange={(e) => {
                        editor.user.updateUserPreferences({
                            color: e.currentTarget.value
                        });
                    }}
                />
            </FormControl>
        </Flex>
    );
});
