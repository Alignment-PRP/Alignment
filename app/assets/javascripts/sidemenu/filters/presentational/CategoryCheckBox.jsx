import React from 'react';
import {ListItem} from 'material-ui/List';
import CheckBox from 'material-ui/Checkbox';

class CategoryCheckBox extends React.Component {

    render() {
        const { filter, category, index, onCheck, onCheckSub } = this.props;
        return (
            <ListItem key={index}
                      primaryText={category.name}
                      leftCheckbox={
                          <CheckBox onCheck={onCheck}
                                    value={category.name}
                                    checked={filter[category.name] ? true : false}
                          />}
                      nestedItems={
                          category.subcategories.map((cat, index) => {
                              return <ListItem key={index} primaryText={cat.subcategoryName} leftCheckbox={<CheckBox checked={filter[category.name] ? filter[category.name].indexOf(cat.subcategoryName) !== -1 : false} onCheck={(event, checked) => onCheckSub(event, checked, category.name)} value={cat.subcategoryName}/>}/>
                          })
                      }
            />
        );
    }

}

export default CategoryCheckBox;
