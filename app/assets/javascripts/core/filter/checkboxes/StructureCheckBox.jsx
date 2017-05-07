import React from 'react';
import {ListItem} from 'material-ui/List';
import CheckBox from 'material-ui/Checkbox';

class StructureCheckBox extends React.Component {

    render() {
        const { filter, structure, values, index, onCheck, onCheckSub } = this.props;
        return (
            <ListItem key={index}
                      primaryText={structure}
                      leftCheckbox={
                          <CheckBox onCheck={onCheck}
                                    value={structure}
                                    checked={filter && filter.structure && filter.structure[structure] ? true : false}
                          />}
                      nestedItems={
                          values.map((struc, index) => {
                              return <ListItem key={index}
                                               primaryText={struc.content}
                                               leftCheckbox={
                                                   <CheckBox checked={filter && filter.structure && filter.structure[structure] ? filter.structure[structure].indexOf(struc.content) !== -1 : false}
                                                             onCheck={(event, checked) => onCheckSub(event, checked, structure)}
                                                             value={struc.content}/>
                                               }
                              />
                          })
                      }
            />
        );
    }

}

export default StructureCheckBox;
