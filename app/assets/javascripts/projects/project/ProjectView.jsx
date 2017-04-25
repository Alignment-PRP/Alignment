import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions";
import {Tabs, Tab} from 'material-ui/Tabs';



class ProjectView extends React.Component {

    /**
     * This is a lifecycle method that runs after the render function. It is good practis to call
     * on GET methods here because we want to render the component first, THEN fill it with
     * information from DB.
     */
    componentDidMount() {
        //react-routes make us able to get the id of the URL with: this.props.params.id
        this.props.getRequirementsByProjectId(this.props.params.id);
        this.props.getAllRequirements();
    }

    /**
     * This gets called before render, methods that the render component dont depend on can get
     * called here. ChangeSideMenuMode changes the stats of the sidemenu. The sidemenu
     * automatically rerenders when this gets called.
     */
    componentWillMount(){
        this.props.addFilter('project');
        this.props.addFiltered('allRequirements');
        this.props.addFiltered('projectRequirements');
        this.props.popoverAdd('project');
        this.props.changeSideMenuMode("HIDE")
    }

    intersectRequirements(allreq, proreq) {
        if (allreq && proreq) {
            return Object.keys(allreq)
                .filter(key => { if (proreq[key]) return false; else return true })
                .map(key => allreq[key])
        } else {
            return null;
        }
    }

    _filterAll(filter, allreq_f, allreq, proreq_f, proreq) {
        if ((filter ? Object.keys(filter).length > 0 : false)) {
            return this.intersectRequirements(allreq_f, proreq_f);
        }
        return this.intersectRequirements(allreq, proreq);
    }

    /**
     * Renders the component. This component returns a JSX tag, and all code need to be inside
     * this tag. JSX looks like html but is really a javascript extension syntax. This get compiled
     * into javascript and then into html. CodeAcademy.com Rect.js part 1 explains this in module 1.
     * @returns {XML}
     */

    render() {
        const { index, path, push } = this.props;
        return (
            <div>
                <Tabs
                    initialSelectedIndex={index}
                    value={path}
                >
                    <Tab value="/project/:id/overview" label="Prosjektoversikt" onActive={() => push('/project/:id/overview')}>
                        <div id="admin" style={this.style.tabContent}>
                            <h2>Brukeroversikt</h2>
                            <ul>
                                <li>Oversikt over hvem som eier hvilket prosjekt</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab value="/project/:id/access" label="Tilgang" onActive={push.bind(null, path)}>
                        <div style={this.style.tabContent}>

                        </div>
                    </Tab>
                    <Tab value="/project/:id/requirements" label="Prosjektkrav" onActive={push.bind(null, path)}>
                        <div style={this.style.tabContent}>

                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let path = state.router.location ? state.router.location.pathname : "//project/:id";
    return {
        path: path
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (url) => {
            dispatch(push(url));
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);