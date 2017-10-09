import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Heading from './Heading'

import FlexView from 'react-flexview'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const category = this.props.match.params.category
    this.props.loadShopItems(category)
  }

  componentWillReceiveProps(nextProps) {
    const isLocationChanged = nextProps.location !== this.props.location
    if (isLocationChanged) {
      const category = nextProps.match.params.category
      this.props.loadShopItems(category)
    }
  }

  render() {
    const category = this.props.match.params.category
    const shopItems = this.props.shopItems

    return (
      <div className="content list">
        <div className={`billboard ${category}`}></div>
        <Heading
          category={category}
          itemsCount={shopItems.length}
          isItemsLoading={this.props.isItemsLoading}
          errorMessage={this.props.errorMessage}
        />
        <ul className="items">
          <FlexView column height={120} hAlignContent='center' vAlignContent='center'>
            {shopItems.map((item) => (
              <li key={item.name}>
                <Link to={`/detail/${category}/${item.name}`}>
                  <img src={item.image} alt="" />
                  <div className="title">{item.title}</div>
                  <span className="price">${item.price.toFixed(2)}</span>
                </Link>
              </li>
            ))}
          </Flexview>
        </ul>
      </div>
    )
  }
}

List.propTypes = {
  // redux
  shopItems: PropTypes.array.isRequired,
  isItemsLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loadShopItems: PropTypes.func.isRequired,
  // router
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default List
