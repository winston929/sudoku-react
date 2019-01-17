import React from 'react';

export class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input type="text" size="3" onKeyUp={this.props.onKeyUp} value={this.props.val.num} />
        );
    }
}