import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import { Tabs, Tab } from 'material-ui/Tabs'

import { colors } from '../common-styles'
import HeaderCart from './HeaderCart'

class Header extends React.Component {
 static propTypes = {
   location: PropTypes.object.isRequired,
   cartItems: PropTypes.array.isRequired,
 }

 static contextTypes = {
   router: PropTypes.object,
 }

 constructor(props) {
    super(props)

    const pathname = this.props.location.pathname
    let selectedTabValue = 'not_selected'

    if (pathname.includes('mens_outerwear')) {
      selectedTabValue = 'mens_outerwear'
    } else if (pathname.includes('ladies_outerwear')) {
      selectedTabValue = 'ladies_outerwear'
    } else if (pathname.includes('mens_tshirts')) {
      selectedTabValue = 'mens_tshirts'
    } else if (pathname.includes('ladies_tshirts')) {
      selectedTabValue = 'ladies_tshirts'
    }

    this.state = { selectedTabValue }
  }

 componentWillReceiveProps(nextProps) {
    const pathname = nextProps.location.pathname

    if (!pathname.startsWith('/list') && !pathname.startsWith('/detail')) {
      this.setState({ selectedTabValue: 'not_selected' })
    } else if (pathname.includes('mens_outerwear')) {
      this.setState({ selectedTabValue: 'mens_outerwear' })
    } else if (pathname.includes('ladies_outerwear')) {
      this.setState({ selectedTabValue: 'ladies_outerwear' })
    } else if (pathname.includes('mens_tshirts')) {
      this.setState({ selectedTabValue: 'mens_tshirts' })
    } else if (pathname.includes('ladies_tshirts')) {
      this.setState({ selectedTabValue: 'ladies_tshirts' })
    }
  }

 componentDidUpdate(prevProps) {
    // if location changed - scroll to window top
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

 handleTabClick = (newValue) => {
   const oldValue = this.state.selectedTabValue
   const pathname = this.props.location.pathname
   if (
     newValue === oldValue &&
   pathname.startsWith('/list')
   ) return

   this.setState({ selectedTabValue: newValue })

   if (newValue === 'mens_outerwear') {
     this.context.router.history.push('/list/mens_outerwear')
   } else if (newValue === 'ladies_outerwear') {
     this.context.router.history.push('/list/ladies_outerwear')
   } else if (newValue === 'mens_tshirts') {
     this.context.router.history.push('/list/mens_tshirts')
   } else if (newValue === 'ladies_tshirts') {
     this.context.router.history.push('/list/ladies_tshirts')
   } else {
     console.error(`Unexpected tab value: ${newValue}`)
   }
 };

 handleSiteLogoClick = (e) => {
   const pathname = this.props.location.pathname
   if (pathname === '/') {
     e.preventDefault()
   }
 }

 calculateCartItemsCount = () => {
   const cartItems = this.props.cartItems
   if (!cartItems.length) return 0

   const itemsCount = cartItems.reduce((count, cartItem) => {
     return count + cartItem.quantity
   }, 0)

   return itemsCount
 }

 isNavigationVisible = () => {
   const pathname = this.props.location.pathname

   if (pathname === '/') return true
   if (pathname.startsWith('/list')) return true
   if (pathname.startsWith('/detail')) return true

   return false
 }

 render() {
    const labelStyle = {
      fontSize: '16px',
      fontWeight: '600',
      letterSpacing: '0.3em',
    }

    const inkBarStyle = {
      marginTop: '-6px',
      height: '6px',
      borderBottom: '4px solid black',
      backgroundColor: 'rgba(255, 255, 255, .7)',
    }

    const tabItemContainerStyle = {
      backgroundColor: colors.fontPrimary,
    }

    return (
      <header className="page">
        <div className="topline">
          <h1>
            <Link to="/" className="logo" onClick={this.handleSiteLogoClick}>
              <FlatButton label="SHOP" hoverColor="white" rippleColor="silver" labelStyle={labelStyle} />
            </Link>
          </h1>
          <HeaderCart itemsCount={this.calculateCartItemsCount()} />
        </div>
        <div className="nav" style={{ visibility: this.isNavigationVisible() ? 'visible' : 'hidden' }}>
          <Tabs
            inkBarStyle={inkBarStyle}
            tabItemContainerStyle={tabItemContainerStyle}
            value={this.state.selectedTabValue}
          >
            <Tab label="Men's Outerwear" value="mens_outerwear" onClick={() => { this.handleTabClick('mens_outerwear') }} />
            <Tab label="Ladies Outerwear" value="ladies_outerwear" onClick={() => { this.handleTabClick('ladies_outerwear') }} />
            <Tab label="Men's T-Shirts" value="mens_tshirts" onClick={() => { this.handleTabClick('mens_tshirts') }} />
            <Tab label="Ladies T-Shirts" value="ladies_tshirts" onClick={() => { this.handleTabClick('ladies_tshirts') }} />
          </Tabs>
        </div>
      </header>
    )
  }
}

// eslint-disable-next-line no-class-assign
Header = withRouter(Header)
export default Header
