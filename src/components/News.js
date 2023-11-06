import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category:"general",
    country:"in",
    pageSize:5
  }
  static propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
    pageSize:PropTypes.number
  }
    
    constructor (){
        super();
        this.state = {
            articles : [],
            loading:true,
            page:1
        }
    }
    async componentDidMount(){
          this.setState({
            loading:true,
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d643dd5d9ee740328382c4fc31dd842f&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let processedData = await data.json();

        this.setState({
            articles:processedData.articles,
            totalResults:processedData.totalResults,
            loading:false
        })
    }
    // handlenextbutton = async ()=>{
    //     console.log("next");
    //     if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))
    //     {

    //     }
    //     else{
    //       this.setState({loading:false});

    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d643dd5d9ee740328382c4fc31dd842f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         let data = await fetch(url);
    //         let processedData = await data.json();
    
    //         this.setState({
    //             articles:processedData.articles,
    //             page:this.state.page + 1,
    //             loading:false
    //         })
    //     }
        
    // }
    // handleprevbutton = async ()=>{
    //     console.log("prev");
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d643dd5d9ee740328382c4fc31dd842f&page=${this.state.page - 1}`;
    //     let data = await fetch(url);
    //     let processedData = await data.json();

    //     this.setState({
    //         articles:processedData.articles,
    //         page:this.state.page - 1,
    //         loading:false
    //     })

    // }
    fetchMoreData = async () => {
      this.setState({
              loading:true,
              page:this.state.page + 1
    })
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d643dd5d9ee740328382c4fc31dd842f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let processedData = await data.json();
        this.setState({
            articles:this.state.articles.concat(processedData.articles),
            totalResults:processedData.totalResults,
            loading:false
        })
    };
  render() {
    return (
      <div  className='container my-3'>
        <div className='heading text-center my-3'>
          <h2>TizonNews - The Latest News Application</h2>
          <marquee>
          <h6>The Latest News Includes Headlines of Sports, business, entertainment etc.</h6>
            </marquee>
        </div>
        {/* {this.state.loading && <Spinner/>} */}
       
          <div className='row'>
        {this.state.articles.map((element)=>{
            return   <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title.slice(0,45)} description={element.description?element.description.slice(0,88):""} url={element.urlToImage} author={element.author} date={element.publishedAt} newsurl = {element.url}/>
                    </div>
        })}
        </div>    
        <div className='my-3'>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.page !== this.state.totalResults}
          loader={this.state.loading && <Spinner/>}
        ></InfiniteScroll>    
        </div>
      </div>
    )
  }
}

export default News