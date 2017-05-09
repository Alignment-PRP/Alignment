import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import { menuItemsUsers } from './../../core/render';
import { orange500 } from 'material-ui/styles/colors'


/**
 * `SelectField` supports a floating label with the `floatingLabelText` property.
 * This can be fixed in place with the `floatingLabelFixed` property,
 * and can be customised with the `floatingLabelText` property.
 */
export default class UserSelectAdd extends Component {



    render() {
        return (
            <div>
                <SelectField
                    value={null}
                    onChange={this.props.handleChange}
                    floatingLabelText="Legg til Bruker"
                    floatingLabelStyle={{color: orange500}}
                    underlineStyle={{color: orange500}}
                    iconStyle={{color: orange500}}
                >
                    {menuItemsUsers(this.props.classes)}
                </SelectField>
            </div>
        );
    }
}