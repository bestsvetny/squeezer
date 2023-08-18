import React from 'react';
import { HTMLContainer } from '@tldraw/tldraw';
import { BlockShape } from 'entities/block-shape/types';
import style from './block-shape-comp.module.css';

type BlockShapeCompProps = {
    shape: BlockShape;
};

export const BlockShapeComp = ({ shape }: BlockShapeCompProps) => {
    return <HTMLContainer className={style.blockShapeComp}>{shape.props.text}</HTMLContainer>;
};
