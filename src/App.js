import React,{Fragment} from "react";
import {connect} from 'react-redux';
import { Row, Col,Input,Card, Avatar, Select,Button  } from 'antd';
import "antd/dist/antd.css";
import "./App.css";
import { Link } from "react-router-dom";
import {fetchArticles, fetchArticle} from './Actions';
const { Meta } = Card;
const {Search} = Input;
const { Option } = Select;
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      scrollCounter:5,
      updatedArticles:[]
    }
  }

  componentDidMount(){
    this.props.fetchArticles();
      window.addEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll = () => {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight)+scrollHeight/2 >= scrollHeight;
    if (scrolledToBottom) {
    this.getItems(2)
    }
  }

  getItems = (cards) => {
      this.setState({
        scrollCounter: this.state.scrollCounter + cards
      })
  }


  handleChange(value) {
    if (value.length > 0) {
       this.props.fetchArticle(value)
    }
  }

  handleSelectChange = (value) => {
    const {articles} = this.props;
    let updatedArticles = [];
      updatedArticles = articles.filter((article) => {
        if(article.source && article.source.name === value){
          return true
        }return false;
      })
    this.setState({
      updatedArticles: updatedArticles
    })
  }

  getSources = (articles) => {
    let sources = [];
      articles.filter((article)=>{
        sources.push(article.source.name)
      })
    return [... new Set(sources)];
  }

  render(){
    const {articles,filterArticles, error} = this.props;
    const {scrollCounter, updatedArticles} = this.state;
    const data = updatedArticles.length > 0 ? updatedArticles : filterArticles.length > 0 ? filterArticles : articles;
    console.log(updatedArticles)
    return (
      <div className="App">
        {error && <div className="errorText">{error}</div>}
        <div className = "container" >
         <Search placeholder = "Search..." style={{margin:20}}
          size = "large" onSearch = { value => this.handleChange(value)}
           enterButton / >
           
           <Select defaultValue="Select" style={{ width: 190,marginRight:10 }} onChange={this.handleSelectChange}>
             {
               articles && this.getSources(articles).map((source, index) => {
              return  <Option key = {index} value={source}>{source}</Option> 
               })
             }
            </Select>
           <Button type="primary" size='medium' onClick={event => this.setState({updatedArticles:[]})}>
              Get Top HeadLines
            </Button>
          <div className="cards">
            <Row>
              {
                data && data.slice(0, scrollCounter).map((article, index) => {
                  return (
                    <Fragment  key={index}>
                    {article.description &&
                        <Link className="card" to={`/${article.title}`}>
                              <Col className="gutter-row" >
                                <Card style={{textAlign: "left"}} bordered={false}
                                  cover={<img alt="example" src={article.urlToImage} />}
                                >
                                  <Meta
                                    avatar={<Avatar src={article.urlToImage} />}
                                    title={article.title}
                                    description={article.description}
                                  />
                                </Card>
                              </Col>
                        </Link>
                    }
                    </Fragment>
                  );
                })}
                
            </Row>
          </div>
        </div>
      </div>
    );
  } 
}

function mapStateToProps(state){
  const {articles,filterArticles, error}= state.articleReducer
  return {
    articles,
    filterArticles,
    error
  }
}

export default connect(mapStateToProps,{fetchArticles, fetchArticle})(App);
