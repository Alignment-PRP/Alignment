import React from 'react';
import {ListItem} from 'material-ui/List';
import CheckBox from 'material-ui/Checkbox';

class CategoryCheckBox extends React.Component {

    render() {
        const { category, index, onCheck } = this.props;
        return (
            <ListItem key={index}>
                <CheckBox onCheck={onCheck}
                          value={category.name}
                          label={category.name}
                          labelPosition="left"
                />
            </ListItem>
        );
    }

}

export default CategoryCheckBox;
