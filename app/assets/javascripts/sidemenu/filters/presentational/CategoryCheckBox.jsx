import React from 'react';
import {ListItem} from 'material-ui/List';
import CheckBox from 'material-ui/Checkbox';

class CategoryCheckBox extends React.Component {

    render() {
        const { category, index, onCheck } = this.props;
        return (
            <ListItem key={index}
                      primaryText={category.name}
                      leftCheckbox={
                          <CheckBox onCheck={onCheck}
                                    value={category.name}
                          />
            }/>
        );
    }

}

export default CategoryCheckBox;
