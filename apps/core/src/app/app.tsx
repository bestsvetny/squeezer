import React from 'react';
import { renderText } from '@ckb/ui';

export const App = () => {
    return (
        <div>
            <h1>{renderText('Hello ')} App</h1>
        </div>
    );
};
