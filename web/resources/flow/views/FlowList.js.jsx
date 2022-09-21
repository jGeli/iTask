/**
 * View component for /flows
 *
 * Generic flow list view. Defaults to 'all' with:
 * this.props.dispatch(flowActions.fetchListIfNeeded());
 *
 * NOTE: See /product/views/ProductList.js.jsx for more examples
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as flowActions from '../flowActions';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

// import resource components
import FlowLayout from '../components/FlowLayout.js.jsx';
import FlowListItem from '../components/FlowListItem.js.jsx';

class FlowList extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(flowActions.fetchListIfNeeded('all')); // defaults to 'all'
  }

  render() {
    const { flowStore } = this.props;

    /**
     * Retrieve the list information and the list items for the component here.
     *
     * NOTE: if the list is deeply nested and/or filtered, you'll want to handle
     * these steps within the mapStoreToProps method prior to delivering the
     * props to the component.  Othwerwise, the render() action gets convoluted
     * and potentially severely bogged down.
     */

    // get the flowList meta info here so we can reference 'isFetching'
    const flowList = flowStore.lists ? flowStore.lists.all : null;

    /**
     * use the reducer getList utility to convert the all.items array of ids
     * to the actual flow objetcs
     */
    const flowListItems = flowStore.util.getList("all");

    /**
     * NOTE: isEmpty is is usefull when the component references more than one
     * resource list.
     */
    const isEmpty = (
      !flowListItems
      || !flowList
    );

    const isFetching = (
      !flowListItems
      || !flowList
      || flowList.isFetching
    )

    return (
      <FlowLayout>
         <div className="yt-row space-between">
          <h3> Flows </h3>
            <Link className="yt-btn" to={'/flows/new'} 
              style={{
                 backgroundColor: "#2a95e3", 
                 width: "15%", 
                 minHeight: "2rem",
                 marginTop: "1.5rem",
                 textAlign: "center",
                 fontSize: "12px"
                }}>New Flow</Link>
        </div>
        <hr/>
        <br/>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 3.5 : 1, width: "80%", height: "50vh", display: "flex", flexDirection: "row", justifyContent: "space-around", padding: "50px"}}>
            <div style={{ flexDirection:"column", border: "2px solid gray", width: "30%"}}>
              <h4 style={{ fontWeight: "bold", marginLeft: "15px"}}>Flow 1</h4>
                <hr/>
                {flowListItems.map((flow, i) =>
                <FlowListItem key={flow._id + i} flow={flow} />
              )}
                <label style={{ display: "flex", marginLeft: "5px"}}>
                  <input type="checkbox" style={{ marginRight: "5px"}}/>
                  Task 1
                </label>
                  <label style={{ display: "flex", marginLeft: "5px"}}>
                    <input type="checkbox" style={{ marginRight: "5px"}}/>
                    Task 2
                  </label>
                <label style={{ display: "flex", marginLeft: "5px"}}>
                  <input type="checkbox" style={{ marginRight: "5px"}}/>
                  Task 3
                </label>
            </div>

            <div style={{ flexDirection:"column", border: "2px solid gray", width: "30%"}}>
              <h4 style={{ fontWeight: "bold", marginLeft: "15px"}}>Flow 2</h4>
                <hr/>
                <label style={{ display: "flex", marginLeft: "5px"}}>
                  <input type="checkbox" style={{ marginRight: "5px"}}/>
                  Task 1
                </label>
                  <label style={{ display: "flex", marginLeft: "5px"}}>
                    <input type="checkbox" style={{ marginRight: "5px"}}/>
                    Task 2
                  </label>
                <label style={{ display: "flex", marginLeft: "5px"}}>
                  <input type="checkbox" style={{ marginRight: "5px"}}/>
                  Task 3
                </label>
            </div>

            <div style={{ flexDirection:"column", border: "2px solid gray", width: "30%"}}>
              <h4 style={{ fontWeight: "bold", marginLeft: "15px"}}>Flow 3</h4>
                <hr/>
                <label style={{ display: "flex", marginLeft: "5px"}}>
                  <input type="checkbox" style={{ marginRight: "5px"}}/>
                  Task 1
                </label>
                  <label style={{ display: "flex", marginLeft: "5px"}}>
                    <input type="checkbox" style={{ marginRight: "5px"}}/>
                    Task 2
                  </label>
                <label style={{ display: "flex", marginLeft: "5px"}}>
                  <input type="checkbox" style={{ marginRight: "5px"}}/>
                  Task 3
                </label>
            </div>
        </div>
        }
      </FlowLayout>
    )
  }
}

FlowList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    flowStore: store.flow
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(FlowList)
);
