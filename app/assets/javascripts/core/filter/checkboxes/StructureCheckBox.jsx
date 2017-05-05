import React from 'react';
import {ListItem} from 'material-ui/List';
import CheckBox from 'material-ui/Checkbox';

class StructureCheckBox extends React.Component {

    render() {
        const { filter, structure, index, onCheck } = this.props;
        return (
            <ListItem key={index}
                      primaryText={structure}
                      leftCheckbox={
                          <CheckBox onCheck={onCheck}
                                    value={structure}
                                    checked={filter[structure] ? true : false}
                          />}
            />
        );
    }

}

export default StructureCheckBox;
