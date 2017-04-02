import React from 'react';
import CategoryCheckBox from './CategoryCheckBox.jsx';

class CategoryCheckBoxes extends React.Component {

    render() {
        const { categories, onCheck } = this.props;
        return (
            <span>
                {categories.map((cat, index) => {
                    return <CategoryCheckBox key={index} index={index} category={cat} onCheck={onCheck} />
                })}
            </span>
        );
    }


}

export default CategoryCheckBoxes;
