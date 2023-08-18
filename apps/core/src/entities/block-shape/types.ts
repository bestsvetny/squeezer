import { TLBaseShape } from '@tldraw/tldraw';

export type BlockShape = TLBaseShape<'block', { w: number; h: number; text: string }>;
