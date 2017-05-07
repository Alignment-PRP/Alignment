import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import { menuItemsClasses } from './../../core/render';
import { orange500 } from 'material-ui/styles/colors'


/**
 * `SelectField` supports a floating label with the `floatingLabelText` property.
 * This can be fixed in place with the `floatingLabelFixed` property,
 * and can be customised with the `floatingLabelText` property.
 */
export default class ClassSelectAdd extends Component {



    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <SelectField
                    value={null}
                    onChange={this.props.handleChange}
                    floatingLabelText="Legg til Brukerklasse"
                    floatingLabelStyle={{color: orange500}}
                    underlineStyle={{color: orange500}}
                    iconStyle={{color: orange500}}
                >
                    {menuItemsClasses(this.props.classes)}
                </SelectField>
            </div>
        );
    }
}