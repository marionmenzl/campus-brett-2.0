import React, { PureComponent } from 'react';
import Navigation from '../../components/Navigation';
import HeaderLogo from '../../components/HeaderLogo';
import CategoryBar from '../../components/CategoryBar';
import Post from '../../components/Post';
import dataHandling from '../../services/DataHandling';
import './Home.css';

export default class Home extends PureComponent {
    state = {
        posts: []
    };
    componentWillMount() {
        dataHandling.addDataChangeListener('posts', this.handlePostsDataChange);
    }

    handlePostsDataChange = data => {
        const postList = data.val();
        if (postList === null) {
            const container = document.getElementById('post-container');
            container.insertAdjacentHTML( 'beforeend', "<p> Keine Posts unter GESUCHT gefunden! </p>");
        } else {
            const postKeys = Object.keys(postList);

            let posts = [];
            for (let i = 0; i < postKeys.length; i++) {
                const k = postKeys[i];
                const name = 'Max Mustermann';
                const time = postList[k].time;
                const title = postList[k].title;
                const description = postList[k].description;
                const tag = postList[k].tag;

                if (postList[k].category === 'search')
                    posts.push({
                        id: k,
                        name: name,
                        time: time,
                        title: title,
                        description: description,
                        tag: tag
                    });
            }

            this.setState({
                posts: posts
            });
            console.log(this.state.posts);
        }
    };

    render() {
        return (
            <React.Fragment>
                <HeaderLogo theme="light" />
                <CategoryBar />
                <div className="posts-container" id="post-container">
                    {this.state.posts.map(post => {
                        return (
                            <Post
                                theme="search"
                                key={post.id}
                                name={post.name}
                                time={post.time}
                                title={post.title}
                                description={post.description}
                                tag={post.tag}
                            />
                        );
                    })}
                </div>
                <Navigation />
            </React.Fragment>
        );
    }
}
