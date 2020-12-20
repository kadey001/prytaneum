import React from 'react';

import Component from './PaneSelect';

export default { title: 'Components/Pane Select' };

export function Basic() {
    const [state, setState] = React.useState('1');

    return (
        <div style={{ width: '50%', paddingTop: '100px', paddingLeft: '30px' }}>
            <Component
                options={['1', '2', '3']}
                value={state}
                onChange={(e) => {
                    const { value } = e.target;
                    setState(value);
                }}
                getSecondary={() => {}}
            />
        </div>
    );
}
