import React from 'react';

export default function Item(props) {
    return (
        <div>
            <input
                type="text"
                name="x"
                value={coordinate.x}
                placeholder={'Input X-coordinate'}
                onChange={(event) => handleChange(index, event)}
            />
            {props.name}
            <hr />
        </div>
    );
}
