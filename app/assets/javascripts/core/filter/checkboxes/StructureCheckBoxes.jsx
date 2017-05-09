import React from 'react';
import StructureCheckBox from './StructureCheckBox';

class StructureCheckBoxes extends React.Component {

    render() {
        const { filter, structures, onCheck, onCheckSub } = this.props;
        return (
            <span>
                {Object.keys(structures).map((structure, index) => {
                    return <StructureCheckBox key={index} filter={filter} index={index} structure={structure} values={structures[structure]} onCheck={onCheck} onCheckSub={onCheckSub} />
                })}
            </span>
        );
    }


}

export default StructureCheckBoxes;
