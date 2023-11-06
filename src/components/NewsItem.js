import React, { Component } from 'react'
export class NewsItem extends Component {

  render() {
    let {url,title,description,date,newsurl,author}  = this.props;
    return (
      <div>
            <div className='col-md-4' style={{width:'auto'}}>
                <div className="card" >
                    <img src={url?url:"https://www.livemint.com/lm-img/img/2023/10/27/1600x900/2-0-552998319-reliance-0_1680276080958_1698375850312.jpg"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small>By {author?author: 'unknown'} at {date}...</small></p>
                        <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
           

      </div>
    )
  }
}

export default NewsItem