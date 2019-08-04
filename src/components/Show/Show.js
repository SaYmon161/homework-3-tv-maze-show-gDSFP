import React, { Component } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

class Show extends Component {
  state = {
    showId: '',
    data: null
  };

  static getDerivedStateFromProps(props, state) {
    return props.showId === state.showId
      ? null
      : {
          data: null,
          showId: props.showId
        };
  }

  async componentDidUpdate() {
    const { showId, data } = this.state;
    if (showId !== '' && data === null) {
      console.log(1);
      const data = await getShowInfo(this.props.showId);
      this.setState({ data });
    }
  }

  getImg(name) {
    return require(`../App/assets/${name}.jpg`);
  }

  createMarkup(htmlMarkup) {
    return { __html: htmlMarkup };
  }

  render() {
    const { showId, data } = this.state;
    if (data !== null) {
      return (
        <div className="show">
          <img src={this.getImg(showId)} alt={showId} className="show-image" />
          <h2 className="show-label t-show-name">{data.name}</h2>
          <p className="show-text t-show-genre">
            <b>Жанр: </b>
            {data.genres.join(', ')}
          </p>
          <p
            className="show-text t-show-summary"
            dangerouslySetInnerHTML={this.createMarkup(data.summary)}
          />
        </div>
      );
    } else {
      return <p className="show-inforation t-show-info">Шоу не выбрано</p>;
    }
  }
}

export default Show;
