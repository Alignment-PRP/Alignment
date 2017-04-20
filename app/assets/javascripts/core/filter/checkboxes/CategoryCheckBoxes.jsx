import React from 'react';
import CategoryCheckBox from './CategoryCheckBox';

class CategoryCheckBoxes extends React.Component {

    render() {
        const { filter, categories, onCheck, onCheckSub } = this.props;
        return (
            <span>
                {categories.map((cat, index) => {
                    return <CategoryCheckBox key={index} filter={filter} index={index} category={cat} onCheck={onCheck} onCheckSub={onCheckSub}/>
                })}
            </span>
        );
    }


}

export default CategoryCheckBoxes;
