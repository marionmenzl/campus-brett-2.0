import React from 'react';
import { Component } from 'react';
import Navigation from '../../components/Navigation';
import HeaderIcon from '../../components/HeaderIcon';
import Headline from '../../components/Headline';
import RadioCategory from '../../components/RadioCategory';
import CategoryTag from '../../components/CategoryTag';
import LargeButton from '../../components/LargeButton';
import { history } from '../../App';
import './Search.css';

export default class Search extends Component {
    state = {
        tag: '',
        category: ''
    } 

    handleBack = event => {
        history.push('/');
    }

    handleCategory = event => {
        this.setState({
            category: event.target.value
        });
    }

    handleTag = value => {
        this.setState({
            tag: value
        });
    }

    handleSubmit = value => {
        //if form is not correct
        const tag = this.state.tag;
        const category = this.state.category;
        console.log('tag: ' + tag + ' category: ' + category);
        if (tag === '' || category === ''){
            const container = document.getElementById('warnings');
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.insertAdjacentHTML('beforeend', '<p> Bitte fülle das Formular ganz aus </p>');
        }
        else{
            const path = '/search/' + category + '/' + tag;
            history.push(path);
            console.log(path);
        }
    }

    render() {
        return (
            <React.Fragment>
                <HeaderIcon text="SUCHE" icon="back" onclick={this.handleBack}/>
                <div className="container-new-post">
                    <Headline text="KATEGORIE" />
                    <div className="radio-container" onChange={this.handleCategory}>
                        <RadioCategory />
                    </div>
                    <Headline text="TAG" />
                    <div className="tags-container-search">
                        <CategoryTag text="werkzeug" onClick={this.handleTag} category={this.state.category}/>
                        <CategoryTag text="hilfe" onClick={this.handleTag} category={this.state.category}/>
                        <CategoryTag text="mitfahrgelegenheit" onClick={this.handleTag} category={this.state.category}/>
                        <CategoryTag text="lebensmittel" onClick={this.handleTag} category={this.state.category}/>
                        <CategoryTag text="kleidung" onClick={this.handleTag} category={this.state.category}/>
                        <CategoryTag text="unterhaltung" onClick={this.handleTag} category={this.state.category}/>
                        <CategoryTag text="putzen" onClick={this.handleTag} category={this.state.category}/>
                        <CategoryTag text="party" onClick={this.handleTag} category={this.state.category}/>
                    </div>
                    <div id="warnings"></div>
                    <div className="button-container-search">
                        <LargeButton 
                            className="search-button"
                            text="SUCHEN" 
                            theme="light" 
                            onClick={this.handleSubmit}
                            id="search-button"
                        />
                    </div>
                </div>
                <Navigation />
            </React.Fragment>
        );
    }
}
