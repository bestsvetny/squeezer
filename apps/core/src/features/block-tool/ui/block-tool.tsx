import { TLBaseShape, TLShapeId, track, useEditor } from '@tldraw/tldraw';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import style from './block-tool.module.css';

export const BlockTool = track(() => {
    const [createText, setCreateText] = useState('');
    const [editText, setEditText] = useState('');
    const editor = useEditor();

    const handleCreateClick = () => {
        editor.createShapes([
            {
                id: `shape:${uuidv4()}` as TLShapeId,
                type: 'block',
                x: 150,
                y: 150,
                props: {
                    text: createText
                }
            }
        ]);
    };

    useEffect(() => {
        editor.on('event', (event) => {
            if (event.name === 'pointer_move') {
                return;
            } else {
                console.log(event);
                console.log(editor.store.allRecords());
            }
        });
    });

    const handleEditClick = () => {
        if (editor.selectedShapes.length > 0) {
            const shape = editor.selectedShapes[0] as TLBaseShape<string, { text: string }>;

            if (shape.type === 'block') {
                editor.updateShapes([
                    {
                        id: shape.id, // required
                        type: shape.type, // required
                        props: {
                            text: editText ? editText : shape.props.text
                        }
                    }
                ]);
            }
        }
    };

    return (
        <div className={style.toolContainer}>
            <FormControl display='flex' flexDirection='column' gap='5px'>
                <FormLabel>Create block</FormLabel>
                <label htmlFor='create-text'>Block text</label>
                <Input
                    type='text'
                    id='create-text'
                    value={createText}
                    onChange={(e) => setCreateText(e.target.value)}
                />
                <Button onClick={handleCreateClick}>Create</Button>
            </FormControl>
            <FormControl display='flex' flexDirection='column' gap='5px'>
                <FormLabel>Edit block</FormLabel>
                <label htmlFor='edit-text'>Block text</label>
                <Input type='text' id='edit-text' value={editText} onChange={(e) => setEditText(e.target.value)} />
                <Button onClick={handleEditClick}>Edit</Button>
            </FormControl>
        </div>
    );
});
