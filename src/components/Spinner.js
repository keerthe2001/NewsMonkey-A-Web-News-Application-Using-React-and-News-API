import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
            </button>
      </div>
    )
  }
}

export default Spinner