import React from 'react';
import PropTypes from 'prop-types';
import './chips.scss';

function Chips({ props }) {
    const { label, isSelected } = props;
    return (
        <div className="chip-div">
            {label}
        </div>
    )
}

Chips.propTypes = {
    label: PropTypes.string,
    isSelected: PropTypes.boolean,

};

Chips.defaultProps = {
    label: 'Label',
    isSelected: false,
};

export default Chips;