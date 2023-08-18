import { Box2d, resizeBox, ShapeUtil, TLOnResizeHandler } from '@tldraw/tldraw';
import React from 'react';
import { BlockShape } from 'entities/block-shape/types';
import { BlockShapeComp } from 'entities/block-shape/ui';

export class BlockShapeUtil extends ShapeUtil<BlockShape> {
    static override type = 'block' as const;
    // A validation schema for the shape's props (optional)
    // static override props = cardShapeProps
    // Migrations for upgrading shapes (optional)
    // static override migrations = cardShapeMigrations

    override isAspectRatioLocked = () => false;
    override canResize = () => true;
    override canBind = () => true;
    getDefaultProps(): BlockShape['props'] {
        return {
            w: 100,
            h: 100,
            text: 'card'
        };
    }

    getBounds(shape: BlockShape) {
        return new Box2d(0, 0, shape.props.w, shape.props.h);
    }

    component(shape: BlockShape) {
        return <BlockShapeComp shape={shape} />;
    }

    indicator(shape: BlockShape) {
        return <rect width={shape.props.w} height={shape.props.h} />;
    }

    override onResize: TLOnResizeHandler<BlockShape> = (shape, info) => {
        return resizeBox(shape, info);
    };
}
