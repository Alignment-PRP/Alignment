import React from 'react';
import StructureCheckBox from './StructureCheckBox';

class StructureCheckBoxes extends React.Component {

    render() {
        const { filter, structures, onCheck } = this.props;
        return (
            <span>
                {structures.map((structure, index) => {
                    return <StructureCheckBox key={index} filter={filter} index={index} structure={structure} onCheck={onCheck} />
                })}
            </span>
        );
    }


}

export default StructureCheckBoxes;
