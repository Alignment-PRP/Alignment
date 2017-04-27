import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {renderTextField, renderPassField, renderSelectField, menuItemsClasses} from './../../core/render';
import HelpToolTip from './../../core/HelpToolTip';

class RequirementFormUpdate extends React.Component {

    renderStructureForm(structure){

        return structure.map((structure, index) => {
            return (
                <div key={index}>
                    <label htmlFor={Object.keys(structure)}> {
                        (Object.keys(structure)+"").toLowerCase().replace(/\b[a-z]/g,
                            function(letter) {
                                return letter.toUpperCase();
                            })
                        }
                    </label>
                    <HelpToolTip toolTip={"Dette er \"" + Object.keys(structure) + "\"  strukturen til kravet, se dokumentasjon for nærmere detaljer."}/>
                    <br/>
                    <Field type="text" component={renderTextField} name={Object.keys(structure)} required/>
                </div>
            )
        });
    }

    renderSubCategoryItems(subCategories){
        return subCategories.map((subCategory, index) => {
            return (
                <option key={index} value={subCategory.subcategoryID}>{subCategory.subcategoryName}</option>
            )
        });

    }

    renderCategoryItems(categories){
        return categories.map((category, index) => {
            return (
                <optgroup key={index} label={category.name}>
                    {this.renderSubCategoryItems(category.subcategories)}
                </optgroup>
            )
        });
    }

    renderUsers(users){
        return users.map((user, index) => {
            return <option key={index} value={user.USERNAME}>{user.USERNAME}</option>
        })
    }

    render() {
        const { handleSubmit, structure, categories, users } = this.props;
        return (
            <div className="update-requirement">
                <h2>Oppdater krav</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ID"> Krav-ID </label>
                        <HelpToolTip toolTip="Dette er den unike, autogenererte identifikatoren for dette kravet. Kan ikke endres."/>
                        <br/>
                        <Field type="text" component={renderTextField} name="ID" readOnly/><br/>
                    </div>
                    <div>
                        <label htmlFor="name" > Kravnavn </label>
                        <HelpToolTip toolTip="Dette er navnet på kravet. Eks: Strukturkrav 1 - Dokumentasjon"/>
                        <br/>
                        <Field type="text" component={renderTextField} name="name" tooltip="test" required/><br/>
                    </div>
                    <div>
                        <label htmlFor="reqNo"> Kravnummer </label>
                        <HelpToolTip toolTip="Synlig identifikator for kravet, kan inneholde bokstaver. Eks: NFR-4943"/>
                        <br/>
                        <Field type="text" component={renderTextField} name="reqNo" required/><br/>
                    </div>
                    <div>
                        <label htmlFor="reqCode"> Kravkode </label>
                        <HelpToolTip toolTip="Intern klassifisering av kravet."/>
                        <br/>
                        <Field type="text" component={renderTextField} name="reqCode" required/><br/>
                    </div>
                    <br/>
                    <div>
                        <label> Ansvarlig for kravet </label>
                        <HelpToolTip toolTip="Valg av hvilken bruker som er ansvarlig for håndtering av kravet."/>
                        <br/>
                        <Field component="select" name="reqResponsible">
                            {this.renderUsers(users)}
                        </Field><br/>
                    </div>
                    <br/>
                    <div>
                        <label> Kategori </label>
                        <HelpToolTip toolTip="Hvilken kategori og underkategori kravert blir sortert under."/>
                        <br/>
                        <Field name="scID" component="select" >
                            {this.renderCategoryItems(categories)}
                        </Field><br/>
                    </div>
                    <div>
                        <label htmlFor="description"> Beskrivelse </label>
                        <HelpToolTip toolTip="Beskrivelse av kravet."/>
                        <br/>
                        <Field type="text" component={renderTextField} name="description" required/><br/>
                    </div>
                    <div>
                        <label htmlFor="comment"> Begrunnelse </label>
                        <HelpToolTip toolTip="Dette er begrunnelsen. TODO: hva er dette, og hvorfor er det her."/>
                        <br/>
                        <Field type="text" component={renderTextField} name="comment" required/><br/>
                    </div>
                    {this.renderStructureForm(structure)}<br/><br/>
                    <button type="submit">Oppdater</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.requirementReducer.requirement
    };
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'RequirementFormUpdate'
})(RequirementFormUpdate));

