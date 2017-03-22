import React from 'react';

export default class ProjectRequirementsFilter extends React.Component {
    constructor(props) {
        super(props);

        this.updateFilter = this.updateFilter.bind(this);
        this.filterRequirementList = this.filterRequirementList.bind(this);
        this.generateFilterMenuCheckboxes = this.generateFilterMenuCheckboxes.bind(this);
    }

    filterRequirementList() {
        const allRequirements = this.props.requirements;
        const newFilterRequirementList = [];
        const categoryFilter = this.props.filter;

        for (let requirement of allRequirements){
            for (let category of categoryFilter){
                if (category == requirement.cname){
                   newFilterRequirementList.push(requirement);
                }

            }
        }
        this.props.updateFilterRequirementList(newFilterRequirementList);


    }

    updateFilter(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        if (value) {
            const newFilter = this.props.filter;
            newFilter.push(e.target.value);
            console.log(newFilter);
            this.props.onChangeHandler(newFilter);
        }else{
            const removeCategory = e.target.value;
            const oldFilter = this.props.filter;
            const newFilter = oldFilter.filter(item => item !== removeCategory);
            console.log(newFilter);
            this.props.onChangeHandler(newFilter);

        }

    }

    generateFilterMenuCheckboxes(){
        const allRequirements = this.props.projectRequirements;
        let categoryList = [];

        for (let requirement of allRequirements){
            categoryList.push(requirement.cname);
        }

        const uniqueCategoryList = Array.from(new Set(categoryList));

        return uniqueCategoryList.map((category, index) => {
            return <p key={index} >{category}<input onChange={this.updateFilter} type="checkbox" name={category} value={category}/></p>
            }
        )
    }

    onChangeHandler(newFilter){
        this.props.onChangeHandler(newFilter);
    }


    render() {
        return (
            <div id="filter">
                <h4>{this.props.title}</h4>
                <h2><b>Kategori</b></h2>
                <p>Sikkerhet<input onChange={this.updateFilter} type="checkbox" name="Sikkerhet" value="Sikkerhet"/></p>
                <p>Pålitelighet<input onChange={this.updateFilter} type="checkbox" name="Pålitelighet" value="Pålitelighet"/></p>
            </div>
        );
    }
}

