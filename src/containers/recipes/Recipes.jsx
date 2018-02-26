import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap' 
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchRecipes } from './../../actions/recipes'

class Recipes extends Component {

    constructor(props) {
        super(props);
        this.fetchNextPageRecipes = this.fetchNextPageRecipes.bind(this);
    }

    componentDidMount() {
        const { page, recipes } = this.props;

        if (page === 1 && !recipes.length) {
            this.props.dispatch(fetchRecipes());
        }
    }

    fetchNextPageRecipes() {
        this.props.dispatch(fetchRecipes());
    }

    getLoadingMessage() {
        const { loading } = this.props;

        if (loading) {
            return <span>Loading...</span>;
        }
    }

    getEmptyData(isDataEmpty) {
        const { loading } = this.props;

        if (!loading && isDataEmpty) {
            return <span>Now recipes list is empty</span>;
        }
    }

    getRecipesList() {
        const { loading, recipes } = this.props;

        const data = (recipes && recipes.map((item, i) => <li key={i}>
            <span>{item.title}</span><br/>
            <span>{item.created_at}</span>
        </li>)) || [];

        if (!loading) {
            return data;
        }

        return [];
    }

    render() {
        const { loading, recipes, lastRecipesCount } = this.props;
        
        const recipesList = this.getRecipesList();
        const loadingMessage = this.getLoadingMessage();
        const emptyData = this.getEmptyData(!recipesList.length);

        return (<Row>
            <Col md={12}>
                <h3>
                    List of our recipes:
                </h3>
                <div>
                    {recipesList}
                    {emptyData}
                    {loadingMessage}
                </div>
                <div>
                    {(recipesList.length && lastRecipesCount && <Button  bsStyle="primary" onClick={this.fetchNextPageRecipes}>
                        Load more
                    </Button>) || ''}
                </div>
            </Col>
        </Row>);
    }
}

Recipes.propTypes = {
    dispatch: PropTypes.func.isRequired,
    recipes: PropTypes.any,
    loading: PropTypes.bool,
    lastRecipesCount: PropTypes.number,
    page: PropTypes.number,
};

const mapStateToProps = state => {
    return state.recipes || {};
};

export default connect(mapStateToProps)(Recipes);
