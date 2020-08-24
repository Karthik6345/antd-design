import React from "react";
import { connect } from 'react-redux';
import "./App.css";
import { Button } from 'antd';
import { getArticle, fetchArticles, fetchArticle } from './Actions';

class Article extends React.Component {
    componentDidMount() {
        if (this.props.articles.length === 0){
            this.props.fetchArticles().then(res => this.props.getArticle(this.props.match.params.article));
        }
        if (this.props.searchValue){
            this.props.fetchArticle().then(res => this.props.getArticle(this.props.match.params.article));
        }
        this.props.getArticle(this.props.match.params.article);
    }

    render(){
        const { article, error} = this.props;
        return (
            <div className="container">
                {error && <div className="errorText">{error}</div>}
                {
                    article.map((news,index)=>{
                        return <article key={index} className="news">
                            <h2>{news.title}</h2>
                            <img src={news.urlToImage} alt={news.title} width="100%" height="500" />
                           {news.content ? <div className="newsDescription">
                                <p>{news.content}</p>
                            </div> : 
                                "Not available"
                            }
                        </article>  
                    })
                }
                <Button type="primary" size='medium' onClick={event => this.props.history.goBack()}>
                    Go Back
                 </Button>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { article, articles, filterArticles,  error, searchValue } = state.articleReducer
    return {
        article,
        articles, 
        searchValue,
        filterArticles,
        error
    }
}

export default connect(mapStateToProps, { getArticle, fetchArticles, fetchArticle})(Article);